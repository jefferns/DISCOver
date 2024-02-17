import './goButton.css';

const GoButton = ({setDiscoveryMode}) => {
  const handleClick = () => {
    setDiscoveryMode(true);
  }
  return (
    <div className="go-wrapper">
      <button type="button" className='btn' onClick={handleClick}>
        Let's Go &#10148;
      </button>
    </div>
  );
}
 
export default GoButton;