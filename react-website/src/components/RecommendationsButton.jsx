import './getRecommendations.css';


const GetRecommendationsButton = ({
  handleClick,
  seeds
}) => {
  return (
    seeds.length ?
    <div className="get-recommendations">
      <button 
        className='btn' 
        style={{marginTop:'10px'}} 
        type='button' 
        onClick={handleClick}
      >
        Get Recommendations
      </button>
    </div>
    : null
  );
}
 
export default GetRecommendationsButton;