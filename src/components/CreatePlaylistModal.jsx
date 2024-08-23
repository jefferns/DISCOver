import { useCallback, useState } from "react";
import './createPlaylistModal.css';
import { addTracksToPlaylist, createPlaylist, getMe } from "../extras/api";

const CreatePlaylistModal = ({
  matches,
  setPlaylistURL,
  setShowCreationModal,
  show, 
}) => {
  const [description, setDesciption] = useState(undefined);
  const [title, setTitle] = useState(undefined);

  const addMatchesToPlaylist = useCallback((id) => {
    let uris = []
    matches.forEach((song) => {
      uris.push(song.uri)
    })
    addTracksToPlaylist(id, uris);
  },[matches]);

  const handleSubmit = useCallback(() => {
    getMe()
    .then(response => response.json())
    .then(response => {
      const id = response.id;

      // create playlist
      createPlaylist(id, title, description)
      .then(response => response.json())
      .then(response => {
        let playlist_id = response.id;
        if(!playlist_id) return;
        // add each song to the new playlist
        addMatchesToPlaylist(playlist_id);
        setPlaylistURL(response.external_urls.spotify);
        setShowCreationModal(false);
        alert('Successfully exported playlist!');
      });
    });
  }, [addMatchesToPlaylist, description, setPlaylistURL, setShowCreationModal, title]);

  return (
    <>
      {show && <div className="modal-wrapper">
        <div className="create-playlist-modal">
          <div className="modal-header">
            <div className="header-title">Playlist Details</div>
            <div className="xout">x</div>
          </div>
          <div className="create-modal-content">
            <div className="image-container">
              <img alt="Playlist Cover Art" src="cover.png"/>
            </div>
            <form>
              <div className="fields">
                <div className="field">
                  <label id="table">Title: </label>
                  <input id="title" type="text" placeholder={'DISCOver'} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="field" style={{flexGrow: '1'}}>
                  <label id="description">Description: </label>
                  <input id="description" maxLength={300} onChange={(e)=>setDesciption(e.target.value)}placeholder={'Created with DISCOver at jefferis.dev'}/>
                </div>
              </div>
            </form>
          </div>
          <div className="footer">
            <button type="button" id="create" onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      </div>
      }
    </>
  );
}
 
export default CreatePlaylistModal;