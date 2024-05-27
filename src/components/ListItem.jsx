import './listItem.css';


const ListItem = ({data}) => {
  return (
    <div className='list-item' key={data.id} id={data.id}>
      <div className="title">
        {data?.name}
      </div>
      <div className="artist">
        {data?.artists[0]?.name}
      </div>
    </div>
  );
}
 
export default ListItem;