const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const albumsRouter = require('./albums.js');
const songsRouter = require('./songs.js');
const commentsRouter = require('./comments.js');
const playlistsRouter = require('./playlists.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/artists', usersRouter);

router.use('/albums', albumsRouter);

router.use('/songs', songsRouter);

router.use('/comments', commentsRouter);

router.use('/playlists', playlistsRouter);

module.exports = router;
