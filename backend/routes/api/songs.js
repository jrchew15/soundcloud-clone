const router = require('express').Router();

const { check } = require('express-validator');
const { User, Album, Song, Comment } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { checkSongExists, checkAlbumExists, couldntFind } = require('../../utils/db-checks.js')
const { handleValidationErrors, paginationValidators, dateValidator } = require('../../utils/validation.js');
const { songFormatter } = require('../../utils/sanitizers.js');
const { singleMulterUpload, fieldsMulterUpload, multiplePublicFileUpload } = require('../../awsS3');

// Get the comments of a song
router.get('/:songId/comments',
    async (req, res, next) => {
        const song = await Song.findByPk(req.params.songId, {
            include: {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['id', 'username', 'imageUrl']
                }
            }
        });
        if (!song) { couldntFind('Song') }
        res.json({ Comments: song.Comments })
    }
);

// Create a comment on a song, by current user
router.post('/:songId/comments',
    requireAuth,
    check('body')
        .exists({ checkFalsy: true })
        .withMessage('Comment body text is required'),
    handleValidationErrors,
    async (req, res, next) => {
        const song = await checkSongExists(req.params.songId);
        let comment = await song.createComment({ userId: req.user.id, body: req.body.body });
        comment = comment.toJSON();
        const { id, userId, body, songId, createdAt, updatedAt } = comment;
        res.json({ id, userId, body, songId, createdAt, updatedAt });
    }
)

// Get all songs by current user
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

// Get the details of a song including artist and album
router.get('/:songId',
    async (req, res, next) => {
        let song = await Song.findOne({
            where: { id: req.params.songId },
            include: [
                { model: User, attributes: ['id', 'username', ['imageUrl', 'previewImage']] },
                { model: Album, attributes: ['id', 'title', ['imageUrl', 'previewImage']] }
            ]
        });

        if (!song) { couldntFind('Song') }

        res.json(songFormatter(song));
    }
);

// Edit a song
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

// Delete a song
router.delete('/:songId',
    requireAuth,
    async (req, res, next) => {
        const song = await checkSongExists(req.params.songId, req.user);

        await song.destroy();
        return res.json({ message: 'Successfully deleted', statusCode: 200 })
    }
);

// Get all songs with pagination defaults.
// If pagination is needed elsewhere, can clean by moving some of this to utils
router.get('/',
    paginationValidators,
    dateValidator,
    handleValidationErrors,
    async (req, res, _next) => {

        let { page, size, title, createdAt } = req.query;
        page = parseInt(page) || 1;
        size = parseInt(size) || 20;

        let where = null;
        if (title || createdAt) {
            where = {};
            if (title) { where.title = title }
            if (createdAt) { where.createdAt = createdAt }
        }

        const options = {
            limit: size,
            offset: size * (page - 1),
            where
        };

        let allSongs = await Song.findAll(options);

        // fix offset if title/createdAt specified and
        // not enough songs found
        if ((title || createdAt) && !allSongs.length && options.offset) {
            options.offset = 0;
            allSongs = await Song.findAll(options)
        }

        const Songs = allSongs.map(songFormatter)
        return res.json({ Songs });
    }
);

// Create a new song, album optional
router.post('/',
    requireAuth,
    fieldsMulterUpload(['image', 'song']),
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

        if (req.files) {
            [ imageUrl, url] = multiplePublicFileUpload(req.files)
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
