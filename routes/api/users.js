const router = require('express').Router();

const { validateSignup } = require('../../utils/validation');
const { setTokenCookie } = require('../../utils/auth');
const { songFormatter, albumFormatter, playlistFormatter } = require('../../utils/sanitizers');
const { couldntFind } = require('../../utils/db-checks')

const { User, Album, Song, Playlist } = require('../../db/models')


// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, password, username, firstName, lastName } = req.body;
        const user = await User.signup({ email, username, password, firstName, lastName });

        const token = await setTokenCookie(res, user);

        return res.json({
            id: user.id,
            firstName,
            lastName,
            username,
            email,
            token
        });
    }
);

router.get('/:userId/songs',
    async (req, res, next) => {
        let user = await User.findByPk(req.params.userId, {
            include: [Song]
        });
        if (!user) { couldntFind('Artist') }
        const Songs = user.Songs.map(songFormatter);
        res.json({ Songs })
    }
);

router.get('/:userId/albums',
    async (req, res, next) => {
        let user = await User.findByPk(req.params.userId, {
            include: [Album]
        });
        if (!user) { couldntFind('Artist') }

        const Albums = user.Albums.map(albumFormatter);
        res.json({ Albums });
    }
);

router.get('/:userId/playlists',
    async (req, res, next) => {
        let user = await User.findByPk(req.params.userId, {
            include: [Playlist]
        });
        if (!user) { couldntFind('User') }

        const Playlists = user.Playlists.map(playlistFormatter);
        res.json({ Playlists });
    }
)

router.get('/:userId', async (req, res, next) => {
    const artist = await User.findByPk(req.params.userId, {
        include: [
            {
                model: Album,
                attributes: ['id']
            },
            {
                model: Song,
                attributes: ['id']
            },
        ],
        attributes: [
            'id',
            'username',
            'imageUrl'
        ]
    });
    if (!artist) {
        couldntFind('Artist')
    }

    const result = {};
    result.id = artist.id;
    result.username = artist.username;
    result.totalSongs = artist.Songs.length;
    result.totalAlbums = artist.Albums.length;
    result.previewImage = artist.imageUrl;

    res.json(result);
})

module.exports = router;
