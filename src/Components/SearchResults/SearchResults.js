import React from "react";
import './SearchResults.css'

function SearchResults({showSearchResults}) {
    return <>
        <div className="Search-results" style={{overflow: 'scroll'}}>
        <h3 style={{borderBottom: '1px solid white', margin: 0}}>Search Results</h3>
            {showSearchResults()}
        </div>
    </>
    
}

export default SearchResults;