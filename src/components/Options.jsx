import './options.css';


const Options = ({
  onClick = () => {}, 
  options, 
  placeholderText = '',
}) => {
  return ( 
    <optgroup  className="options" label={placeholderText}>
      {options.map(option => (
        <option 
          className="option-row"
          key={option.id}
          value={option.value}
          onClick={onClick}
        >
          {option.name}
        </option>
        ))
      }
    </optgroup >
   );
}
 
export default Options;