import './App.css';
import Searchbar from '../Searchbar/Searchbar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {

  function populateSearchResults() {
    return <p>BING BONG BING BONG BING BONG BING BONG BING BONG BING BONG BING</p>
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jamming</h1>
        <Searchbar onClick={populateSearchResults}/>
        <SearchResults />
        <Playlist />
      </header>
        
    </div>
  );
}

export default App;
