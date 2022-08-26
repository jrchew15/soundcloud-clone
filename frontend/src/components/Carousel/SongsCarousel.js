import { useEffect, useState, useRef } from "react";
import { csrfFetch } from "../../store/csrf";
import { useHistory } from "react-router-dom";
import { default_album_image } from "../../utils/default_images";
import './Carousel.css';

export default function SongsCarousel({ artistId, username }) {
    const history = useHistory();
    const [songs, setSongs] = useState([]);

    const carouselRef = useRef(null);

    const redirectTo = (e, path) => {
        e.stopPropagation();
        history.push(path)
    }

    useEffect(() => {
        const loadSongs = async () => {
            const res = await csrfFetch(artistId ? `/api/users/${artistId}/songs` : 'api/songs');
            const { Songs } = await res.json();
            setSongs(Songs);
        }
        loadSongs();
    }, [])

    function scrollLeftEvent(e) {
        carouselRef.current.scroll(carouselRef.current.scrollLeft - 346, 0)
    }

    function scrollRightEvent(e) {
        carouselRef.current.scroll(carouselRef.current.scrollLeft + 346, 0)
    }

    return songs.length > 0 && (
        <div>
            <h3>Tracks by {username}</h3>
            <div id='song-carousel-container' className="carousel-container">
                <div className='scroll scroll-left' onClick={scrollLeftEvent}><i className='fas fa-chevron-left' /></div>
                <div className='scroll scroll-right' onClick={scrollRightEvent}><i className='fas fa-chevron-right' /></div>
                <ul id='song-carousel' className='carousel' ref={carouselRef}>
                    {songs.map(song => (
                        <li key={song.id}>
                            <img src={song.previewImage || default_album_image} alt='song img' onClick={(e) => redirectTo(e, `/songs/${song.id}`)} onError={(e) => { e.target.src = default_album_image }} />
                            <div className='carousel-item-title' onClick={(e) => redirectTo(e, `/songs/${song.id}`)}>{song.title}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>)
}
