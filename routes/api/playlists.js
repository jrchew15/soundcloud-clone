const router = require('express').Router();
const { Playlist, Song, PlaylistSong } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js')
const { playlistFormatter } = require('../../utils/sanitizers.js')

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
});

router.post('/',
    requireAuth,
    check('name').exists({ checkFalsy: true }).withMessage('Playlist name is required'),
    handleValidationErrors,
    async (req, res, next) => {
        const newPlaylist = await req.user.createPlaylist({
            name: req.body.name,
            imageUrl: req.body.imageUrl
        });

        res.status(201).json(playlistFormatter(newPlaylist));
    }
);

module.exports = router;
