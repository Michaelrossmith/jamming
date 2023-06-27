import React from "react";
import './SearchResults.css'

function SearchResults({showSearchResults}) {
    return <div className="Search-results">{showSearchResults()}</div>
}

export default SearchResults;