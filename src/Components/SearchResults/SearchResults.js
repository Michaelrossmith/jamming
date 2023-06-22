import React from "react";
import trackResultList from "../../TrackResultList";

function SearchResults() {
    return (
        trackResultList.map(function(track){
            return (
            <>
                <p>{track.name}</p>
                <p>{track.artist}</p>
                <p>{track.album}</p>
            </>
            )
        })
    )
}

export default SearchResults;