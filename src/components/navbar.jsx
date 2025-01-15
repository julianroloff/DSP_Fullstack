import React, { Component } from 'react';

class Navbar extends Component {
    state = {  }
    render() {
        return <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                    <a className="navbar-brand" href="/">IFC vs. Regulation Dashboard</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                        <div className="d-flex gap-2 mb-3" style={{ marginTop: '13px', marginRight: '20px' }}>
                            <label
                                htmlFor="file-upload"
                                className="btn btn-outline-primary d-flex align-items-center"
                                style={{ cursor: 'pointer' }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-upload"
                                    viewBox="0 0 16 16"
                                    style={{ marginRight: '10px' }} /* Space between icon and text */
                                >
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                </svg>
                                Upload File
                            </label>
                            <input
                                type="file"
                                id="file-upload"
                                accept=".ifc"
                                style={{ display: 'none' }}
                                onChange={async (event) => {
                                    const file = event.target.files[0];
                                    console.log("Selected file:", file);
                                
                                    if (!file) {
                                        alert("Please select a file!");
                                        return;
                                    }
                                
                                    // Create FormData to upload the file
                                    const formData = new FormData();
                                    formData.append("ifcFile", file);
                                
                                    try {
                                        const response = await fetch("http://localhost:3000/api/ifc-to-rdf", {
                                            method: "POST",
                                            body: formData,
                                        });
                                
                                        if (!response.ok) {
                                            throw new Error(`Error: ${response.statusText}`);
                                        }
                                
                                        // Handle file download
                                        const blob = await response.blob();
                                        const url = window.URL.createObjectURL(blob);
                                        const a = document.createElement("a");
                                        a.href = url;
                                        a.download = "converted.ttl"; // File name for the user
                                        a.click();
                                        window.URL.revokeObjectURL(url);
                                        alert("File successfully converted to RDF!");
                                    } catch (error) {
                                        console.error("Error uploading file:", error);
                                        alert("Failed to convert IFC file to RDF. Please try again.");
                                    }
                                }}
                            />
                        </div>

                        </li>
                        <li className="nav-item dropdown" style={{ marginTop: '13px'}}>
                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ...
                            </a>
                            <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="/">Action</a></li>
                            <li><a className="dropdown-item" href="/">Another action</a></li>
                            <li><a className="dropdown-item" href="/">Something else here</a></li>
                            </ul>
                        </li>
                        </ul>
                    </div>
                    </div>
                </nav>;
    }
}

export default Navbar;
