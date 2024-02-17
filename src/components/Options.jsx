import './options.css';


const Options = ({
  onClick = () => {}, 
  options, 
  placeholderText = '',
}) => {
  return ( 
    <optgroup  className="options" label={placeholderText}>
      {/* <option key='default' value='default' disabled={true}> {placeholderText} </option> */}
      {options.map(option => (
        <option key={option.id} value={option.value} onClick={onClick}>
          {option.name}
        </option>
        ))
      }
    </optgroup >
   );
}
 
export default Options;