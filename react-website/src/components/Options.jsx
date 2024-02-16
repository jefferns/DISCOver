import './options.css';


const Options = ({
  onClick = () => {}, 
  options, 
  placeholderText = '',
}) => {
  return ( 
    <div className="options">
      <option key='default' value='default' disabled={true}> {placeholderText} </option>
      {options.map(option => (
        <option key={option.id} value={option.value} onClick={onClick}>
          {option.name}
        </option>
        ))
      }
    </div>
   );
}
 
export default Options;