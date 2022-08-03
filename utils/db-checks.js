const { Album, Song } = require('../db/models');
const { forbiddenError } = require('./validation')

async function checkSongExists(songId, user = false) {
    const song = await Song.findByPk(songId);
    if (!song) { couldntFind('Song') }
    if (user && song.userId !== user.id) throw forbiddenError

    return song;
}

async function checkAlbumExists(albumId, user = false) {
    const album = await Album.findByPk(albumId);

    if (!album) { couldntFind('Album') }
    if (user && album.userId !== user.id) throw forbiddenError

    return album;
}

function couldntFind(str) {
    const err = new Error(`${str} couldn't be found`);
    err.status = 404;
    throw err
}

module.exports = { checkAlbumExists, checkSongExists, couldntFind };
