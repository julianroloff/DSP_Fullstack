import sys
import json
from rdflib import Graph, Namespace

def load_graph(file_path):
    graph = Graph()
    graph.parse(file_path, format="ttl")
    print(f"Loaded {len(graph)} triples from {file_path}", file=sys.stderr)
    return graph

def get_stored_uvalues(graph):
    query = """
    PREFIX ex: <http://example.org/>
    PREFIX ifc: <http://ifcowl.openbimstandards.org/IFC2X3_TC1#>

    SELECT ?element ?type ?thermalTransmittance
    WHERE {
        ?element a ?ifcType ;
                ex:hasThermalTransmittance ?thermalTransmittance .

        VALUES (?ifcType ?type) {
            (ifc:IfcWindow "Window")
            (ifc:IfcWall "Wall")
            (ifc:IfcDoor "Door")
            (ifc:IfcCovering "Ceiling")
            (ifc:IfcSlab "Floor")
            (ifc:IfcCurtainWall "Curtain_Wall")
            (ifc:IfcWallStandardCase "Basic_Wall")
        }
    }
    """
    return graph.query(query)

def get_regulation_uvalues(graph):
    query = """
    PREFIX ex: <http://example.org/>
    PREFIX ifc: <http://ifcowl.openbimstandards.org/IFC2X3_TC1#>
    SELECT ?component ?maxUValue
    WHERE {
        ?regulation a ex:Regulation ;
                    ex:appliesTo ?component ;
                    ex:maxUValue ?maxUValue .
    }
    """
    return graph.query(query)

def compare_uvalues(stored_uvalues, regulation_uvalues):

    stored_uvalues = list(get_stored_uvalues(stored_graph))
    print(f"Stored U-values: {stored_uvalues}", file=sys.stderr)

    regulation_uvalues = list(get_regulation_uvalues(regulations_graph))
    print(f"Regulation U-values: {regulation_uvalues}", file=sys.stderr)

    comparisons = []

    # Normalize regulation map
    regulation_map = {
        str(reg_component).split("#")[-1]: float(reg_uvalue)  # Extract local name
        for reg_component, reg_uvalue in regulation_uvalues
    }

    # Mapping between stored types and IFC names
    type_mapping = {
        "Window": "IfcWindow",
        "Wall": "IfcWall",
        "Door": "IfcDoor",
        "Ceiling": "IfcCovering",
        "Floor": "IfcSlab",
        "Curtain_Wall": "IfcCurtainWall",
        "Basic_Wall": "IfcWallStandardCase"
    }

    for stored_component, component_type, stored_uvalue in stored_uvalues:
        if stored_uvalue == "Unknown":
            continue  # Skip components with missing values

        try:
            stored_value = float(stored_uvalue)
        except ValueError:
            continue  # Skip invalid values

        # Convert component_type to string for mapping lookup
        component_type_str = str(component_type)
        base_type = type_mapping.get(component_type_str)
        if base_type is None:
            print(f"Unknown type: {component_type_str}", file=sys.stderr)
            continue  # Skip unknown component types

        regulation_uvalue = regulation_map.get(base_type)
        if regulation_uvalue is not None:
            status = "compliant" if stored_value <= regulation_uvalue else "non-compliant"
            comparisons.append({
                "component": str(stored_component),
                "type": base_type,
                "stored_uValue": stored_value,
                "regulation_uValue": regulation_uvalue,
                "status": status
            })


    return comparisons



if __name__ == "__main__":
    try:
        stored_file = sys.argv[1]
        regulations_file = sys.argv[2]
        stored_graph = load_graph(stored_file)
        regulations_graph = load_graph(regulations_file)

        stored_uvalues = get_stored_uvalues(stored_graph)
        regulation_uvalues = get_regulation_uvalues(regulations_graph)

        comparisons = compare_uvalues(stored_uvalues, regulation_uvalues)

        print(json.dumps(comparisons, indent=2))
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
