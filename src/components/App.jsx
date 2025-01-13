import React, { Component } from 'react';
import CompareList from "./compareList";
import Navbar from './navbar'
import BuildingImage from './buildingImage';
import BuildingInformation from './buildingInformation';
import Tabs from './tabs';
import SearchBar from './searchBar';
import RegulationList from './regulationList';

class App extends Component {
    state = {
        // ToDo: This is dummy data, needs to be replaced once a working backend exists
        compareData: [
            { component: "Windows", regulationsMet: false, dueYear: "2030" },
            { component: "Walls", regulationsMet: true, dueYear: "--" },
            { component: "Doors", regulationsMet: false, dueYear: "2045" }
        ],
        // ToDo: This is dummy data, needs to be replaced once a working backend exists
        regulations: [
            {
                name: "Residential Building Regulation Regulation Amsterdam",
                link: "https://example.com/access",
                pdf: "https://example.com/document1.pdf"
            },
            {
                name: "Report of Isolation Standards Netherlands",
                link: "https://example.com/access2",
                pdf: "https://example.com/document2.pdf"
            },
            {
                name: "European Regulation of Retrofitting Residential Buildings",
                link: "https://example.com/access3",
                pdf: "https://example.com/document3.pdf"
            }
        ],
        // ToDo: This is dummy data, needs to be replaced once a working backend exists
        buildingData: [
            {
                address: "Science Park 904",
                postalCode:"1019BB",
                city:"Amsterdam",
                buildingYear:"2009"
            }
        ]
    } 
    render() { 
        return <React.Fragment>
                <header className="main-header">
                    <Navbar/>
                </header>
                <div className="subHeaderElement-container">
                    <div className="subHeaderElementLeft-container">
                        <div className="tab-container">
                            <Tabs data={this.state.buildingData}/>
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
                        <BuildingInformation title="Address" information={this.state.buildingData[0].address} additionalInfo={this.state.buildingData[0].postalCode + " " + this.state.buildingData[0].city}/>
                    </div>
                    <div className="infoYear-container">
                        <BuildingInformation title="Year" information={this.state.buildingData[0].buildingYear}/>
                    </div>
                    <div className="infoBvsR-container">
                        <BuildingInformation title="Building vs Regulation" information="27% Retrofit" additionalInfo="*to meet Regulations until 2030"/>
                    </div>
                </div>
                <div className="buildingImage-container">
                    <BuildingImage image="building.jpg" title="BIM Model"/>
                </div>
                <div className="list-container">
                    <div className="compareList-container">
                        <CompareList title="Component vs Regulation" data={this.state.compareData}/>
                    </div>
                    <div className="regulation-container">
                        <RegulationList title="Regulations and Standards for this Object" regulations={this.state.regulations}/>
                    </div>
                </div>
            </React.Fragment>;
    }
}
 
export default App;