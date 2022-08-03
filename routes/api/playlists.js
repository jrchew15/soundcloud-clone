const router = require('express').Router();
const { Playlist, Song, PlaylistSong } = require('../../db/models');

router.get('/', async (req, res, next) => {
    const Playlists = await Playlist.findAll({
        include: [{
            model: Song,
            attributes: ['title'],
            through: {
                model: PlaylistSong,
                attributes: []
            }
        }]
    });

    res.json({ Playlists });
})

module.exports = router;
