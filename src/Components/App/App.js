import React, {useState, useEffect} from 'react'
import './App.css';
import Track from '../Track/Track'
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import {getURL, buildAccessData} from '../../obtainSpotifyToken'

function App() {
  const [trackList, setTrackList] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [playlist, setPlaylist] = useState([])
  const [playlistURIs, setPlaylistURIs] = useState([])
  const [playlistName, setPlaylistName] = useState('')
  const [userToken, setUserToken] = useState('')
  const [searchKey, setSearchKey] = useState('')
  

  function handleAddTrackToPlaylist(track) {
    setPlaylist(oldArray => [...oldArray, track])
  }

  function handleAddTrackToTrackList(track) {
    setTrackList(oldArray => [...oldArray, track])
  }

  useEffect(() => {
    setTrackList(searchResults)
  }, [searchResults])

  function hadleRemoveTrackFromPlaylist(track) {
    setPlaylist(playlist.filter(thisTrack => thisTrack.name !== track.name))
  }

  function hadleRemoveTrackFromTrackList(track) {
    setTrackList(trackList.filter(thisTrack => thisTrack.name !== track.name))
  }

  function handlePlaylistName(event) {
    setPlaylistName(event.target.value)
  }

  function showSearchResults() {
    return (
        trackList.map(track => {
          return (
          <Track track={track} 
          onAddTrackToPlaylist={handleAddTrackToPlaylist} 
          isPlus={true} 
          onRemoveTrackFromTrackList={hadleRemoveTrackFromTrackList}/>
          )
        })
    )
  }
  
  const logIn = async () => {
    getURL()
  }

  const searchTracks = async (e) => {
    e.preventDefault()

    const accessData = (await buildAccessData()).accessData
    setUserToken(accessData.accessToken)
    console.log(userToken)
    
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
  
    var trackResponse = await fetch(
      "https://api.spotify.com/v1/search?q=" + 
      searchKey + "&type=track&limit=10", 
      params)
    .then(response => response.json())
    .then(data=> { return data.tracks.items})

    setSearchResults(await trackResponse)
  }
  
  function showPlaylist() {
    return (
      playlist.map(track => {
        return (
        <Track 
        track={track} 
        isPlus={false} 
        onAddTrackToPlaylist={handleAddTrackToPlaylist} 
        onRemoveTrackFromPlaylist={hadleRemoveTrackFromPlaylist} 
        onAddTrackToTrackList={handleAddTrackToTrackList}/>
        )
      })
  )
  }

  const [userId, setUserId] = useState('')

  const postPlaylist = async () => {

    //get user id
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
    var userIdResponse = await fetch('https://api.spotify.com/v1/me', params)
    .then(response => response.json())
    .then(data => {return data.id})
    console.log(userIdResponse)
    setUserId(userIdResponse)

    //create new playlist
    console.log(playlistName)
    const postPlaylistParams = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({name: playlistName,
      description: "New playlist description",
      public: false})
    }
    const playlistId = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`, postPlaylistParams)
      .then(response => response.json())
      .then(data => {return data.id})
      console.log(playlistId)

    //post playlist tracks
    const playlistIdsArray = []
    for(let i = 0; i < playlist.length; i++) {
      playlistIdsArray.push(playlist[i].uri);
    }
    
    setPlaylistURIs(playlistIdsArray)

    const addParams = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        uris: playlistURIs,
        position: 0
    })
    }
      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, addParams)
      .then(response => response.json())
      .then(data => console.log(data))
  }

  const reecesAnalysisUrl = async (e) => {
    e.preventDefault()

    const accessData = (await buildAccessData()).accessData
    setUserToken(accessData.accessToken)
    console.log(userToken)
    
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
  
    var trackResponseId = await fetch(
      "https://api.spotify.com/v1/search?q=" + 
      searchKey + "&type=track&limit=1", 
      params)
    .then(response => response.json())
    .then(data=> { return data.tracks.items[0].id})

    const urlparams = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
  
    await fetch(
      `https://api.spotify.com/v1/audio-features?ids=${trackResponseId}`, 
      urlparams)
    .then(response => response.json())
    .then(data=> console.log(data.audio_features))

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jamming</h1>
        <button className='login-button' onClick={logIn}>Log in</button>
        <input type="text" value={searchKey} className="songSearchInput" onChange={(e)=>{setSearchKey(e.target.value)}}></input>
        <button className="songSearchButton" onClick={searchTracks}>Search</button>
        <div className='playlist-container'>
          <SearchResults showSearchResults={showSearchResults}/>
          <Playlist 
            onChangePlaylistName={handlePlaylistName} 
            playlistName={playlistName} 
            showPlaylist={showPlaylist}
            />
        </div>
        <button onClick={reecesAnalysisUrl}>What spotifi thinks about Reece's Music</button>
        <button onClick={postPlaylist}>Save to Spotify</button>
      </header>
        
    </div>
  );
}

export default App;
