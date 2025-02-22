import pandas as pd
from rdflib import Graph, URIRef, Literal
import sys

def process_ttl_to_csv(input_file):
    graph = Graph()
    graph.parse(input_file, format="ttl")

    results = {}

    # Iterate through all triples in the graph
    for subject, predicate, obj in graph:
        # Identify IFC object types (e.g., ifcWindow, ifcDoor, etc.)
        if "ifc" in str(obj):
            object_type = str(obj).split("#")[-1]

            if object_type not in results:
                results[object_type] = {"count": 0, "has_thermal_transmittance": 0}

            # Increment the count of instances for the object type
            results[object_type]["count"] += 1

            # Check if the subject also has a thermalTransmittance predicate
            for _, p, o in graph.triples((subject, None, None)):
                if "hasThermalTransmittance" in str(p):
                    if isinstance(o, Literal):
                        try:
                            float(o)
                            print(f"Found thermal transmittance for {object_type} with value: {o}")
                            results[object_type]["has_thermal_transmittance"] += 1
                        except ValueError:
                            print(f"Skipping non-numeric thermal transmittance value: {o}")
                    break

    # Convert results to DataFrame
    df_results = pd.DataFrame.from_dict(results, orient="index")
    df_results.reset_index(inplace=True)
    df_results.rename(columns={"index": "IFC_Object"}, inplace=True)
    print(df_results)
    # Save to CSV
    return df_results

if __name__ == "__main__":
    # input_path = "../stored_rdf_files/stored.ttl"  # Replace with your input file path
    # output_path = "../data/ifc_analysis_results.csv"  # Replace with your desired output file path
    # process_ttl_to_csv(input_path, output_path)
    # print(f"Results saved to {output_path}")

    if len(sys.argv) != 3:
        print("Usage: python extractSummary.py <input_rdf_path> <output_csv_path>")
        sys.exit(1)

    input_rdf_path = sys.argv[1]
    output_csv_path = sys.argv[2]

    try:
        # Generate summary data
        csv_output = process_ttl_to_csv(input_rdf_path)

        # Save the summary data to the specified file
        csv_output.to_csv(output_csv_path, index=False)

        print(f"Summary written to {output_csv_path}")
    except Exception as error:
        print(f"Failed to process the file: {error}")

