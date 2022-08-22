import { csrfFetch } from "./csrf";

const GET_SONGS = 'songs/get';
const ADD_SONG = 'songs/add';

const actionGetSongs = (songs) => {
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

export const thunkGetSongs = (userId) => async dispatch => {
    const res = await csrfFetch(`api/users/${userId}/songs`);
    const { Songs } = await res.json();
    const songsObj = {};
    Songs.forEach(song => songsObj[song.id] = song)
    dispatch(actionGetSongs(songsObj));
    return songsObj;
}

export const thunkAddSong = (payload) => async dispatch => {
    const res = await csrfFetch('/api/songs', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    const body = await res.json();
    dispatch(actionAddSong({ ...payload, id: body.id }));
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
        default:
            return state
    }
}
