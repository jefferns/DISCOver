import './searchResults.css';

const SearchResults = ({
  handleSelect,
  results,
  selected,
}) => {

  return (
    results && 
    <div className="search-results">
      <select title='search-results' onChange={handleSelect}>
        <option value='' default>Select a result to add a seed</option>
          {results.map(result => 
            <option key={result.id} value={result.id}>
              {result.name + (selected === 'track' ? ` - ${result.artists[0].name}` : '')}
            </option>
          )} 
      </select>
    </div>
  );
}
 
export default SearchResults;