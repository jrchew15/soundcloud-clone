const router = require('express').Router();

const { check } = require('express-validator');
const { User, Song } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');

router.get('/', (_req, res, _next) => {
    const Songs = Song.findAll();

    return res.json({ Songs });
});



module.exports = router;
