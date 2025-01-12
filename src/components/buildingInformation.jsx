import React, { Component } from 'react';

class BuildingInformation extends Component {
    state = {  } 
    render() { 
        return <div class="card">
                    <div class="card-header">
                        {this.props.title}
                    </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                            <p>{this.props.information}</p>
                            <p class="card-text"><small class="text-body-secondary">{this.props.additionalInfo}</small></p>
                            </blockquote>
                        </div>
                    </div>;
        }
}
 
export default BuildingInformation;