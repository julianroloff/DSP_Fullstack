import ifcopenshell
import sys

def convert_ifc_to_rdf(ifc_file_path):
    try:
        # Open the IFC file
        ifc_file = ifcopenshell.open(ifc_file_path)
        schema = ifc_file.schema
        print(f"Detected IFC Schema: {schema}")

        rdf_data = """
            @prefix ex: <http://example.org/> .
            @prefix ifc: <http://ifcowl.openbimstandards.org/IFC2X3_TC1#> .
        """

        # Extract elements of interest
        for ifc_type, prefix in [("IfcWindow", "Window"), ("IfcWall", "Wall"), ("IfcDoor", "Door"), ("IfcCovering", "Ceiling"), ("IfcSlab", "Floor"), ("IfcCurtainWall", "Curtain_Wall"), ("IfcWallStandardCase", "Basic_Wall")]:
            elements = ifc_file.by_type(ifc_type)
            for index, element in enumerate(elements):
                # Safely retrieve attributes using getattr()
                name = getattr(element, "Name", "Unknown")
                global_id = getattr(element, "GlobalId", "Unknown")

                # Check for Thermal Transmittance for all elements
                u_value = "Unknown"
                for rel in ifc_file.by_type("IfcRelDefinesByProperties"):
                    if element.id() in [related.id() for related in rel.RelatedObjects]:
                        property_set = rel.RelatingPropertyDefinition
                        if hasattr(property_set, "HasProperties"):
                            for prop in property_set.HasProperties:
                                if prop.Name == "ThermalTransmittance":
                                    u_value = prop.NominalValue.wrappedValue
                                    break

                # Add RDF data for the element
                rdf_data += f"""
                    ex:{prefix}{index} a ifc:{ifc_type} ;
                        ex:hasName "{name}" ;
                        ex:hasGlobalId "{global_id}" ;
                        ex:hasThermalTransmittance "{u_value}" .
                """

        
        return rdf_data

    except Exception as e:
        print(f"Error processing IFC file: {e}")
        raise

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python ifc_to_rdf.py <input_ifc_path> <output_rdf_path>")
        sys.exit(1)
    
    input_ifc_path = sys.argv[1]
    output_rdf_path = sys.argv[2]

    try:
        # Generate RDF data
        rdf_output = convert_ifc_to_rdf(input_ifc_path)
        
        # Save the RDF data to the specified file
        with open(output_rdf_path, "w") as rdf_file:
            rdf_file.write(rdf_output)
        
        print(f"RDF data written to {output_rdf_path}")
    except Exception as error:
        print(f"Failed to process the file: {error}")
