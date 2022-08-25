import { csrfFetch } from "./csrf";

const LOAD_PLAYLISTS = 'playlists/load';

const actionLoadPlaylists = (playlists) => {
    return {
        type: LOAD_PLAYLISTS,
        playlists
    }
}

export const thunkLoadPlaylists = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/playlists`);
    const { Playlists } = await res.json();

    let playlists = {};
    Playlists.forEach(item => playlists[item.id] = item);

    dispatch(actionLoadPlaylists(playlists))
    return playlists;
}

const initialState = {};

export default function playlistsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_PLAYLISTS:
            newState = { ...state, ...action.playlists };
            return newState;
        default:
            return state;
    }
}
