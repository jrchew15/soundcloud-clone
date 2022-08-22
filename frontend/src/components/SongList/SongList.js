import { useRouteMatch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSongs, thunkDeleteSong } from "../../store/songs";
import { Modal } from '../../context/Modal';
import './SongList.css';

export default function SongList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();

    const isCurrentUser = useSelector(state => state.session.user.username) === match.path.split('/')[2];
    console.log('?', isCurrentUser)
    const [songsArr, setSongsArr] = useState([])
    const songs = useSelector(state => state.songs);

    useEffect(() => {
        dispatch(thunkGetSongs())
    }, [])

    useEffect(() => {
        setSongsArr(Object.values(songs))
    }, [songs])

    const redirectToEdit = (songId) => {
        history.push(`/songs/${songId}/edit`);
    }

    return (
        <>
            <ul className="song-list" style={{ gridColumn: 1 }}>
                {songsArr.map((song) => (
                    <li key={`${song.id}`}>
                        <img src={song.previewImage} alt={song.title} onError={(e) => { e.target.src = 'https://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png' }} />
                        <span>
                            {song.title}
                            <button onClick={() => redirectToEdit(song.id)}>Edit</button>
                            <DeleteConfirmationModal id={song.id} />
                        </span>
                    </li>
                ))}
            </ul>

        </>
    )
}

export function SongListActions() {
    const history = useHistory();
    const goToSongPage = () => {
        history.push('/songs/upload');
    }

    return (
        <ul style={{ gridColumn: 2 }}>
            <li>
                <button id='create-song' onClick={goToSongPage}>
                    Upload a Song
                </button>
            </li>
        </ul>
    )
}

function DeleteConfirmationModal({ id }) {
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
                            Do you want to delete?
                            <button onClick={handleDeleteClick}>Yes</button>
                            <button onClick={() => setShowModal(false)}>No</button>
                        </div>
                    </Modal>
                )
            }
        </>
    );
}
