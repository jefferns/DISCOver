import './dropdown.css';
import Options from './Options';

const DropDown = ({
  onChange,
  options,
  placeholderText = 'Choose an option', 
  title,
  value, 
}) => {
  return ( 
    <select
      className="dropdown"
      title={title}
      value={value}
      onChange={onChange}
      style={{display: 'none'}}
    >
      <Options 
        options={options}
        placeholderText={placeholderText}
      />
    </select>

   );
}
 
export default DropDown;