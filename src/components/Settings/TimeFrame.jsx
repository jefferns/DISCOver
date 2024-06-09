import DropDown from "../Dropdown";

const TimeFrame = ({
  handleTimeChange, 
  value
}) => {
  const terms = [
    {id: 'short_term', value: 'short_term', name: 'Short Term'}, 
    {id: 'medium_term', value: 'medium_term', name: 'Medium Term'}, 
    {id: 'long_term', value: 'long_term', name: 'Long Term'}
  ];

  return ( 
    <div className='setting-option time-frame' id='time'>
      Time: 
      <DropDown 
        value={value}
        onChange={handleTimeChange} 
        options={terms}
        title='time-range'
      />
    </div>
  );
}
 
export default TimeFrame;