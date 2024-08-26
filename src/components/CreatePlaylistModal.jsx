import { useCallback, useState } from "react";
import './createPlaylistModal.css';
import { addTracksToPlaylist, createPlaylist, getMe, setPlaylistImage } from "../extras/api";
import { wait } from "../extras/helpers";

const CreatePlaylistModal = ({
  matches,
  setPlaylistURL,
  setShowCreationModal,
  show, 
}) => {
  const [description, setDesciption] = useState('Created with DISCOver at jefferis.dev');
  const [title, setTitle] = useState('DISCOver');

  const addMatchesToPlaylist = useCallback((id) => {
    let uris = []
    matches.forEach((song) => {
      uris.push(song.uri)
    })
    addTracksToPlaylist(id, uris);
  },[matches]);


  const handleDescriptionChange = useCallback((e) => {
    setDesciption(e.target.value);
  }, []);

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleCancel = () => {
    setShowCreationModal(false);
    setTitle('DISCOver');
    setDesciption('Created with DISCOver at jefferis.dev');
  };

  const updateCoverArt = (id) => {
    setPlaylistImage(id)
    .then(response => response.json())
    .then(response => {
      // succussfully updated playlist art
    });
  };

  const handleSubmit = useCallback(async () => {
    getMe()
    .then(response => response.json())
    .then(response => {
      const id = response.id;

      // create playlist
      createPlaylist(id, title, description, false)
      .then(response => response.json())
      .then(async (response) => {
        let playlist_id = response.id;
        if(!playlist_id) return; // TODO: implement error handling
        // add each song to the new playlist
        addMatchesToPlaylist(playlist_id);
        setPlaylistURL(response.external_urls.spotify);
        setShowCreationModal(false);
        alert('Successfully exported playlist!');
        await wait(5000);
        updateCoverArt(playlist_id);
      });
    });
  }, [addMatchesToPlaylist, description, setPlaylistURL, setShowCreationModal, title]);

  return (
    <>
      {show && <div className="modal-wrapper">
        <div className="create-playlist-modal">
          <div className="modal-header">
            <div className="header-title">Playlist Details</div>
          </div>
          <div className="create-modal-content">
            <div className="image-container">
              <img alt="Playlist Cover Art" src="cover.png"/>
            </div>
            <form>
              <div className="fields">
                <div className="field">
                  <label id="table">Title: </label>
                  <input id="title" type="text" placeholder={'DISCOver'} onChange={handleTitleChange} />
                </div>
                <div className="field" style={{flexGrow: '1'}}>
                  <label id="description">Description: </label>
                  <textarea id="description" maxLength={300} onChange={handleDescriptionChange} placeholder={'Created with DISCOver at jefferis.dev'}/>
                </div>
              </div>
            </form>
          </div>
          <div className="footer">
            <button type="button" id="cancel" className="cancel" onClick={handleCancel}>
              Cancel
            </button>
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