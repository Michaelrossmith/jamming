import React, {useState} from 'react'
import './App.css';
import Searchbar from '../Searchbar/Searchbar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import trackResultList from '../../TrackResultList';

function App() {

  const [trackList, setTrackList] = useState(["Search a song"])
  
  function handleGetSearchResults() {
    setTrackList(trackResultList)
  }

  function showSearchResults() {
    return (
      <>
        {trackList.map(track => {
          return (
          <>
            <p>{track.name}</p>
            <p>{track.artist}</p>
            <p>{track.album}</p>
          </>
          )})}
      </>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jamming</h1>
        <Searchbar onGetSearchResults={handleGetSearchResults}/>
        <SearchResults showSearchResults={showSearchResults}/>
        <Playlist />
      </header>
        
    </div>
  );
}

export default App;
