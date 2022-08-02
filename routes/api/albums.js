const router = require('express').Router();
const { User, Album, Song } = require('../../db/models');
const { albumFormatter } = require('../../utils/sanitizers.js');
const { requireAuth } = require('../../utils/auth.js');

router.get('/current', requireAuth, async (req, res, next) => {
    let Albums = await Album.findAll({
        where: { userId: req.user.id }
    });
    Albums = Albums.map(albumFormatter);

    res.json({ Albums });
})

router.get('/', async (_req, res, _next) => {
    let Albums = await Album.findAll();
    Albums = Albums.map(albumFormatter);

    res.json({ Albums });
});

module.exports = router;
