import React, { Component } from 'react';
import CompareList from "./compareList";
import Navbar from './navbar'
import BuildingImage from './buildingImage';
import BuildingInformation from './buildingInformation';
import Tabs from './tabs';
import SearchBar from './searchBar';

class App extends Component {
    state = {  } 
    render() { 
        return <React.Fragment>
                    <Navbar/>
                    <div className="subHeaderElement-container">
                        <Tabs tab1="Science Park 904" tab2="Ertskade 160" tab3="Piet Heinkade 27"/>
                        <button type="button" class="btn btn-primary btn-lg">Download Report</button>
                        <SearchBar/>
                    </div>
                    <div className="buildingInformation-container">
                        <BuildingInformation title="Adress" information="Science Park 904" additionalInfo="1019BB Amsterdam"/>
                        <BuildingInformation title="Year" information="2009"/>
                        <BuildingInformation title="Building vs Regulation" information="27% Retrofit" additionalInfo="*to meet Regulations until 2030"/>
                    </div>
                    <div className="buildingImage-container">
                        <BuildingImage image="building.jpg" title="BIM Model"/>
                    </div>
                    <div className="compareList-container">
                        <CompareList title="Component vs Regulation"/>
                        <CompareList title="Regulations and Standards for this Object"/>
                    </div>
            </React.Fragment>;
    }
}
 
export default App;