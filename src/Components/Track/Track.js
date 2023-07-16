import React from "react";
import "./Track.css";
import { ReactComponent as Plus} from "../../plus-solid.svg";
import { ReactComponent as Minus} from "../../minus-solid.svg";

function Track({track, 
    onAddTrackToPlaylist, 
    isPlus, 
    onRemoveTrackFromPlaylist, 
    onRemoveTrackFromTrackList,
    onAddTrackToTrackList}) {
    return (
            <div className="track-container">
            <div className="track-details">
                <h4 className="track-name">{track.name}</h4>
                <p className="artist-name">{track.artists[0].name}</p>
                <p className="album-name">{track.album.name}</p>
            </div>
                <button className="add-to-playlist-button" 
                onClick={() => {
                    if(isPlus) { 
                onAddTrackToPlaylist(track)
                onRemoveTrackFromTrackList(track)} else { 
                onRemoveTrackFromPlaylist(track) 
                onAddTrackToTrackList(track)}}} >
                    {isPlus ? <Plus /> : <Minus />}
                </button>
            </div>
    )
}

export default Track;