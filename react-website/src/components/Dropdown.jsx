import './dropdown.css';
import Options from './Options';

const DropDown = ({
  defaultValue = '',
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
      defaultValue={defaultValue}
    >
      <Options 
        options={options}
        placeholderText={placeholderText}
      />
    </select>

   );
}
 
export default DropDown;