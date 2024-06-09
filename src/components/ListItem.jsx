import './listItem.css';


const ListItem = ({id, name, title}) => {
  return (
    <div className='list-item' key={id} id={id}>
      <div className="title">
        {title}
      </div>
      <div className="artist">
        {name}
      </div>
    </div>
  );
}
 
export default ListItem;