import React from "react";

function Searchbar({searchTracks}) {
    
    return (
        <>
            <input type="text" className="songSearchInput"></input>
            <button className="songSearchButton" onClick={searchTracks}>Search</button>
        </>
    )
}

export default Searchbar;