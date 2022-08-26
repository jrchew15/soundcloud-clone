import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import { default_album_image } from "../../utils/default_images";
import './Carousel.css';

export default function AlbumCarousel() {
    const history = useHistory();
    const [albums, setAlbums] = useState([]);

    const albumCarouselRef = useRef(null);

    const redirectTo = (e, path) => {
        e.stopPropagation();
        history.push(path)
    }

    useEffect(() => {
        const loadAlbums = async () => {
            const res = await csrfFetch('/api/albums');
            const { Albums } = await res.json();
            setAlbums(Albums);
        }
        loadAlbums();
    }, [])

    function scrollLeftEvent(e) {
        albumCarouselRef.current.scroll(albumCarouselRef.current.scrollLeft - 346, 0)
    }

    function scrollRightEvent(e) {
        albumCarouselRef.current.scroll(albumCarouselRef.current.scrollLeft + 346, 0)
    }

    return albums.length > 0 && (<div id='album-carousel-container' className="carousel-container">
        <div>
            <h3>All Albums</h3>
            <div className='scroll scroll-left' onClick={scrollLeftEvent}><i className='fas fa-chevron-left' /></div>
            <div className='scroll scroll-right' onClick={scrollRightEvent}><i className='fas fa-chevron-right' /></div>
            <ul id='album-carousel' className='carousel' ref={albumCarouselRef}>
                {albums.map(album => (
                    <li key={album.id}>
                        <img src={album.previewImage || default_album_image} alt='album img' onError={(e) => { e.target.src = default_album_image }} onClick={(e) => redirectTo(e, `/users/${album.userId}`)} />
                        <div className="carousel-item-title" onClick={(e) => redirectTo(e, `/users/${album.userId}`)}>{album.title}</div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
}
