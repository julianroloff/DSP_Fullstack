import React, { Component } from 'react';
import CompareList from "./compareList";
import Navbar from './navbar';
import BuildingImage from './buildingImage';
import BuildingInformation from './buildingInformation';
import Tabs from './tabs';
import SearchBar from './searchBar';
import ComponentComplianceChart from './BarChart.jsx';
import RegulationList from './regulationList';

class App extends Component {
    state = {
        compareData: [],
        regulations: [],
        buildingData: [],
        summaryData: [],
        percentage: [],
        fileUploaded: false,
    };

    handleFileUpload = async () => {
        try {
            // Fetch and handle comparison data
            const response = await fetch("http://localhost:3000/api/compare-rdf");
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const compareData = await response.json();
            this.setState({ fileUploaded: true, compareData });
    
            // Fetch the CSV summary data
            const summaryResponse = await fetch("http://localhost:3000/api/upload-summary");
            if (!summaryResponse.ok) {
                throw new Error(`Error: ${summaryResponse.statusText}`);
            }
            const csvText = await summaryResponse.text();
    
            const summaryData = this.parseCSV(csvText);
    
            this.setState({ fileUploaded: true, summaryData });

            const percentageRespone = await fetch("http://localhost:3000/api/get-percentage");
            if (!percentageRespone.ok){
                throw new Error(`Error: ${percentageRespone.statusText}`);
            }

            const percentage = await percentageRespone.json()
            this.setState({ fileUploaded: true, percentage });


        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch comparison data or summary. Please try again.");
        }
    };
    
    // Utility function to parse CSV into an array of objects
    parseCSV = (csvText) => {
        const lines = csvText.split("\n");
        const headers = lines[0].split(","); // Get the headers from the first line
        const rows = lines.slice(1); // Get all rows except the header
    
        return rows
            .filter(row => row.trim() !== "") // Remove empty rows
            .map(row => {
                const values = row.split(",");
                return headers.reduce((acc, header, index) => {
                    acc[header] = isNaN(values[index]) ? values[index] : Number(values[index]);
                    return acc;
                }, {});
            });
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

        const { buildingData, compareData, percentage } = this.state;

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
                        information= {<b>{`${percentage.percentage}%`}</b>}
                        additionalInfo="*of envelop components are not meeting regulations and need to be retrofitted"
                        />
                    </div>
                </div>
                <div className="imageGraph-container">
                    <div className="buildingImage-container">
                        <BuildingImage 
                        // image="building.jpg"
                        image="img.png"
                        title="BIM Model"
                        />
                    </div>
                    <div className="compareList-container">
                        <CompareList title="Component vs Regulation" data={compareData}
                        />
                    </div>
                </div>
                <div className="list-container">
                <div className="barChart-container">
                    <ComponentComplianceChart 
                    summaryData={this.state.summaryData} 
                    compareData={this.state.compareData}
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
