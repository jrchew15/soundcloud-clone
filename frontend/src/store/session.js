import { csrfFetch } from "./csrf";

const LOG_IN_USER = '/session/login';
const LOG_OUT_USER = '/session/logout';

const actionLoginUser = (payload) => {
    return {
        type: LOG_IN_USER,
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
    dispatch(actionLoginUser(data));
    return response;
};

export const actionLogoutUser = () => ({ type: LOG_OUT_USER });

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOG_IN_USER:
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
