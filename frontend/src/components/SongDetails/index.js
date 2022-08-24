import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { actionPushToQueue } from "../../store/queue";
import { useDispatch } from "react-redux";
import CommentsSection from "../Comments/CommentsSection";

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
                <div style={{ display: 'flex', boxSizing: 'border-box', padding: '30px', background: 'linear-gradient(160deg,#f50,#333)', width: '100%', height: '300px' }}>
                    <img src={song.previewImage || 'https://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png'} alt={song.title} style={{ borderRadius: '50%', height: '100%' }} onError={(e) => { e.target.src = 'https://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px', justifyContent: 'space-between', width: '100%' }}>
                        <span style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'white', fontSize: '1.3em' }} >{song.title}</span>
                            <span style={{ color: 'white', fontSize: '1em' }} >By {song.Artist.username}</span>
                            <span style={{ color: 'white', fontSize: '1em' }} >on the album {song.Album?.title}</span>
                            <span style={{ color: 'white', fontSize: '0.8em' }} >{song.description}</span>
                        </span>
                        <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <span onClick={addToQueue} style={{ color: '#333', padding: '10px', cursor: 'pointer', background: '#fff', borderRadius: '8px' }}><i className='fa-solid fa-chevron-right' /> Add To Queue</span>
                            <Link style={{ color: 'white', fontSize: '1.3em' }} to={`/users/${song.Artist.id}/tracks`}><i className='fa-solid fa-arrow-left' /> Back to artist's songs</Link>
                        </span>
                    </div>
                </div>
                <CommentsSection song={song} />
            </>
        )
    )
}
