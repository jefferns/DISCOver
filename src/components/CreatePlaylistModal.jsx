const CreatePlaylistModal = ({

}) => {
  return ( 
    <div className="create-playlist-modal">
      <h1>Playlist Details</h1>
      <iframe src="https://open.spotify.com/embed/playlist/6pbGlp9tQ1hjXHtZV5js5I?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      <form>


        <button type="button" id="create">
          Create
        </button>
      </form>
    </div>
  );
}
 
export default CreatePlaylistModal;