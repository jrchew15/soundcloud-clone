const { User, Album, Song } = require('../db/models');

async function checkSongExists(songId, user = false) {
    const song = await Song.findByPk(songId);
    if (!song) {
        const err = new Error("Song couldn't be found");
        err.status = 404;
        throw err
    }
    if (user && song.userId !== user.id) {
        const err = new Error('Forbidden');
        err.status = 403;
        throw err
    }
    return song;
}

async function checkAlbumExists(albumId, user = false) {
    const album = await Album.findByPk(albumId);

    if (!album) {
        const err = new Error("Album couldn't be found");
        err.status = 404;
        throw err
    }
    if (user && album.userId !== user.id) {
        const err = new Error('Forbidden');
        err.status = 403;
        throw err
    }
    return album;
}

async function checkUserExists(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
        const err = new Error("User couldn't be found");
        err.status = 404;
        throw err
    }
}

function couldntFind(str) {
    const err = new Error(`${str} couldn't be found`);
    err.status = 404;
    throw err
}

module.exports = { checkAlbumExists, checkSongExists, checkUserExists, couldntFind };
