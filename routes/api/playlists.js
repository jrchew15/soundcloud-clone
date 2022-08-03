const router = require('express').Router();
const { Playlist, Song, PlaylistSong } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { check, body } = require('express-validator');
const { handleValidationErrors, forbiddenError } = require('../../utils/validation.js')
const { playlistFormatter } = require('../../utils/sanitizers.js')
const { couldntFind } = require('../../utils/db-checks.js');

router.get('/current',
    requireAuth,
    async (req, res, next) => {
        let currentPlaylists = await Playlist.findAll({
            where: { userId: req.user.id }
        });

        res.json({ Playlists: currentPlaylists.map(playlistFormatter) });
    }
)

router.post('/:playlistId/songs',
    requireAuth,
    body('songId').exists({ checkFalsy: true }).withMessage('Song ID required'),
    async (req, res, next) => {
        const playlist = await Playlist.findByPk(req.params.playlistId);
        if (!playlist) { couldntFind('Playlist') }
        if (req.user.id !== playlist.userId) throw forbiddenError
        const song = await Song.findByPk(req.body.songId);
        if (!song) { couldntFind('Song') }

        await playlist.addSong(song);
        res.json({
            id: req.user.id,
            playlistId: playlist.id,
            songId: song.id
        });
    }
);

router.get('/:playlistId',
    async (req, res, next) => {
        const playlist = await Playlist.findByPk(req.params.playlistId, {
            include: {
                model: Song,
                through: {
                    model: PlaylistSong,
                    attributes: []
                }
            }
        })

        if (!playlist) { couldntFind('Playlist') }

        res.json(playlistFormatter(playlist));
    }
);

router.put('/:playlistId',
    requireAuth,
    check('name').exists({ checkFalsy: true }).withMessage('Playlist name is required'),
    handleValidationErrors,
    async (req, res, next) => {
        const playlist = await Playlist.findByPk(req.params.playlistId);
        if (!playlist) { couldntFind('Playlist') }
        if (req.user.id !== playlist.userId) throw forbiddenError

        playlist.name = req.body.name;
        playlist.imageUrl = req.body.imageUrl || playlist.imageUrl;

        await playlist.save();

        res.json(playlistFormatter(playlist));
    }
);

router.delete('/:playlistId',
    requireAuth,
    async (req, res, next) => {
        const playlist = await Playlist.findByPk(req.params.playlistId);
        if (!playlist) { couldntFind('Playlist') }
        if (req.user.id !== playlist.userId) throw forbiddenError

        await playlist.destroy();
        res.json({ message: 'Successfully deleted', statusCode: 200 })
    }
);

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
