import React from "react";

function Searchbar(props) {
    
    return (
        <>
            <input type="text" className="songSearchInput"></input>
            <button className="songSearchButton" onClick={props.populateSearchResults}>Search</button>
        </>
    )
}

export default Searchbar;