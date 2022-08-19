import { csrfFetch } from "./csrf";

const LOG_IN_USER = '/session/login';
const LOG_OUT_USER = '/session/logout';

const actionLoginUser = (payload) => {
    return {
        type: LOG_IN_USER,
        payload
    }
}

const actionLogoutUser = () => ({ type: LOG_OUT_USER });

export const thunkLoginUser = (credential, password) => async (dispatch) => {
    const loginRes = await csrfFetch('/api/session', { method: 'POST', body: JSON.stringify({ credential, password }) });

    if (!loginRes.ok) throw loginRes

    const user = await loginRes.json();
    delete user.token;
    return dispatch(actionLoginUser(user));
}

export const thunkLogoutUser = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', { method: 'DELETE' });
    if (!res.ok) throw res
    return dispatch(actionLogoutUser());
}

export default function sessionReducer(state = { user: null }, action) {
    switch (action.type) {
        case LOG_IN_USER:
            return { ...state, user: { ...action.payload } }
        case LOG_OUT_USER:
            return { ...state, user: null }
        default:
            return state
    }
}
