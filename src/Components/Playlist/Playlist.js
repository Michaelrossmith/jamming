import React from "react";
import './Playlist.css'

function Playlist({onChangePlaylistName, showPlaylist}) {

    return (
        <div className="playlist" style={{overflow: 'scroll'}}>
            <input type="text" onBlur={onChangePlaylistName} placeholder="Playlist Name"></input>
            <div className="playlist-track">{showPlaylist()}</div>
        </div>
    )
}

export default Playlist;