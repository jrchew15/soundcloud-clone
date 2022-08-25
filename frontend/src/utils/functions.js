export function parsedDate(date) {
    let jsDate = new Date(date);
    return jsDate.toDateString().slice(3);
}
