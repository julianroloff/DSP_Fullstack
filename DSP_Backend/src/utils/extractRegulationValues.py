import sys
from rdflib import Graph

def load_graph(file_path):
    """Load RDF graph from a TTL file."""
    graph = Graph()
    graph.parse(file_path, format="ttl")
    print(f"Loaded {len(graph)} triples from {file_path}")
    return graph

def run_query(graph):
    """Run SPARQL query to fetch components and their maximum U-values from regulations."""
    query = """
    PREFIX ex: <http://example.org/>
    SELECT ?component ?maxUValue
    WHERE {
        ?regulation a ex:Regulation ;
                    ex:appliesTo ?component ;
                    ex:maxUValue ?maxUValue .
    }
    """
    print(f"Executing query:\n{query}")
    results = graph.query(query)
    return results

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python test_regulations_query.py <rdf_file>")
        sys.exit(1)

    rdf_file = sys.argv[1]

    # Load the RDF graph
    graph = load_graph(rdf_file)

    # Run the query
    results = run_query(graph)

    # Print the results
    print("\nQuery Results:")
    for row in results:
        print(f"Component: {row.component}, Max U-Value: {row.maxUValue}")
