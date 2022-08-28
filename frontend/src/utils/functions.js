export function parsedDate(date) {
    let jsDate = new Date(date);
    return jsDate.toDateString().slice(3);
}

export function checkImage(url) {
    let urlArr = url.split('.');
    let validFormats = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg'];
    console.log('passed image', urlArr)
    return urlArr.length > 1 && validFormats.includes(urlArr[urlArr.length - 1]);
}

export function checkEmail(email) {
    let emailArr = email.split('@');

    return emailArr.length > 1 && emailArr[emailArr.length - 1].includes('.');
}
