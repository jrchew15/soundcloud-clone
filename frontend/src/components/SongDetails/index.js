import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { actionPushToQueue } from "../../store/queue";
import { useDispatch } from "react-redux";
import CommentsSection from "../Comments/CommentsSection";
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
    }, [])

    const addToQueue = () => {
        dispatch(actionPushToQueue(song))
    }

    return (song &&
        (
            <>
                <div id='song-detail-header' >
                    <div id='song-content-container'>
                        <span id='song-header-upper-left'>
                            <i className="fa-solid fa-play" />
                            <div>
                                <span style={{ fontSize: '1.2em', color: 'white' }} >{song.title}</span>
                                <span style={{ fontSize: '0.9em', color: '#ccc' }} >{'By ' + song.Artist.username}</span>
                            </div>
                        </span>
                        <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Link style={{ color: 'white', fontSize: '1em' }} to={`/users/${song.Artist.id}/tracks`}><i className='fa-solid fa-arrow-left' /> Back to artist's songs</Link>
                        </span>
                    </div>
                    <img
                        src={song.previewImage || 'https://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png'}
                        alt={song.title}
                        id='song-image'
                        onError={(e) => { e.target.src = 'https://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png' }}
                    />
                </div>
                <CommentsSection song={song} />
            </>
        )
    )
}
