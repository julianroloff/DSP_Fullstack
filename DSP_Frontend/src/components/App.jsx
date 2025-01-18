import React, { Component } from 'react';
import CompareList from "./compareList";
import Navbar from './navbar';
import BuildingImage from './buildingImage';
import BuildingInformation from './buildingInformation';
import Tabs from './tabs';
import SearchBar from './searchBar';
import EnergySavingsGraph from './EnergySavingsGraph';
import RegulationList from './regulationList';

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
                        <div className="tab-container">
                            <Tabs data={buildingData}/>
                        </div>
                    </div>
                    <div className="subHeaderElementRight-container">
                        <div className="downloadButton-container">
                            <button type="button" className="btn btn-primary btn-lg" style={{ fontSize: '8px' }}>Download Report</button>
                        </div>
                        <div className="searchBar-container">
                            <SearchBar/>
                        </div>
                    </div>
                </div>
                <div className="buildingInformation-container">
                    <div className="infoAddress-container">
                        <BuildingInformation 
                        title="Address" 
                        information={`${buildingData[0].address}, ${buildingData[0].buildingNumber}`} 
                        additionalInfo={`${buildingData[0].postalCode}  ${buildingData[0].city}`}
                        />
                    </div>
                    <div className="infoYear-container">
                        <BuildingInformation 
                        title="Year" 
                        information={`${buildingData[0].buildingYear}`}
                        />
                    </div>
                    <div className="infoBvsR-container">
                        <BuildingInformation 
                        title="Building vs Regulation" 
                        information="27% Retrofit" 
                        additionalInfo="*to meet Regulations until 2030"
                        />
                    </div>
                </div>
                <div className="imageGraph-container">
                    <div className="buildingImage-container">
                        <BuildingImage 
                        image="building.jpg" 
                        title="BIM Model"
                        />
                    </div>
                    <div className="energySavingsGraph-container">
                        <EnergySavingsGraph />
                    </div>
                </div>
                <div className="list-container">
                    <div className="compareList-container">
                        <CompareList title="Component vs Regulation" data={compareData}
                        />
                    </div>
                    <div className="regulation-container">
                        <RegulationList 
                        title="Regulations and Standards for this Object" 
                        regulations={this.state.regulations}
                        />
                    </div>
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
