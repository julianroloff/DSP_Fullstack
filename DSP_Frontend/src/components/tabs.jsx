import React, { Component } from 'react';


class Tabs extends Component {    state = {  } 
    render() { 
        const {data} = this.props;

        return <ul className="nav nav-underline">
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <li key={index} className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">
                                    {item.address}
                                </a>
                            </li>
                        ))
                    ) : (
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">
                                Address not found
                            </a>
                        </li>
                    )}
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