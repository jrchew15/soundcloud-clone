import { csrfFetch } from "./csrf";

const LOAD_ALBUM_CAROUSEL = 'albumCarousel/load';

const actionLoadAlbumCarousel = (albums) => {
    return {
        type: LOAD_ALBUM_CAROUSEL,
        albums
    }
}

export const thunkLoadAlbumCarousel = () => async dispatch => {
    const res = await fetch('/api/albums');
    const { Albums } = await res.json();
    const albums = Albums.map(album => ({
        id: album.id,
        userId: album.userId,
        title: album.title,
        imageUrl: album.previewImage,
        description: album.description
    }));
    dispatch(actionLoadAlbumCarousel(albums))
    return res;
}

export default function albumCarouselReducer(state = [], action) {
    switch (action.type) {
        case LOAD_ALBUM_CAROUSEL:
            return [...action.albums]
        default:
            return state;
    }
}
