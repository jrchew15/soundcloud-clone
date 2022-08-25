import { useRouteMatch, useHistory, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteSong } from "../../store/songs";
import { Modal } from '../../context/Modal';
import { csrfFetch } from "../../store/csrf";
import { actionConcatToQueue, playThis } from '../../store/queue.js';
import { default_album_image, waveform_image } from "../../utils/default_images";
import { parsedDate } from "../../utils/functions";
import './SongList.css';

export default function SongList({ user, isCurrentUser }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    const userId = match.path.split('/')[2];

    const [songsArr, setSongsArr] = useState([])
    const songs = useSelector(state => state.songs);

    useEffect(() => {
        if (isCurrentUser) {
            setSongsArr(Object.values(songs).map(song => {
                return { ...song, Artist: { id: user.id, username: user.username, previewImage: user.previewImage } }
            }));
            return
        }
        getSongsByArtist()

        async function getSongsByArtist() {
            const res = await csrfFetch(`/api/users/${userId}/songs`);
            const { Songs } = await res.json();
            setSongsArr(Songs.map(song => {
                return { ...song, Artist: { id: user.id, username: user.username, previewImage: user.previewImage } }
            }));
        }
    }, [])

    const redirectToEdit = (songId) => {
        history.push(`/songs/${songId}/edit`);
    }

    return (
        <ul className="song-list" style={{ gridColumn: 1 }}>
            {songsArr.map((song) => (
                <li key={`${song.id}`}>
                    <Link to={`/songs/${song.id}`}>
                        <img src={song.previewImage || default_album_image} alt={song.title} onError={(e) => { e.target.src = default_album_image }} />
                    </Link>
                    <div className='song-list-details'>
                        <span style={{ gridArea: 'artist' }}>{user && user.username}</span>
                        <span style={{ gridArea: 'title' }}>{song.title}</span>
                        <img className="waveform" style={{ gridArea: 'waveform' }} src={waveform_image} alt='waveform-placeholder' />
                        <span style={{ gridArea: 'buttons1' }}>{isCurrentUser && <button onClick={() => redirectToEdit(song.id)}  >Edit</button>}</span>
                        <span style={{ gridArea: 'buttons2' }}>{isCurrentUser && <DeleteConfirmationModal id={song.id} title={song.title} />}</span>
                        <i style={{ gridArea: 'button' }} className="fa-solid fa-play" onClick={(e) => dispatch(playThis(song))} />
                        <span style={{ gridArea: 'date' }}>{'Uploaded ' + parsedDate(song.createdAt)}</span>
                        <span style={{ gridArea: 'genre' }} className='queue-button' onClick={() => dispatch(actionConcatToQueue([song]))}>Add to Queue<i className="fa-solid fa-angle-double-right" /></span>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export function SongListActions({ isCurrentUser }) {
    const history = useHistory();
    const goToSongPage = () => {
        history.push('/songs/upload');
    }

    return isCurrentUser && (
        <ul style={{ gridColumn: 2 }}>
            <li>
                <button id='create-song' onClick={goToSongPage}>
                    Upload a Song
                </button>
            </li>
        </ul>
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
