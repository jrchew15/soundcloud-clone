const router = require('express').Router();

const { check } = require('express-validator');
const { User, Album, Song, Comment } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { checkSongExists, checkAlbumExists, couldntFind } = require('../../utils/db-checks.js')
const { handleValidationErrors } = require('../../utils/validation.js');
const { songFormatter } = require('../../utils/sanitizers.js');

router.get('/:songId/comments',
    async (req, res, next) => {
        const song = await Song.findByPk(req.params.songId, {
            include: {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['id', 'username']
                }
            }
        });
        if (!song) { couldntFind('Song') }
        res.json({ Comments: song.Comments })
    }
)


router.get('/current',
    requireAuth,
    async (req, res, next) => {
        let Songs = await Song.findAll({
            where: {
                userId: req.user.dataValues.id
            }
        });

        Songs = Songs.map(songFormatter);

        res.json({ Songs })
    });

router.get('/:songId',
    async (req, res, next) => {
        let song = await Song.findOne({
            where: { id: req.params.songId },
            include: [
                { model: User, attributes: ['id', 'username', ['imageUrl', 'previewImage']] },
                { model: Album, attributes: ['id', 'title', ['imageUrl', 'previewImage']] }
            ]
        });

        if (!song) { couldntFind(song) }

        res.json(songFormatter(song));
    }
);

router.put('/:songId',
    requireAuth,
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Song title is required'),
    check('url')
        .exists({ checkFalsy: true })
        .withMessage('Audio is required'),
    handleValidationErrors,
    async (req, res, next) => {
        const song = await checkSongExists(req.params.songId, req.user);

        for (let key of ['title', 'description', 'url', 'imageUrl', 'albumId']) {
            if (req.body[key]) {
                song[key] = req.body[key]
            }
        }
        await song.save();
        return res.json(songFormatter(song));
    }
);

router.delete('/:songId',
    requireAuth,
    async (req, res, next) => {
        const song = await checkSongExists(req.params.songId, req.user);

        await song.destroy();
        return res.json({ message: 'Successfully deleted', statusCode: 200 })
    })

router.get('/', async (_req, res, _next) => {
    const allSongs = await Song.findAll();
    const Songs = allSongs.map(songFormatter)
    return res.json({ Songs });
});

router.post('/',
    requireAuth,
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Song title is required'),
    check('url')
        .exists({ checkFalsy: true })
        .withMessage('Audio is required'),
    handleValidationErrors,
    async (req, res, _next) => {
        const { title, description, url, imageUrl, albumId } = req.body;
        const userId = req.user.dataValues.id;
        if (albumId) {
            // Check if album exists. otherwise throw 404

            // Check if album belongs to user. otherwise throw authError
            const album = await checkAlbumExists(albumId, req.user);
        }

        const newSong = await Song.create({
            title,
            description,
            url,
            imageUrl,
            albumId: albumId ? albumId : null,
            userId
        })
        res.status(201).json(songFormatter(newSong));
    }
);


module.exports = router;
