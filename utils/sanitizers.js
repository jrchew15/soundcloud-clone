const { User, Album, Song } = require('../db/models');

function songFormatter(song) {
    if (song instanceof Song) {
        song = song.toJSON();
    }

    const result = {};
    for (let key of ['id', 'userId', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt']) {
        result[key] = song[key];
    }
    result.previewImage = song.imageUrl;
    result.Artist = song.User;
    result.Album = song.Album;

    return result;
}

function albumFormatter(album) {
    if (album instanceof Album) {
        album = album.toJSON();
    }

    const result = {};
    for (let key of ['id', 'userId', 'title', 'description', 'createdAt', 'updatedAt']) {
        result[key] = album[key];
    }
    result.previewImage = album.imageUrl;
    result.Artist = album.User;
    console.log(album.Songs[0])
    result.Songs = album.Songs ? album.Songs.map(songFormatter) : undefined;

    return result;
}

module.exports = { songFormatter, albumFormatter }
