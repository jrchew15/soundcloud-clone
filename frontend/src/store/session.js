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
    const loginData = await response.json();
    delete loginData.token;

    const getUserRes = await csrfFetch(`/api/users/${loginData.id}`);
    const loggedInUser = await getUserRes.json();
    dispatch(setUser({
        ...loginData,
        previewImage: loggedInUser.previewImage,
    }));
    return response;
};

export const thunkRestoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const user = await response.json();
    if (!user) { return }
    const getUserRes = await csrfFetch(`/api/users/${user.id}`);
    const loggedInUser = await getUserRes.json();
    dispatch(setUser({
        ...user,
        previewImage: loggedInUser.previewImage,
    }));
}

export const thunkSignupUser = (userInfo) => async dispatch => {
    // const { firstName,
    //     lastName,
    //     username,
    //     email,
    //     password,
    //     image } = userInfo;

    const formData = new FormData();

    for (let field in userInfo) {
        formData.append(field, userInfo[field])
    }

    const response = await csrfFetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData
    });
    const data = await response.json();
    delete data.password;
    // dispatch(setUser({ ...data, previewImage: imageUrl }));
    if (data.imageUrl) {
        data.previewImage = data.imageUrl
        delete data.imageUrl
    }

    dispatch(setUser({ ...data }));
    return response;
}

export const thunkLogoutUser = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(actionLogoutUser());
    const { message } = await response.json();
    return message;
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
