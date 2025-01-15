import React, { Component } from 'react';

class BuildingInformation extends Component {
    state = {  } 
    render() { 
        return <div className="card">
                    <div className="card-header">
                        {this.props.title}
                    </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                            <p>{this.props.information}</p>
                            <p className="card-text"><small className="text-body-secondary">{this.props.additionalInfo}</small></p>
                            </blockquote>
                        </div>
                    </div>;
        }
}
 
export default BuildingInformation;