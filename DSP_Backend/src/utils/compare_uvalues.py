import sys
import json
from rdflib import Graph, Namespace

def load_graph(file_path):
    graph = Graph()
    graph.parse(file_path, format="ttl")
    return graph

def get_uvalues(graph, namespace):
    query = f"""
    SELECT ?component ?uValue
    WHERE {{
        ?component a {namespace}:IfcWindow ;
                   {namespace}:hasThermalTransmittance ?uValue .
    }}
    """
    return graph.query(query)

def compare_uvalues(stored_uvalues, regulation_uvalues):
    comparisons = []
    for stored_component, stored_uvalue in stored_uvalues:
        for reg_component, reg_uvalue in regulation_uvalues:
            if float(stored_uvalue) > float(reg_uvalue):
                comparisons.append({
                    "component": str(stored_component),
                    "stored_uValue": float(stored_uvalue),
                    "regulation_uValue": float(reg_uvalue),
                    "status": "non-compliant"
                })
    return comparisons

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python compare_uvalues.py <stored_file> <regulations_file>")
        sys.exit(1)

    stored_file = sys.argv[1]
    regulations_file = sys.argv[2]

    stored_graph = load_graph(stored_file)
    regulations_graph = load_graph(regulations_file)

    EX = Namespace("http://example.org/")
    stored_uvalues = get_uvalues(stored_graph, EX)
    regulation_uvalues = get_uvalues(regulations_graph, EX)

    comparisons = compare_uvalues(stored_uvalues, regulation_uvalues)

    print(json.dumps(comparisons))  # Output results as JSON
