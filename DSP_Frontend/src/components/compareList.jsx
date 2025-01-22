import React, { Component } from "react";

class CompareList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedTypes: {}, // Tracks which types are expanded
        };
    }

    // Helper to toggle a type's expanded/collapsed state
    toggleType = (type) => {
        this.setState((prevState) => ({
            expandedTypes: {
                ...prevState.expandedTypes,
                [type]: !prevState.expandedTypes[type],
            },
        }));
    };

    // Helper to group data by type
    groupByType = (data) => {
        return data.reduce((acc, item) => {
            const type = item.type;
            if (!acc[type]) acc[type] = [];
            acc[type].push(item);
            return acc;
        }, {});
    };

    render() {
        const { data, title } = this.props;
        const { expandedTypes } = this.state;

        // Group components by their type
        const groupedData = this.groupByType(data);

        return (
            <div className="card" style={{ width: "100%", padding: "16px" }}>
                <div className="card-header" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {title}
                </div>
                {Object.keys(groupedData).length > 0 ? (
                    <div>
                        {Object.entries(groupedData).map(([type, items]) => (
                            <div key={type} style={{ marginBottom: "16px" }}>
                                {/* Type Header */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        fontSize: "1rem",
                                    }}
                                    onClick={() => this.toggleType(type)}
                                >
                                    <span>{type}</span>
                                    <span>
                                        {expandedTypes[type] ? "▲" : "▼"}
                                    </span>
                                </div>

                                {/* Items under the type */}
                                {expandedTypes[type] && (
                                    <table className="table table-striped" style={{ marginTop: "8px" }}>
                                        <thead>
                                            <tr>
                                                <th>Component</th>
                                                <th>Regulations Met</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.component}</td>
                                                    <td>
                                                        <span style={{ color: item.regulationsMet ? "green" : "red" }}>
                                                            {item.regulationsMet ? "✔" : "✘"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: "center", marginTop: "16px" }}>
                        No data available
                    </div>
                )}
                <div style={{ textAlign: "right", marginTop: "16px" }}>
                    <button className="btn btn-primary">Open Detailed View</button>
                </div>
            </div>
        );
    }
}

export default CompareList;
