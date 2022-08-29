# NoiseFog:

NoiseFog is a simple application mimicing some aspects of Soundcloud.com.
A backend API stores basic information for songs and users, allowing for fast navigation through a cleanly minimal application for presenting and playing music.

* You can find the application [here](https://jrchew-soundcloud-clone.herokuapp.com).

* All API routes begin with https://jrchew-soundcloud-clone.herokuapp.com/api
-- Full API documentation is available [here](https://github.com/jrchew15/soundcloud-clone/wiki/API-Routes).

The application was built primarily with JavaScript and PostgreSQL, with heavy use of the following libraries:
* [Sequelize](https://sequelize.org)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org)
* [Redux](https://redux.js.org)

## The Splash Pages

The primary splash page at the [home route](https://jrchew-soundcloud-clone.herokuapp.com) is only accessible when the user is not logged in. This page provides a quick overview of the functionality of the song queue and has links the project's github repository.

![home-splash-page](https://raw.githubusercontent.com/jrchew15/soundcloud-clone/main/backend/assets/home-splash.png)

The [second splash page](https://jrchew-soundcloud-clone.herokuapp.com/discover) provides links to music seeded by the developer.

![discover-splash-page](https://raw.githubusercontent.com/jrchew15/soundcloud-clone/main/backend/assets/discover-splash.png)

