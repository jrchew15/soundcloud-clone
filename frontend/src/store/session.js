import { csrfFetch } from "./csrf";

const SET_USER = '/session/login';
const LOG_OUT_USER = '/session/logout';

const setUser = (payload) => {
    return {
        type: SET_USER,
        payload
    }
}

const actionLogoutUser = () => ({ type: LOG_OUT_USER });

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
    dispatch(setUser(user));
}

export const thunkSignupUser = (userInfo) => async dispatch => {
    const { firstName,
        lastName,
        username,
        email,
        password } = userInfo;

    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password
        })
    });
    const data = await response.json();
    delete data.password;
    dispatch(setUser(data));
    return response;
}

export const thunkLogoutUser = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    })
    dispatch(actionLogoutUser());
}

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
