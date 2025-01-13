import React, { Component } from 'react';


class Tabs extends Component {    state = {  } 
    render() { 
        return <ul className="nav nav-underline">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">{this.props.tab1}</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">{this.props.tab2}</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">{this.props.tab3}</a>
                </li>
            </ul>;
    }
}



export default Tabs;