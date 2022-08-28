import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { useDispatch, useSelector } from "react-redux";
import { actionConcatToQueue, playThis } from "../../store/queue";
import CommentsSection from "../Comments/CommentsSection";
import { default_album_image } from "../../utils/default_images";
import { thunkDeleteSong } from "../../store/songs";
import { Modal } from "../../context/Modal";
import "../SongList/SongList.css";
import "./SongDetails.css";

export default function SongDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const { songId } = useParams();
    const [song, setSong] = useState(null);
    useEffect(() => {
        fetchSong();
        async function fetchSong() {
            let res = await csrfFetch(`/api/songs/${songId}`);

            const fetchedSong = await res.json();

            setSong(fetchedSong);
        }
    }, [songId]);

    return (song &&
        (
            <>
                <div id='song-detail-header' >
                    <div id='song-content-container'>
                        <span id='song-header-upper-left'>
                            <i className="fa-solid fa-play" onClick={() => dispatch(playThis(song))} />
                            <div>
                                <span style={{ fontSize: '1.2em', color: 'white' }} >{song.title}</span>
                                <span style={{ fontSize: '0.9em', color: '#ccc' }} >{'By ' + song.Artist.username}</span>
                                <span style={{ fontSize: '0.9em', backgroundColor: 'rgba(0,0,0,0)', color: 'white', cursor: 'pointer' }} onClick={() => dispatch(actionConcatToQueue([song]))}>...add to queue</span>
                            </div>
                        </span>
                        <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Link style={{ color: 'white', fontSize: '1em' }} to={`/users/${song.Artist.id}/tracks`}><i className='fa-solid fa-arrow-left' /> Back to artist's songs</Link>
                        </span>
                    </div>
                    {song.userId === user?.id && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', width: '140px', margin: 20 }}>
                        <button onClick={() => history.push(`/songs/${song.id}/edit`)} style={{ backgroundColor: '#f50', border: '#f50 solid 1px', color: 'white', width: '5rem', cursor: 'pointer' }}>Edit</button>
                        <DeleteConfirmationModal id={song.id} title={song.title} userId={user.id} />
                    </div>}
                    <img
                        src={song.previewImage || default_album_image}
                        alt={song.title}
                        id='song-image'
                        onError={(e) => { e.target.src = default_album_image }}
                    />
                </div>
                <CommentsSection song={song} />
            </>
        )
    )
}

function DeleteConfirmationModal({ id, title, userId }) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDeleteClick = async () => {
        const res = await dispatch(thunkDeleteSong(id));
        setShowModal(false)
        history.push(`/users/${userId}/tracks`)
    }

    return (
        <>
            <button className="song-item-user-button" onClick={() => setShowModal(true)} style={{ backgroundColor: 'rgba(0,0,0,0)', border: '1px solid white', cursor: "pointer" }}>Delete</button>
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
