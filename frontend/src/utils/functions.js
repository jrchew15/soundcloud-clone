import { thunkLoginUser } from "../store/session";

export function parsedDate(date) {
    let jsDate = new Date(date);
    return jsDate.toDateString().slice(3);
}

export function checkImage(url) {
    let urlArr = url.split('.');
    let validFormats = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg'];
    return urlArr.length > 1 && validFormats.includes(urlArr[urlArr.length - 1]);
}

export function checkEmail(email) {
    let emailArr = email.split('@');

    return emailArr.length > 1 && emailArr[emailArr.length - 1].includes('.');
}

export function checkAudio(url) {
    let urlArr = url.split('.');
    let validFormats = ['m4a', 'flac', 'mp3', 'mp4', 'wav', 'wma', 'aac', 'ogg'];
    return urlArr.length > 1 && validFormats.includes(urlArr[urlArr.length - 1]);
}

export async function demoLogin(dispatch, history) {
    await dispatch(thunkLoginUser({ credential: 'The Lumineers', password: 'password' }))
    history.push('/discover')
}
