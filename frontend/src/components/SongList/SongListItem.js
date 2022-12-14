import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunkDeleteSong } from "../../store/songs";
import { Modal } from '../../context/Modal';

import { actionConcatToQueue, playThis } from '../../store/queue.js';
import { default_album_image } from "../../utils/default_images";
import { parsedDate } from "../../utils/functions";

export default function SongItem({ song }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const redirectToEdit = (songId) => {
        history.push(`/songs/${songId}/edit`);
    }

    return (
        <>
            <div style={{ position: 'relative', height: 250 }} onClick={() => dispatch(playThis(song))}>
                <img className="song-item-image" src={song.previewImage || default_album_image} alt={song.title} onError={(e) => { e.target.src = default_album_image }} />
                <i className='fas fa-play playable' />
            </div>
            <div className='song-list-details'>
                <span style={{ gridArea: 'artist' }}><span style={{ cursor: 'pointer' }} onClick={() => history.push(`/users/${song.userId}`)}>{song.Artist && song.Artist.username}</span></span>
                <span style={{ gridArea: 'title' }}><span style={{ cursor: 'pointer' }} onClick={() => history.push(`/songs/${song.id}`)}>{song.title}</span></span>
                <div
                    className="waveform"
                    style={{ gridArea: 'waveform' }}
                />
                {song.userId === user?.id &&
                    <span style={{ gridArea: 'buttons2', display: 'flex', justifyContent: 'space-between' }}>
                        {<button className="song-item-user-button" onClick={() => redirectToEdit(song.id)}>Edit</button>}
                        {<DeleteConfirmationModal id={song.id} title={song.title} />}
                    </span>
                }
                <i
                    style={{ gridArea: 'button' }}
                    className="fa-solid fa-play"
                    onClick={() => dispatch(playThis(song))}
                />
                <span style={{ gridArea: 'date' }}>{'Uploaded ' + parsedDate(song.createdAt)}</span>
                <span
                    style={{ gridArea: 'genre' }}
                    className='queue-button'
                    onClick={() => dispatch(actionConcatToQueue([song]))}
                >
                    Add to Queue
                    <i className="fa-solid fa-angle-double-right" />
                </span>
            </div>
        </>
    )
}

function DeleteConfirmationModal({ id, title }) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteClick = async () => {
        const res = await dispatch(thunkDeleteSong(id));
        setShowModal(false)
    }

    return (
        <>
            <button className="song-item-user-button" onClick={() => setShowModal(true)} >Delete</button>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <div id="delete-modal">
                            {`Do you want to delete "${title}"?`}
                            <div >
                                <button onClick={handleDeleteClick}>Yes</button>
                                <button onClick={() => setShowModal(false)}>No</button>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </>
    );
}
