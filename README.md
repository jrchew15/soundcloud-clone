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

## Running NoiseFog Locally

1. Clone the [repository](https://github.com/jrchew15/soundcloud-clone)

2. At the root folder (which contains the backend and frontend folders) run ```npm install``` and ```npm install -D``` to download the required packages for both.

3. Create a ```.env``` file in the backend folder modeled after the included ```.env.example```. If you wish to change the suggested port in the ```.env```, you must also change the proxy key in the frontend ```package.json```.

4. Run the following seeding commands from the backend folder:

```
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```
5. To start the application, start two servers by running ```npm start``` from the backend folder and then from the frontend folder. Your default browser will launch the application.

## Current Features

### Songs
* Create - upload a song (by giving a valid url)
* Read - the details of a song are visible on its own details page, and you can see all songs you have uploaded on your user page.
* Update - can modify the info of any songs you uploaded
* Delete - can remove any songs you upload from the database

### Comments
* Create - any user can comment on a song
* Read - all comments on a song are visible on the song's detail page
* Update - can edit your comments
* Delete - can remove your comments

### Song Queue
* Any music in your queue continually plays until paused
* You can add songs or albums to your queue while exploring the application
* You can interrupt your queue to immediately play songs or albums, after which your queue will continue with songs that were already coming up


## Future Features

* User Settings and delete profile
* Create Albums and assign songs to them
* Create and listen to Playlists of songs
* Waveforms representing songs
