const SaveMatches = ({checked, toggleChecked}) => {
  return (
    <div className='setting-option save-matches' id='save-matches'>
      Save Matches between sessions: 
      <input type="checkbox" id="save" name="save" checked={checked} onChange={toggleChecked}/>
    </div>
  ); 
}
 
export default SaveMatches;