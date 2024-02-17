import DropDown from "./Dropdown";

const seedingOptions = [
  {value: 'track', name: 'Songs', id: 'track'},
  {value: 'artist', name: 'Artist', id: 'artist'},
  // {value: 'genre', text: 'Genres'},
  {value: 'top-tracks', name: 'Your Top Songs', id: 'top-tracks'},
  {value: 'top-artists', name: 'Your Top Artists', id: 'top-artists'},
];

const SeedTypeSelector = ({
  handleChange,
  seedType,
}) => {
  return ( 
    <div className="seed-type-selector">
      <h1>Choose Seeding Option: </h1>
      <DropDown 
        options={seedingOptions}
        onChange={handleChange}
        title={'seeding-options'}
        value={seedType}
      />
    </div>
   );
}
 
export default SeedTypeSelector;