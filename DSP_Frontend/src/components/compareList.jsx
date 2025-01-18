import React, { Component } from "react";

class CompareList extends Component {
    render() {
        const { data, title } = this.props;

        return (
            <div className="card" style={{ width: "100%", padding: "16px" }}>
                <div className="card-header" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {title}
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Component</th>
                            <th>Regulations Met</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.component}</td>
                                    <td>
                                        <span style={{ color: item.regulationsMet ? "green" : "red" }}>
                                            {item.regulationsMet ? "✔" : "✘"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" style={{ textAlign: "center" }}>
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div style={{ textAlign: "right", marginTop: "16px" }}>
                    <button className="btn btn-primary">Open Detailed View</button>
                </div>
            </div>
        );
    }
}

export default CompareList;
