import { csrfFetch } from "./csrf";

const SET_USER = '/session/login';
const LOG_OUT_USER = '/session/logout';

const setUser = (payload) => {
    return {
        type: SET_USER,
        payload
    }
}

export const thunkLoginUser = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();

    delete data.token
    dispatch(setUser(data));
    return response;
};

export const thunkRestoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const user = await response.json();
    console.log(user)
    dispatch(setUser(user));
}

export const actionLogoutUser = () => ({ type: LOG_OUT_USER });

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case LOG_OUT_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
