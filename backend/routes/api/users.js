const router = require('express').Router();

const { validateSignup, forbiddenError } = require('../../utils/validation');
const { requireAuth, setTokenCookie } = require('../../utils/auth');
const { songFormatter, albumFormatter, playlistFormatter } = require('../../utils/sanitizers');
const { couldntFind } = require('../../utils/db-checks')

const { User, Album, Song, Playlist } = require('../../db/models')


// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, password, username, firstName, lastName, imageUrl } = req.body;
        const user = await User.signup({ email, username, password, firstName, lastName, imageUrl });

        const token = await setTokenCookie(res, user);

        return res.json({
            id: user.id,
            firstName,
            lastName,
            username,
            email,
            imageUrl,
            token
        });
    }
);

// get all a users songs
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

// get all a users albums
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

// get all a users playlists
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

// get user details including total songs and albums
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
});

//
router.delete('/:userId',
    requireAuth,
    async (req, res, next) => {
        if (req.params.userId !== req.user.id) { throw forbiddenError }
        await req.user.destroy();

        res.json({ message: 'Successfully deleted', statusCode: 200 });
    }
);

module.exports = router;
