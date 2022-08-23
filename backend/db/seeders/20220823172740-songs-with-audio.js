'use strict';
const { User, Song } = require('../models');
const bcrypt = require('bcryptjs');

const songsArr = [{ "title": "Leonell Cassio - Chapter Two (ft. Carrie)", "imageUrl": "https://cdn.pixabay.com/audio/2022/07/14/10-30-11-397_200x200.png", "description": "christmas, festival, tiktok, smooth, beats, sorrow, bright, epic, free to use, sorry, working environment, dramatic, cleaning, dreamy, electronic, medium fast, slow, new year, dark, chasing, medium, floating, coffee, fantasy, laid back, youtube, electro, sentimental, vlog music, hopeful, edm, melodic, vlog, staircase, restless, celebration, gotland, music for videos, background music, vocal, music for youtube videos, future bass, nature", "url": "https://cdn.pixabay.com/audio/2022/07/14/audio_b2e1adaa25.mp3" }, { "title": "Moment", "imageUrl": "pixicon2-music", "description": "beautiful plays, smooth, bright, main title, positive, meditative, glamorous, lonely, slow, suspense, film, floating, peaceful, acoustic group, laid back, modern jazz, sad, chill, jazz, sentimental, calm, hopeful, cinematic, romantic, ambient, elegant, small emotions, music for videos, background music, relaxing, film music", "url": "https://cdn.pixabay.com/audio/2022/01/11/audio_b21d9d6fa6.mp3" }, { "title": "That Background Ambient", "imageUrl": "https://cdn.pixabay.com/audio/2022/07/04/19-16-22-613_200x200.jpg", "description": "beautiful plays, podcast music, soft, smooth, inspiring, upbeat, bright, commercial, futuristic, background, dreamy, beautiful, motivational, electronic, contemporary, sound track, medium fast, slow, chasing, film, music, floating, presentation, audio, laid back, emotional, vlog music, technology, hopeful, uplifting, corporate, future, ambient, elegant, documentary, restless, warm, music for videos, experimental, background music, discovery, music for youtube videos, atmospheric, relaxing", "url": "https://cdn.pixabay.com/audio/2022/07/04/audio_fbbab67c57.mp3" }, { "title": "Bathroom - Chill Background Music", "imageUrl": "pixicon2-music", "description": "beautiful plays, podcast music, smooth, guitar, bright, relaxation, dreamy, slow, relax, music, floating, peaceful, laid back, lofi, chill, vlog music, hopeful, uplifting, ambient, elegant, solo guitar, small emotions, sleep, music for videos, background music, music for youtube videos, relaxing", "url": "https://cdn.pixabay.com/audio/2022/01/18/audio_d3a7b18ab3.mp3" }, { "title": "Leonell Cassio - The Sapphire City", "imageUrl": "pixicon2-music", "description": "smooth, beats, festival music, creative, epic, free to use, dreamy, melodic trap, electronic, trap, slow, dark, floating, dark music, laid back, mysterious, creative commons, sentimental, vlog music, hopeful, edm, melodic, heavy &amp; ponderous, dramatic music, sad music, cinematic music, music for videos, background music, music for youtube videos, future bass", "url": "https://cdn.pixabay.com/audio/2021/11/07/audio_35719208a2.mp3" }, { "title": "06:29", "imageUrl": "pixicon2-music", "description": "alternative hip hop, beats, smooth, easy, rnb, bright, dawn, dreamy, electronic, slow, floating, coffee, nature, peaceful, laid back, chill, vlog music, ambient, elegant, music for videos, early, background music, pulses, music for youtube videos, breakfast, morning, relaxing", "url": "https://cdn.pixabay.com/audio/2022/07/29/audio_c2fe0b3511.mp3" }, { "title": "Inspiring Science Technology", "imageUrl": "pixicon2-music", "description": "podcast music, smooth, beats, intelligent, ambience, bright, depth, downtempo, waves, positive, info, minimal, dreamy, electronic, deep, medium fast, slow, slideshows, chasing, medium, floating, presentation, peaceful, laid back, minimalistic, chill, gadget, vlog music, graphics, hopeful, chilled, uplifting, corporate, ambient, elegant, review technology, simple, wind, ad, music for videos, background music, music for youtube videos, atmospheric, relaxing", "url": "https://cdn.pixabay.com/audio/2021/12/15/audio_94ae7d7a62.mp3" }, { "title": "Moray meditative ambient soundscape for learning and relaxing", "imageUrl": "https://cdn.pixabay.com/audio/2022/03/25/12-44-30-64_200x200.jpg", "description": "beautiful plays, smooth, beats, bright, meditation, relaxation, scotland, water, dreamy, electronic, slow, floating, nature, peaceful, laid back, rain, meditation/spiritual, hopeful, asmr, landscape, read, ambient, elegant, moray, sleep, background music, relaxing", "url": "https://cdn.pixabay.com/audio/2022/03/25/audio_aa969c75ab.mp3" }, { "title": "Late Night Drive Intro Outro", "imageUrl": "pixicon2-music", "description": "intro/outro, smooth, beats, bright, dreamy, electronic, slow, theme, outro, medium, floating, lo-fi, laid back, youtube, calm, hopeful, chilled, podcast, ambient, elegant, intro, relaxed, background music, relaxing, film music", "url": "https://cdn.pixabay.com/audio/2022/07/08/audio_e8884ea65d.mp3" }, { "title": "Sleeping Signal - Chill lofi Background Music", "imageUrl": "pixicon2-music", "description": "beautiful plays, podcast music, smooth, beats, rnb, bright, background, dreamy, electronic, slow, music, floating, peaceful, laid back, chill, vlog music, hopeful, romantic, elegant, music for videos, background music, music for youtube videos, relaxing", "url": "https://cdn.pixabay.com/audio/2022/01/18/audio_7452baa172.mp3" }, { "title": "Night in the sky - BRUSSE (Acoustique cool piano flute cor)", "imageUrl": "pixicon2-music", "description": "laid back, beautiful plays, dreamy, modern classical, elegant, smooth, sentimental, hopeful, bright, slow, floating, peaceful", "url": "https://cdn.pixabay.com/audio/2021/06/15/audio_8231e74d6f.mp3" }, { "title": "Serenity", "imageUrl": "https://cdn.pixabay.com/audio/2022/04/03/01-41-30-662_200x200.jpg", "description": "beautiful plays, smooth, soothing, serene, solo piano, bright, dreamy, glamorous, slow, medium, floating, peaceful, laid back, modern jazz, zen, solo instruments, calm, hopeful, romantic, elegant, background music, relaxing", "url": "https://cdn.pixabay.com/audio/2021/11/03/audio_b08fcae491.mp3" }, { "title": "Carcelero by Juan Martin Flamenco Guitar : Ahmad MousaviPour", "imageUrl": "pixicon2-music", "description": "jon, instrument, smooth, cctv, guitar, carcelero, bright, visa, tinsel, fraud, song, track, meta, slow, music, floating, audio, peaceful, folk, laid back, madina, resume, solo instruments, sentimental, biryani, solo, ronaldo, elegant, flamenco palo, solo guitar, solist, studio, christmas room, guitar flamenco, musician, bollywood, relaxing", "url": "https://cdn.pixabay.com/audio/2021/12/27/audio_4aef2055cf.mp3" }, { "title": "Dreamy Chill Beat", "imageUrl": "pixicon2-music", "description": "podcast music, smooth, beats, ambience, rnb, bright, depth, stylish, chill out, abstract, luxury, dreamy, electronic, clean, deep, slow, slow motion, dark, medium, floating, laid back, chill, vlog music, modern, hopeful, chilled, time lapse, ambient, elegant, fashion, music for videos, beat, background music, music for youtube videos, atmospheric, relaxing", "url": "https://cdn.pixabay.com/audio/2022/03/10/audio_f20a7f96c6.mp3" }, { "title": "nature music Guitar :Ahmad Mousavi pour", "imageUrl": "pixicon2-music", "description": "sea, smooth, guitar, fall, bright, swam, meditation, road, guitarrista, forest, slow, relax, trees, music, floating, classic, sky, peaceful, acoustic group, laid back, weather, rain, guitarist, solo instruments, bird, flamenco, musical, elegant, spring, solo guitar, relaxing music, relaxing, classic music, musician, nature", "url": "https://cdn.pixabay.com/audio/2021/12/06/audio_d1d14d2b61.mp3" }, { "title": "Meditation", "imageUrl": "pixicon2-music", "description": "laid back, dreamy, alternative hip hop, beats, smooth, rnb, bright, slow, medium, floating, relaxing", "url": "https://cdn.pixabay.com/audio/2020/09/16/audio_ec90515e8d.mp3" }, { "title": "Edvard Grieg, Per Gynt, Morning Mood, -Classical Remix Harmonica", "imageUrl": "https://cdn.pixabay.com/audio/2022/03/28/08-26-41-804_200x200.jpg", "description": "folk, modern classical, acoustic group, laid back, elegant, smooth, edvard grieg, historical, sentimental, classical, hopeful, bright, slow, vintage, floating, norway, relaxing, peaceful", "url": "https://cdn.pixabay.com/audio/2021/09/08/audio_180612c4c6.mp3" }, { "title": "Brother", "imageUrl": "pixicon2-music", "description": "soft, smooth, beats, inspiring, tender, motivated, innovate, bright, commercial, background, dreamy, motivational, pop, electronic, business, medium fast, slow, suspense, catchy, marketing, floating, presentation, advertising, peaceful, laid back, inspirational, sneaking, confident, vlog music, hopeful, uplifting, corporate, ambient, emotionally, happy, corporation, documentary, music for videos, inspiration, background music, music for youtube videos, hope, relaxing", "url": "https://cdn.pixabay.com/audio/2022/01/11/audio_ed78e7c832.mp3" }, { "title": "Erik Satie - Gnossienne 4 - Classical Remix Saxophone 2", "imageUrl": "https://cdn.pixabay.com/audio/2022/03/27/23-38-55-406_200x200.jpg", "description": "beautiful plays, smooth, bright, epic, masterpiece, sweet, slow, floating, peaceful, acoustic group, laid back, sentimental, hopeful, magnificent, entertaining, elegant, classical, impressive, background music, traditional jazz", "url": "https://cdn.pixabay.com/audio/2021/11/09/audio_229f987ff3.mp3" }, { "title": "ON THE OTHER SIDE", "imageUrl": "https://cdn.pixabay.com/audio/2022/03/26/03-46-19-9_200x200.jpg", "description": "smooth, guitar, solo piano, bright, christian, glamorous, slow, floating, easy listening, laid back, jazz, solo instruments, faith, changing tempo, accoustic, elegant, traditional jazz, cafe, relaxing", "url": "https://cdn.pixabay.com/audio/2022/01/10/audio_ebeb3867e8.mp3" }, { "title": "Walking Out (Slow Reverb ver.)", "imageUrl": "https://cdn.pixabay.com/audio/2022/06/07/01-27-33-516_200x200.jpg", "description": "melodic, bassm synth, slow, rain, mystery, pulses, reverb, enlightened, rnb, electronic, smooth, ambient, beats, elegant, harp, relaxing, alternative, floating, dreamy, realization, serious, remake, dark, hopeful, suspense, bright, laid back, dynamic, mysterious, remix", "url": "https://cdn.pixabay.com/audio/2022/06/07/audio_35f6615bf2.mp3" }, { "title": "Tired of Being Alone - 10", "imageUrl": "pixicon2-music", "description": "old school rnb, rnb, laid back, bright, smooth, slow, sexy, romantic, hopeful, vocal", "url": "https://cdn.pixabay.com/audio/2020/10/15/audio_f15775af97.mp3" }, { "title": "I am Not in Paris - GLBML", "imageUrl": "pixicon2-music", "description": "slow, sneaky, bittersweet, positive, quirky, smooth, paris, mardi gras, bouncy, elegant, humor, relaxing, floating, dreamy, acoustic group, main title, film music, suspense, bright, laid back, traditional jazz, accordion, lite, sneaking", "url": "https://cdn.pixabay.com/audio/2022/02/10/audio_1bcd3992de.mp3" }, { "title": "After midnight in New York", "imageUrl": "pixicon2-music", "description": "bass, bar closing, all the girls are beautiful, slow, cigarette smoke, glamorous, smooth, intro/outro, modern jazz, music for videos, beautiful plays, relaxing, floating, dreamy, sentimental, last drink, laid back, bright, dim light", "url": "https://cdn.pixabay.com/audio/2021/06/02/audio_0a9c9a3d8f.mp3" }, { "title": "Big And Awkward", "imageUrl": "https://cdn.pixabay.com/audio/2022/04/06/09-54-43-565_200x200.png", "description": "chasing, rock, powerful, slow, distortion, heavy &amp; ponderous, electronic, medium, music for youtube videos, aggressive, smash, beats, vlog music, music for videos, strong, sports, energetic, floating, restless, trailer, bright, laid back, action", "url": "https://cdn.pixabay.com/audio/2022/01/25/audio_65c449c72f.mp3" }, { "title": "Hip Hop - Little Wonder", "imageUrl": "https://cdn.pixabay.com/audio/2022/03/25/00-57-21-73_200x200.jpg", "description": "instrumental, alternative hip hop, slow, wonderful, marvel, fascination, quirky, hip hop, rnb, electronic, smooth, wondering, ambient, curiosity, relaxing, floating, dreamy, awe, spectacle, sentimental, beauty, awesome, laid back, bright, miracle, wonder", "url": "https://cdn.pixabay.com/audio/2022/01/09/audio_23d084efc7.mp3" }, { "title": "Strange Dreams", "imageUrl": "pixicon2-music", "description": "bright, laid back, alternative, slow, post rock, epic, heavy &amp; ponderous, eccentric, hopeful", "url": "https://cdn.pixabay.com/audio/2021/06/29/audio_20cd1bc1ce.mp3" }, { "title": "Searching", "imageUrl": "pixicon2-music", "description": "bright, laid back, electronic, smooth, music, relaxing, slow, floating, dreamy, medium, background music, beats, ambient, searching, beat, hopeful", "url": "https://cdn.pixabay.com/audio/2022/02/03/audio_e485db550a.mp3" }, { "title": "The Cold Weather", "imageUrl": "pixicon2-music", "description": "chill, slow, lofi beats, lo fi, mood, hip hop, electronic, smooth, lofi, medium, lofi hip hop, relax, music for youtube videos, lofi chill, beats, elegant, vlog music, music for videos, beautiful plays, relaxing, floating, dreamy, chill music, lofi hiphop, relaxing music, lofi music, chillhop, focus music, laid back, bright, podcast music, peaceful, study music, background music, beat, chill lofi, chill out music", "url": "https://cdn.pixabay.com/audio/2022/08/17/audio_0317a95f33.mp3" }, { "title": "A Failed Seduction", "imageUrl": "pixicon2-music", "description": "rock, hip-hop, alternative hip hop, slow, neo soul, heavy &amp; ponderous, smooth, intro/outro, guitar solo, alternative, floating, seductive, sentimental, hopeful, electric guitar, laid back, bright, jazz, eccentric", "url": "https://cdn.pixabay.com/audio/2022/01/14/audio_abb62e6304.mp3" }, { "title": "CINOOOOO", "imageUrl": "pixicon2-music", "description": "rnb, bright, laid back, smooth, trap, medium, slow, sexy, mainstream hip hop, vocal", "url": "https://cdn.pixabay.com/audio/2020/10/05/audio_068796aa9a.mp3" }, { "title": "Electric Lullaby", "imageUrl": "pixicon2-music", "description": "bright, rock, laid back, lullaby, electric, lyrical, psychedelic, tranquil, alternative, slow, floating, butterfly, eccentric, dream, vocal", "url": "https://cdn.pixabay.com/audio/2022/02/01/audio_e8dfb1ff34.mp3" }, { "title": "Sweet Me", "imageUrl": "pixicon2-music", "description": "laid back, old school rnb, peaceful, smooth, relaxing, slow, floating, sexy, pulses, beats, elegant", "url": "https://cdn.pixabay.com/audio/2020/08/17/audio_25e838b766.mp3" }, { "title": "have you ever been to mars ?", "imageUrl": "pixicon2-music", "description": "laid back, build up scenes, bright, smooth, alternative, relaxing, slow, dreamy, floating", "url": "https://cdn.pixabay.com/audio/2021/05/04/audio_88c25b6fa3.mp3" }, { "title": "Slow Hip-Hop", "imageUrl": "pixicon2-music", "description": "fashion, chill, alternative hip hop, slow, pop, vlog, hip hop, rnb, atmospheric, electronic, smooth, trap, tik tok, music for youtube videos, beats, ambient, futuristic, vlog music, music for videos, car, relaxing, floating, modern, instagram, timelapse, future bass, light, laid back, bright, background, show, slow motion, background music, video, inspiring, opener", "url": "https://cdn.pixabay.com/audio/2022/02/10/audio_62796f651c.mp3" }, { "title": "Trygve Larsen -The Lonely Duo Series -Guitar and Harmonica", "imageUrl": "https://cdn.pixabay.com/audio/2022/07/30/06-42-12-389_200x200.jpg", "description": "laid back, bright, easy listening, relaxing, slow, floating, background music, pop, acoustic group, contemporary, film music, traditional country, video music", "url": "https://cdn.pixabay.com/audio/2022/07/29/audio_ee7c6436f1.mp3" }, { "title": "Trygve Larsen -Exceptional Division -Flute Background Music", "imageUrl": "https://cdn.pixabay.com/audio/2022/08/18/00-59-45-485_200x200.jpg", "description": "laid back, bright, peaceful, youtube backgrounds, cinematic, beautiful plays, relaxing, slow, floating, background music, movie background, acoustic group, royalty free music, elegant, film music", "url": "https://cdn.pixabay.com/audio/2022/08/12/audio_7dd2b996bd.mp3" }, { "title": "The Lonely Instrument Series - Resonator Guitar -Played by Eddy Dunlap", "imageUrl": "https://cdn.pixabay.com/audio/2022/03/27/06-52-47-695_200x200.jpg", "description": "bright, solo instruments, laid back, copyright free, solo guitar, peaceful, cinematic, relaxing, slow, floating, background music, movie background, royalty free music, sad, romantic, elegant, sentimental, solo instrument", "url": "https://cdn.pixabay.com/audio/2022/01/04/audio_828bb3f54f.mp3" }, { "title": "Desesperebolo", "imageUrl": "pixicon2-music", "description": "slow, indie pop, fx, videogame, synthesizer, guitar, smooth, play, video games, elegant, piano, instrumentation, console, music, youtube, sentimental, concert, laid back, bright, instrument, environment, video", "url": "https://cdn.pixabay.com/audio/2021/10/04/audio_d1396eed56.mp3" }, { "title": "Sometimes At Night", "imageUrl": "pixicon2-music", "description": "laid back, modern country, smooth, slow, indie pop, hopeful, sentimental, vocal", "url": "https://cdn.pixabay.com/audio/2020/08/21/audio_89c1b30be9.mp3" }, { "title": "Chopin - Prelude In E Minor - Opus 28, Number 4 - Classical Remix", "imageUrl": "https://cdn.pixabay.com/audio/2022/03/27/23-31-11-436_200x200.jpg", "description": "entertaining, peaceful, sad, classical, elegant, sweet, acoustic group, beautiful plays, background music, magnificent, laid back, slow, sentimental, bright, floating, masterpiece, modern classical, epic, impressive", "url": "https://cdn.pixabay.com/audio/2021/11/10/audio_69457e38b3.mp3" }, { "title": "Les enfants de lautodestruction", "imageUrl": "pixicon2-music", "description": "laid back, slow, france, rock, solo guitar, strange &amp; weird, floating, medium, changing tempo", "url": "https://cdn.pixabay.com/audio/2020/03/17/229_2785a4f9da.mp3" }, { "title": "Popcorn And Roses", "imageUrl": "pixicon2-music", "description": "savory, love, vocal, changing tempo, rock, heavy &amp; ponderous, rain, theater, romantic, eccentric, alternative, popcorn, buttery, romance, roses, laid back, slow, bright, floating, real", "url": "https://cdn.pixabay.com/audio/2022/02/01/audio_1d10cb6190.mp3" }, { "title": "Trygve Larsen -Moody Gypsy -Instrumental Jazz", "imageUrl": "https://cdn.pixabay.com/audio/2022/08/05/00-33-27-346_200x200.jpg", "description": "timeless, jazz, instrumental, uplifting, elegant, romantic, medium, glamorous, traditional jazz, background music, contemporary, relaxing, cafe, royalty free music, smooth, laid back, slow, 432hz, bright, evergreen", "url": "https://cdn.pixabay.com/audio/2022/08/03/audio_31cb611c64.mp3" }, { "title": "IS", "imageUrl": "pixicon2-music", "description": "music, suspense, bass, drums, beats, mysterious, dreamy, heavy &amp; ponderous, medium fast, alternative hip hop, restless, beat, chasing, mainstream hip hop, architecture, laid back, slow, bright, electronic, floating, trap", "url": "https://cdn.pixabay.com/audio/2022/05/17/audio_1464e40c12.mp3" }, { "title": "Geri Music - Cosmic Journey", "imageUrl": "pixicon2-music", "description": "mysterious, laid back, slow, beats, electronic, relaxing, floating, mystery, pulses, smooth, dreamy", "url": "https://cdn.pixabay.com/audio/2020/10/08/audio_fdec923aec.mp3" }, { "title": "Bach, Brandenburg Concert #2 in F, 2nd Mov. Andante, -Jazz Remix", "imageUrl": "https://cdn.pixabay.com/audio/2022/03/28/07-52-31-736_200x200.jpg", "description": "laid back, slow, classical, sentimental, elegant, bright, fantastic, romantic, bach, peaceful, floating, remix, smooth jazz, jazz, epic, beautiful plays, hopeful", "url": "https://cdn.pixabay.com/audio/2021/09/13/audio_fa4d4f5859.mp3" }, { "title": "free beat bgm", "imageUrl": "pixicon2-music", "description": "laid back, slow, sentimental, bright, beats, floating, rnb, alternative hip hop, smooth, dreamy", "url": "https://cdn.pixabay.com/audio/2021/06/21/audio_d87adb4291.mp3" }, { "title": "Trygve Larsen -Lucky Piano -Ballroom Music", "imageUrl": "https://cdn.pixabay.com/audio/2022/08/06/04-33-42-287_200x200.jpg", "description": "glamorous, traditional jazz, laid back, slow, party music, fun, elegant, bright, uplifting, entertaining, relaxing, cafe, ballroom music, dance music, beautiful plays, tradition", "url": "https://cdn.pixabay.com/audio/2022/08/06/audio_d5398fdd34.mp3" }, { "title": "English Poem", "imageUrl": "pixicon2-music", "description": "suspense, composer, beats, tv, mysterious, vocal, dreamy, medium fast, royalty, eccentric, restless, alternative, film, chasing, relaxing, spoken, poem, smooth, laid back, slow, old, bright, english, electronic, floating, game", "url": "https://cdn.pixabay.com/audio/2022/03/29/audio_b9aaf8daec.mp3" }, { "title": "Childrens Folksong -Little Cock Sparrow", "imageUrl": "https://cdn.pixabay.com/audio/2022/04/01/02-26-45-866_200x200.jpg", "description": "folk, laid back, slow, elegant, bright, happy childrens tunes, tradition, history, relaxing, nations, acoustic group, culture, uplifting, patriot, kids, hopeful, childrens folksong", "url": "https://cdn.pixabay.com/audio/2022/04/01/audio_ff1a6fbc63.mp3" }, { "title": "The Challenge", "imageUrl": "pixicon2-music", "description": "laid back, electro, slow, suspense, strange &amp; weird, floating, mystery, horror scene, dark", "url": "https://cdn.pixabay.com/audio/2020/03/17/118_30e4be1fe7.mp3" }, { "title": "Agora", "imageUrl": "pixicon2-music", "description": "laid back, electro, supernatural, slow, indie pop, chasing, floating, medium, smooth jazz", "url": "https://cdn.pixabay.com/audio/2020/03/17/53_b84698dd0c.mp3" }, { "title": "Shoepop", "imageUrl": "pixicon2-music", "description": "laid back, slow, sentimental, beats, relaxing, old school rnb, smooth, dreamy", "url": "https://cdn.pixabay.com/audio/2020/08/17/audio_4685841d4c.mp3" }, { "title": "Childrens Folksong -My Darling Clementine", "imageUrl": "https://cdn.pixabay.com/audio/2022/04/01/02-23-32-251_200x200.jpg", "description": "folk, laid back, slow, elegant, bright, happy childrens tunes, history, relaxing, medium fast, floating, nations, culture, uplifting, patriot, euphoric, kids, tradition, childrens folksong", "url": "https://cdn.pixabay.com/audio/2022/04/01/audio_a37519bff7.mp3" }, { "title": "Frederic Chopin, Fantaisie Impromptu In Db, -Classical Remix", "imageUrl": "https://cdn.pixabay.com/audio/2022/03/28/02-37-01-626_200x200.jpg", "description": "entertaining, chopin, classical, elegant, romantic, acoustic group, beautiful plays, smooth, magnificent, laid back, slow, sentimental, bright, floating, masterpiece, modern classical, epic, impressive, hopeful", "url": "https://cdn.pixabay.com/audio/2021/10/02/audio_e6a240cd28.mp3" }, { "title": "Geri Music - Without you", "imageUrl": "pixicon2-music", "description": "laid back, slow, sentimental, nostalgia, beats, relaxing, floating, medium, rnb, alternative hip hop, smooth, hopeful", "url": "https://cdn.pixabay.com/audio/2020/09/23/audio_9a1f1abf1f.mp3" }, { "title": "Trygve Larsen -Break Away to the Gobi -Accordion Background Music", "imageUrl": "https://cdn.pixabay.com/audio/2022/07/30/07-19-15-564_200x200.jpg", "description": "folk, laid back, slow, background music, sentimental, elegant, bright, pop, accordion, contemporary, relaxing, floating, acoustic group, easy listening, beautiful plays, hopeful", "url": "https://cdn.pixabay.com/audio/2022/07/29/audio_5a31e419a2.mp3" }, { "title": "02 TW Bonuspart-marc leicht px", "imageUrl": "pixicon2-music", "description": "soundtrack, pulses, uplifting, dreamy, landscape, the waltz bonus track, fast, mountains, restless, mar easily, chasing, relaxing, smooth, nice, mountainworlds, laid back, slow, bright, electronic, ambient, floating, pictureworlds", "url": "https://cdn.pixabay.com/audio/2022/01/30/audio_ba27153d0d.mp3" }, { "title": "BLAZO AK - SCHAKA ft MADIBA(HD QUALITE)", "imageUrl": "pixicon2-music", "description": "laid back, slow, sentimental, news, floating, alternative hip hop, eccentric, vocal, sad, dreamy", "url": "https://cdn.pixabay.com/audio/2022/01/27/audio_c19eb8419a.mp3" }]


module.exports = {
  async up(queryInterface, Sequelize) {
    const user = await User.create({
      firstName: 'John',
      lastName: 'Smith',
      username: 'Pixabay',
      email: 'pixabay@pixabay.com',
      password: bcrypt.hashSync('pixabay'),
      imageUrl: 'https://cdn.pixabay.com/photo/2017/01/17/14/44/pixabay-1987090_1280.png'
    });

    for (let i = 0; i < songsArr.length; i++) {
      await Song.create({ ...songsArr[i], description: 'description', userId: user.id })
    }
  },
  async down(queryInterface, Sequelize) {
    await User.destroy({ where: { username: 'Pixabay' } });
  }
};
