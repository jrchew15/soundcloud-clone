import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { actionConcatToQueue, playThis } from "../../store/queue";
import { useDispatch } from "react-redux";
import CommentsSection from "../Comments/CommentsSection";
import { default_album_image } from "../../utils/default_images";
import "./SongDetails.css";

export default function SongDetails() {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const [song, setSong] = useState(null);
    useEffect(() => {
        fetchSong();
        async function fetchSong() {
            let res = await csrfFetch(`/api/songs/${songId}`);

            const fetchedSong = await res.json();

            setSong(fetchedSong);
        }
    }, [songId])

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
