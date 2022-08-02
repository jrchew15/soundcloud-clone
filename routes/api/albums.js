const router = require('express').Router();
const { User, Album, Song } = require('../../db/models');
const { albumFormatter, songFormatter } = require('../../utils/sanitizers.js');
const { requireAuth } = require('../../utils/auth.js');
const { checkAlbumExists } = require('../../utils/db-checks.js')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js')

router.get('/current', requireAuth, async (req, res, next) => {
    let Albums = await Album.findAll({
        where: { userId: req.user.id }
    });
    Albums = Albums.map(albumFormatter);

    res.json({ Albums });
});

router.post('/:albumId/songs',
    requireAuth,
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Song title is required'),
    check('url')
        .exists({ checkFalsy: true })
        .withMessage('Audio is required'),
    handleValidationErrors,
    async (req, res, _next) => {
        const { title, description, url, imageUrl } = req.body;
        const userId = req.user.id;
        albumId = req.params.albumId;
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
            albumId,
            userId
        })
        res.status(201).json(songFormatter(newSong));
    }
)

router.get('/:albumId', async (req, res, next) => {
    const album = await Album.findByPk(req.params.albumId, {
        include: [
            { model: User, attributes: ['id', 'username', ['imageUrl', 'previewImage']] },
            { model: Song }
        ]
    });
    if (!album) {
        const err = new Error("Album couldn't be found");
        err.status = 404;
        return next(err);
    }

    res.json(albumFormatter(album));
});

router.put('/:albumId',
    requireAuth,
    check('title').exists({ checkFalsy: true }).withMessage('Album title is required'),
    async (req, res, next) => {
        const album = await checkAlbumExists(req.params.albumId, req.user);

        album.title = req.body.title;
        album.description = req.body.description || album.description;
        album.imageUrl = req.body.imageUrl || album.imageUrl;
        await album.save();

        res.json(albumFormatter(album));
    }
);

router.delete('/:albumId',
    requireAuth,
    async (req, res, next) => {
        const album = await checkAlbumExists(req.params.albumId, req.user);

        await album.destroy();
        res.json({ message: 'Successfully deleted', statusCode: 200 })
    }
)

router.get('/', async (_req, res, _next) => {
    let Albums = await Album.findAll();
    Albums = Albums.map(albumFormatter);

    res.json({ Albums });
});

router.post('/',
    requireAuth,
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Album title is required'),
    async (req, res, next) => {
        let albumInfo = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            userId: req.user.id
        };
        const album = await Album.create(albumInfo);
        res.status(201).json(albumFormatter(album));
    }
)

module.exports = router;
