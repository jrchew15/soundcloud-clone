const { User, Album, Song } = require('../db/models');


function songFormatter(song) {
    if (!(song instanceof Song)) { throw new Error('Expected a song') }
    song = song.toJSON();
    const result = {};
    for (let key of ['id', 'userId', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt']) {
        result[key] = song[key];
    }
    result.previewImage = song.imageUrl;
    result.Artist = song.User;
    result.Album = song.Album;

    return result;
}

module.exports = { songFormatter }
