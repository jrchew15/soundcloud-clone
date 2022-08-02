const router = require('express').Router();

const { check } = require('express-validator');
const { User, Album, Song } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { handleValidationErrors } = require('../../utils/validation.js');

// TODO: make a song response sanitizer

router.get('/current',
    requireAuth,
    async (req, res, next) => {
        let Songs = await Song.findAll({
            where: {
                userId: req.user.dataValues.id
            }
        });

        Songs = Songs.map(ele => ele.toJSON());

        res.json(Songs)
    });

router.get('/:songId',
    async (req, res, next) => {
        let song = await Song.findOne({
            where: { id: req.params.songId },
            include: [
                { model: User, attributes: ['id', 'username'] },
                { model: Album, attributes: ['id', 'title', 'imageUrl'] }
            ]
        });

        if (!song) {
            const err = new Error("Song couldn't be found");
            err.status = 404;
            err.stack = undefined;
            return next(err);
        }

        res.json(song);
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
        const song = await Song.findByPk(req.params.songId);
        if (!song) {
            const err = new Error("Song couldn't be found");
            err.status = 404;
            err.stack = undefined;
            return next(err);
        }
        if (song.userId !== req.user.dataValues.id) {
            const err = new Error('Forbidden');
            err.status = 403;
            err.stack = undefined;
            return next(err);
        }

        for (let key of ['title', 'description', 'url', 'imageUrl', 'albumId']) {
            if (req.body[key]) {
                song[key] = req.body[key]
            }
        }
        await song.save();
        return res.json(song);
    }
);

router.get('/', async (_req, res, _next) => {
    const Songs = await Song.findAll();

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
        }
        console.log('user:', req.user)
        const newSong = await Song.create({
            title,
            description,
            url,
            imageUrl,
            albumId: albumId ? albumId : null,
            userId
        })
        res.status(201).json({
            id: newSong.id,
            userId,
            albumId,
            title,
            description,
            url,
            createdAt: newSong.createdAt,
            updatedAt: newSong.updatedAt,
            previewImage: imageUrl
        })
    });

module.exports = router;
