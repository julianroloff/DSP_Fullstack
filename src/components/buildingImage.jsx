import React, { Component } from 'react';

class BuildingImage extends Component {
    state = {  } 
    render() { 
        return <div class="card" styles="width: 18rem;">
                <div class="card-header">
                        {this.props.title}
                </div>
                <img src={"/assets/img/" + this.props.image} className="card-img-top" alt="..."/>
            </div>; 
    }
}
 
export default BuildingImage;