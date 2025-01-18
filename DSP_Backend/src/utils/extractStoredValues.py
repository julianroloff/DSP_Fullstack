import sys
from rdflib import Graph

def load_graph(file_path):
    """Load RDF graph from a TTL file."""
    graph = Graph()
    graph.parse(file_path, format="ttl")
    print(f"Loaded {len(graph)} triples from {file_path}")
    return graph

def run_query(graph):
    """Run SPARQL query to fetch IfcWindow components and their thermal transmittance."""
    query = """
    PREFIX ex: <http://example.org/>
    PREFIX ifc: <http://ifcowl.openbimstandards.org/IFC2X3_TC1#>
    
    SELECT ?window ?thermalTransmittance
    WHERE {
        ?window a ifc:IfcWindow ;
               ex:hasThermalTransmittance ?thermalTransmittance .
    }
    """
    print(f"Executing query:\n{query}")
    results = graph.query(query)
    return results

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python test_query.py <rdf_file>")
        sys.exit(1)

    rdf_file = sys.argv[1]

    # Load the RDF graph
    graph = load_graph(rdf_file)

    # Run the query
    results = run_query(graph)

    # Print the results
    print("\nQuery Results:")
    for row in results:
        print(f"Window: {row.window}, Thermal Transmittance: {row.thermalTransmittance}")
