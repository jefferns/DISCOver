import DropDown from "../Dropdown";

const TimeFrame = ({
  handleTimeChange, 
  settings
}) => {
  const terms = [
    {id: 'short_term', value: 'short_term', name: 'Short Term'}, 
    {id: 'medium_term', value: 'medium_term', name: 'Medium Term'}, 
    {id: 'long_term', value: 'long_term', name: 'Long Term'}
  ];

  return ( 
    <div className="setting time-frame">
      <div className='setting-option' id='time'>
        Time: 
        <DropDown 
          defaultValue={settings.time_range}
          onChange={handleTimeChange} 
          options={terms}
          title='time-range'
        />
      </div>
    </div>
   );
}
 
export default TimeFrame;