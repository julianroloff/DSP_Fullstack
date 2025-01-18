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
    
    SELECT ?window ?thermalTransmittance
    WHERE {
        ?window a ifc:IfcWindow ;
               ex:hasThermalTransmittance ?thermalTransmittance .
    }
    """
    return graph.query(query)

def get_regulation_uvalues(graph):
    query = """
    PREFIX ex: <http://example.org/>
    SELECT ?component ?maxUValue
    WHERE {
        ?regulation a ex:Regulation ;
                    ex:appliesTo ?component ;
                    ex:maxUValue ?maxUValue .
    }
    """
    return graph.query(query)

def compare_uvalues(stored_uvalues, regulation_uvalues):
    comparisons = []
    for stored_component, stored_uvalue in stored_uvalues:
        stored_base_type = "IfcWindow"
        for reg_component, reg_uvalue in regulation_uvalues:
            if stored_base_type == str(reg_component).split("/")[-1]:
                status = "compliant" if float(stored_uvalue) <= float(reg_uvalue) else "non-compliant"
                comparisons.append({
                    "component": str(stored_component),
                    "stored_uValue": float(stored_uvalue),
                    "regulation_uValue": float(reg_uvalue),
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
