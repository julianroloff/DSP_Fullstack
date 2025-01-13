import React, { Component } from 'react';

class SearchBar extends Component {
    state = {  } 
    render() { 
        return <div>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
    }
}
 
export default SearchBar;