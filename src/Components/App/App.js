import React, {useState} from 'react'
import './App.css';
import Track from '../Track/Track'
import Searchbar from '../Searchbar/Searchbar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import trackResultList from '../../TrackResultList';
import {getURL, buildAccessData} from '../../obtainSpotifyToken'

function App() {
  
  buildAccessData();

  const [trackList, setTrackList] = useState([])
  const [playlist, setPlaylist] = useState([])
  const [playlistURIs, setPlaylistURIs] = useState([])
  const [playlistName, setPlaylistName] = useState("")

  function handleAddTrackToPlaylist(track) {
    setPlaylist(oldArray => [...oldArray, track])
  }

  function handleAddTrackToTrackList(track) {
    setTrackList(oldArray => [...oldArray, track])
  }

  function hadleRemoveTrackFromPlaylist(track) {
    setPlaylist(playlist.filter(thisTrack => thisTrack.name !== track.name))
  }

  function hadleRemoveTrackFromTrackList(track) {
    setTrackList(trackList.filter(thisTrack => thisTrack.name !== track.name))
  }

  function handlePlaylistName(event) {
    setPlaylistName(event.target.value)
  }

  function handleGetSearchResults() {
    setTrackList(trackResultList)
  }

  function showSearchResults() {
    return (
        trackList.map(track => {
          return (
          <Track track={track} onAddTrackToPlaylist={handleAddTrackToPlaylist} isPlus={true} onRemoveTrackFromTrackList={hadleRemoveTrackFromTrackList}/>
          )
        })
    )
  }
  
  function showPlaylist() {
    return (
      playlist.map(track => {
        return (
        <Track track={track} isPlus={false} onAddTrackToPlaylist={handleAddTrackToPlaylist} onRemoveTrackFromPlaylist={hadleRemoveTrackFromPlaylist} onAddTrackToTrackList={handleAddTrackToTrackList}/>
        )
      })
  )
  }

  function handlePlayListUris () {
    setPlaylistURIs(playlist.map(track => track.uri))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jamming</h1>
        <button onClick={getURL}>Log in</button>
        <Searchbar onGetSearchResults={handleGetSearchResults}/>
        <div className='playlist-container'>
          <SearchResults showSearchResults={showSearchResults}/>
          <Playlist 
            onChangePlaylistName={handlePlaylistName} 
            playlistName={playlistName} 
            showPlaylist={showPlaylist}
            />
        </div>
        <button onSavePlaylist={handlePlayListUris} >Save to Spotify</button>
      </header>
        
    </div>
  );
}

export default App;
