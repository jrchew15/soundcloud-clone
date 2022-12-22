import { csrfFetch } from "./csrf";

const GET_SONGS = 'songs/get';
const ADD_SONG = 'songs/add';
const DELETE_SONG = 'songs/delete';

export const actionGetSongs = (songs) => {
    return {
        type: GET_SONGS,
        songs
    }
}

const actionAddSong = (payload) => {
    return {
        type: ADD_SONG,
        payload
    }
};

const actionDeleteSong = (id) => {
    return {
        type: DELETE_SONG,
        id
    }
}

export const thunkGetSongs = () => async dispatch => {
    const res = await csrfFetch(`/api/songs/current`);
    const { Songs } = await res.json();
    const songsObj = {};
    Songs.forEach(song => songsObj[song.id] = song)
    dispatch(actionGetSongs(songsObj));
    return songsObj;
}

export const thunkAddSong = (payload) => async dispatch => {
    const formData = new FormData();

    for (let field in payload) {
        formData.append(field, payload[field])
    }

    const res = await csrfFetch('/api/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData
    })
    const body = await res.json();
    dispatch(actionAddSong({ ...body }));
    return body;
}

export const thunkEditSong = (payload) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${payload.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
    const body = await res.json()
    dispatch(actionAddSong({ ...body }));
    return res;
}

export const thunkDeleteSong = (id) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${id}`, {
        method: 'DELETE'
    });

    dispatch(actionDeleteSong(id));
    return res;
}

export default function songsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_SONGS:
            newState = { ...action.songs }
            return newState
        case ADD_SONG:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState
        case DELETE_SONG:
            newState = { ...state };
            delete newState[action.id];
            return newState
        default:
            return state
    }
}
