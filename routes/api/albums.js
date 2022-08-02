const router = require('express').Router();
const { User, Album, Song } = require('../../db/models');
const { albumFormatter, songFormatter } = require('../../utils/sanitizers.js');
const { requireAuth } = require('../../utils/auth.js');
const { checkAlbumExists } = require('../../utils/db-checks.js')

router.get('/current', requireAuth, async (req, res, next) => {
    let Albums = await Album.findAll({
        where: { userId: req.user.id }
    });
    Albums = Albums.map(albumFormatter);

    res.json({ Albums });
})

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
})

router.get('/', async (_req, res, _next) => {
    let Albums = await Album.findAll();
    Albums = Albums.map(albumFormatter);

    res.json({ Albums });
});

module.exports = router;
