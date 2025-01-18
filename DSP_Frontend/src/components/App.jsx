import React, { Component } from 'react';
import CompareList from "./compareList";
import Navbar from './navbar';
import BuildingImage from './buildingImage';
import BuildingInformation from './buildingInformation';
import Tabs from './tabs';
import SearchBar from './searchBar';
import EnergySavingsGraph from './EnergySavingsGraph';

class App extends Component {
    state = {
        compareData: [],
        regulations: [],
        buildingData: [],
        fileUploaded: false,
    };

    handleFileUpload = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/compare-rdf");
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const compareData = await response.json();
            this.setState({ fileUploaded: true, compareData });
        } catch (error) {
            console.error("Error fetching comparison data:", error);
            alert("Failed to fetch comparison data. Please try again.");
        }
    };

    componentDidMount() {
        fetch("/api/buildings")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => this.setState({ buildingData: data }))
            .catch((error) => console.error("Error fetching building data:", error));
    }

    renderContent = () => {
        if (!this.state.fileUploaded) {
            return <p style={{ textAlign: 'center', marginTop: '20px' }}>Please upload an IFC file.</p>;
        }

        const { buildingData, compareData } = this.state;

        return (
            <React.Fragment>
                <div className="subHeaderElement-container">
                    <div className="subHeaderElementLeft-container">
                        <Tabs data={buildingData} />
                    </div>
                    <div className="subHeaderElementRight-container">
                        <SearchBar />
                    </div>
                </div>
                <div className="buildingInformation-container">
                    <BuildingInformation 
                        title="Address" 
                        information={`${buildingData[0]?.address || ""}`} 
                        additionalInfo={`${buildingData[0]?.postalCode || ""} ${buildingData[0]?.city || ""}`} 
                    />
                </div>
                <div className="imageGraph-container">
                    <BuildingImage image="building.jpg" title="BIM Model" />
                    <EnergySavingsGraph />
                </div>
                <div className="list-container">
                    <CompareList title="Component vs Regulation" data={compareData} />
                </div>
            </React.Fragment>
        );
    };

    render() {
        return (
            <>
                <header className="main-header">
                    <Navbar onFileUpload={this.handleFileUpload} />
                </header>
                {this.renderContent()}
            </>
        );
    }
}

export default App;
