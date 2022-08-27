import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunkDeleteSong } from "../../store/songs";
import { Modal } from '../../context/Modal';

import { actionConcatToQueue, playThis } from '../../store/queue.js';
import { default_album_image, waveform_image } from "../../utils/default_images";
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
            <Link to={`/songs/${song.id}`}>
                <img src={song.previewImage || default_album_image} alt={song.title} onError={(e) => { e.target.src = default_album_image }} />
            </Link>
            <div className='song-list-details'>
                <span style={{ gridArea: 'artist' }}>{song.Artist && song.Artist.username}</span>
                <span style={{ gridArea: 'title' }}>{song.title}</span>
                <div
                    className="waveform"
                    style={{ gridArea: 'waveform' }}
                />
                {song.userId === user?.id && <span style={{ gridArea: 'buttons1' }}>{<button onClick={() => redirectToEdit(song.id)}>Edit</button>}</span>}
                {song.userId === user?.id && <span style={{ gridArea: 'buttons2' }}>{<DeleteConfirmationModal id={song.id} title={song.title} />}</span>}
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
            <button onClick={() => setShowModal(true)} >Delete</button>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <div >
                            {`Do you want to delete ${title}?`}
                            <button onClick={handleDeleteClick}>Yes</button>
                            <button onClick={() => setShowModal(false)}>No</button>
                        </div>
                    </Modal>
                )
            }
        </>
    );
}
