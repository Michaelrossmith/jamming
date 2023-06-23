import React from "react";

function Searchbar({onGetSearchResults}) {
    
    return (
        <>
            <input type="text" className="songSearchInput"></input>
            <button className="songSearchButton" onClick={onGetSearchResults}>Search</button>
        </>
    )
}

export default Searchbar;