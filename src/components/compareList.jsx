import React, { Component } from 'react';

class CompareList extends Component {
    state = {  } 
    render() { 
        return <div className="card" styles="width: 18rem;">
                    <div class="card-header">
                        {this.props.title}
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">A second item</li>
                        <li className="list-group-item">A third item</li>
                    </ul>
                </div>;
    }
}
 
export default CompareList;