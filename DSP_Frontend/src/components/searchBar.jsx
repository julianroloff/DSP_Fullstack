import React, { Component } from 'react';

class SearchBar extends Component {
    state = {  } 
    render() { 
        return <div>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
    }
}
 
export default SearchBar;