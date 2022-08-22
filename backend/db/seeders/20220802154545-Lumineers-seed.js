'use strict';
const { User, Album, Song } = require('../models');
const bcrypt = require('bcryptjs');

const Users = [
  {
    firstName: 'Scott and Seth',
    lastName: 'Avett',
    username: 'The Avett Brothers',
    email: 'snsavett@gmail.com',
    password: 'password',
    Albums: [
      {
        "title": "The Third Gleam",
        "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/85/3a/01/853a012d-f26e-77e3-50f7-6bc265ba0c93/20CRGIM23251.rgb.jpg/400x400cc.jpg",
        "description": "description",
        "Songs": [
          {
            "title": "Victory",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/85/3a/01/853a012d-f26e-77e3-50f7-6bc265ba0c93/20CRGIM23251.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e7/14/bc/e714bcab-cf12-9fe1-f562-9f8b393a92c6/mzaf_13361001377829541115.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "The Gleam",
        "imageUrl": "https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/ce/39/06/ce3906bf-3308-8e76-3d1b-a42879bb0e08/mzi.yaeztmid.jpg/400x400cc.jpg",
        "description": "description",
        "Songs": [
          {
            "title": "If It's The Beaches",
            "imageUrl": "https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/ce/39/06/ce3906bf-3308-8e76-3d1b-a42879bb0e08/mzi.yaeztmid.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a8/38/b6/a838b68c-065a-d10a-3b57-a013c8a12d12/mzaf_9133878503916624916.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "Magpie and the Dandelion",
        "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music113/v4/d1/0d/5a/d10d5a73-e0bf-e912-4106-c1c3758084de/13UAAIM68041.rgb.jpg/400x400cc.jpg",
        "description": "description",
        "Songs": [
          {
            "title": "Morning Song",
            "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music113/v4/d1/0d/5a/d10d5a73-e0bf-e912-4106-c1c3758084de/13UAAIM68041.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/c5/ea/35/c5ea35ca-d816-3d20-7be1-76e6b97fc064/mzaf_13111331105462004466.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "The Second Gleam",
        "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/37/25/26/372526ba-a587-e46e-3ebd-e5cb3d8cdde7/888880660954.tif/400x400cc.jpg",
        "description": "description",
        "Songs": [
          {
            "title": "Murder In The City",
            "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/37/25/26/372526ba-a587-e46e-3ebd-e5cb3d8cdde7/888880660954.tif/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f5/2f/00/f52f0041-0ce8-75a1-cf2e-63ec885ad39e/mzaf_921678999660835079.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "I And Love And You",
        "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/f4/91/21/f4912174-4c34-8758-7673-60a8ce645785/00602537159048.rgb.jpg/400x400cc.jpg",
        "description": "description",
        "Songs": [
          {
            "title": "I And Love And You",
            "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/f4/91/21/f4912174-4c34-8758-7673-60a8ce645785/00602537159048.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/c6/47/23/c647237b-e97f-15fa-bd29-c401be6210f1/mzaf_9295390431137102218.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Head Full Of Doubt/Road Full Of Promise",
            "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/f4/91/21/f4912174-4c34-8758-7673-60a8ce645785/00602537159048.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/44/1b/53/441b53f7-75e3-f31b-64ae-13a164975613/mzaf_18087729508483909539.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "January Wedding",
            "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/f4/91/21/f4912174-4c34-8758-7673-60a8ce645785/00602537159048.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/44/70/74/447074e2-1ac5-2859-9ce2-e482158bf44a/mzaf_8752300773858350125.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Ten Thousand Words",
            "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/f4/91/21/f4912174-4c34-8758-7673-60a8ce645785/00602537159048.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/cb/39/7f/cb397f72-d731-7e3e-4744-927ba85e42db/mzaf_11333910760193355531.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Laundry Room",
            "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/f4/91/21/f4912174-4c34-8758-7673-60a8ce645785/00602537159048.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e4/db/2f/e4db2f76-5a47-dfec-c025-4f149379646e/mzaf_507175973133723146.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Kick Drum Heart",
            "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/f4/91/21/f4912174-4c34-8758-7673-60a8ce645785/00602537159048.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/9c/00/f2/9c00f2d1-ac75-04b5-4ed9-51b5c905093d/mzaf_6298936898530773697.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "And It Spread",
            "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/f4/91/21/f4912174-4c34-8758-7673-60a8ce645785/00602537159048.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/1b/12/03/1b120300-fe6f-10fb-7a39-d5714f5a327b/mzaf_10279418804485395766.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "The Carpenter",
        "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/60/85/38/608538cc-8614-e60e-bab9-36ab2a2f17ca/12UMGIM44666.rgb.jpg/400x400cc.jpg",
        "description": "description",
        "Songs": [
          {
            "title": "Live And Die",
            "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/60/85/38/608538cc-8614-e60e-bab9-36ab2a2f17ca/12UMGIM44666.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/7e/c1/70/7ec170c6-72f2-195b-4ace-f193f439ea39/mzaf_13929758526991176365.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "February Seven",
            "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/60/85/38/608538cc-8614-e60e-bab9-36ab2a2f17ca/12UMGIM44666.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/98/f0/fd/98f0fd6a-6456-a8b8-7819-11dd1c44ed50/mzaf_8943014750789371676.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "The Once And Future Carpenter",
            "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/60/85/38/608538cc-8614-e60e-bab9-36ab2a2f17ca/12UMGIM44666.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/50/5e/4c/505e4cb1-7912-ccad-b0b2-472831c0f6ba/mzaf_15908149846701251679.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "Country Was",
        "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music3/v4/eb/f5/05/ebf505c7-ccb8-6bda-bfc8-0bd8666af528/884977033335.tif/400x400cc.jpg",
        "description": "description",
        "Songs": [
          {
            "title": "November Blue",
            "imageUrl": "https://is3-ssl.mzstatic.com/image/thumb/Music3/v4/eb/f5/05/ebf505c7-ccb8-6bda-bfc8-0bd8666af528/884977033335.tif/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/3f/93/61/3f9361ae-c434-7b99-73af-97ff25984170/mzaf_2524012056716248686.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "Live At Bojangles' Coliseum/2009",
        "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/17/27/7a/17277add-adba-6784-45a3-50e5e466479e/00602567787037.rgb.jpg/400x400cc.jpg",
        "description": "description",
        "Songs": [
          {
            "title": "The Ballad Of Love And Hate (Live At Bojangles' Coliseum/2009)",
            "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/17/27/7a/17277add-adba-6784-45a3-50e5e466479e/00602567787037.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b7/03/fb/b703fb4d-b8ef-f4dc-6254-f784db029e76/mzaf_6767139208591396041.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "True Sadness",
        "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/cc/05/2e/cc052eb1-184d-d5aa-77b1-a757b40cf0b9/00602547861917.rgb.jpg/400x400cc.jpg",
        "description": "description",
        "Songs": [
          {
            "title": "No Hard Feelings",
            "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/cc/05/2e/cc052eb1-184d-d5aa-77b1-a757b40cf0b9/00602547861917.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/c2/e4/b3/c2e4b364-dd3a-7276-6bb9-e78e8fcffffc/mzaf_11199540445090618182.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Ain't No Man",
            "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/cc/05/2e/cc052eb1-184d-d5aa-77b1-a757b40cf0b9/00602547861917.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ea/6e/0a/ea6e0a53-14f1-ba74-2eb1-d0ed378cc4b2/mzaf_14643132637518187383.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "I Wish I Was",
            "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/cc/05/2e/cc052eb1-184d-d5aa-77b1-a757b40cf0b9/00602547861917.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/9b/d0/8d/9bd08da1-9d93-b519-f78b-eca24540211e/mzaf_986032928752137856.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "True Sadness",
            "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/cc/05/2e/cc052eb1-184d-d5aa-77b1-a757b40cf0b9/00602547861917.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/3a/30/9b/3a309b45-1322-48fa-cd6e-770423c4c8e5/mzaf_901163041203361178.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "Closer Than Together",
        "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/f1/3c/fc/f13cfc08-c31c-32f6-ebe9-14e7d8a5d67a/19UMGIM69270.rgb.jpg/400x400cc.jpg",
        "description": "description",
        "Songs": [
          {
            "title": "High Steppin'",
            "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/f1/3c/fc/f13cfc08-c31c-32f6-ebe9-14e7d8a5d67a/19UMGIM69270.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/9e/90/64/9e9064f7-669d-90b6-90f4-04f20885305e/mzaf_17159248099272052255.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "Emotionalism",
        "imageUrl": "https://is5-ssl.mzstatic.com/image/thumb/Music3/v4/0b/e8/af/0be8af41-a26f-8433-a2ce-d0544c4f1899/888880847140.tif/400x400cc.jpg",
        "description": "description",
        "Songs": [
          {
            "title": "The Weight Of Lies",
            "imageUrl": "https://is5-ssl.mzstatic.com/image/thumb/Music3/v4/0b/e8/af/0be8af41-a26f-8433-a2ce-d0544c4f1899/888880847140.tif/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/ad/20/93/ad209392-1151-72cf-3052-029ca4bc6aa5/mzaf_17691492400084697479.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Shame",
            "imageUrl": "https://is5-ssl.mzstatic.com/image/thumb/Music3/v4/0b/e8/af/0be8af41-a26f-8433-a2ce-d0544c4f1899/888880847140.tif/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/8a/0a/3e/8a0a3eed-5f6a-ee22-54f4-d357d4b4f57a/mzaf_16291272064607359403.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "I Would Be Sad",
            "imageUrl": "https://is5-ssl.mzstatic.com/image/thumb/Music3/v4/0b/e8/af/0be8af41-a26f-8433-a2ce-d0544c4f1899/888880847140.tif/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/3e/25/fc/3e25fc64-db1d-a4dc-0d45-f0066183ea23/mzaf_14375635409302818168.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Die Die Die",
            "imageUrl": "https://is5-ssl.mzstatic.com/image/thumb/Music3/v4/0b/e8/af/0be8af41-a26f-8433-a2ce-d0544c4f1899/888880847140.tif/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/39/78/9d/39789df9-3c38-949a-d627-456ad502ca0b/mzaf_10329870804242111660.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      }
    ]
  },
  {
    firstName: "Wesley",
    lastName: "Schultz",
    username: "The Lumineers",
    email: "lumineers@yahoo.com",
    password: 'password',
    "Albums": [
      {
        "title": "III",
        description: "description",
        "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3d/65/e7/3d65e7fc-3d45-7487-946b-f371e7c597d5/dj.xzlimhgs.jpg/400x400cc.jpg",
        "Songs": [
          {
            "title": "Gloria",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3d/65/e7/3d65e7fc-3d45-7487-946b-f371e7c597d5/dj.xzlimhgs.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/58/8b/f2/588bf275-d973-b9d5-3504-cf89b23c7822/mzaf_3908636396389758880.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Salt And The Sea",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3d/65/e7/3d65e7fc-3d45-7487-946b-f371e7c597d5/dj.xzlimhgs.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/73/d8/ad/73d8ad2c-637b-857c-86a4-d073b27425b0/mzaf_13136064894621853429.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "The Lumineers",
        description: "description",
        imageUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7a/f7/15/7af715f6-6242-19fd-f433-812fa45f5353/lumineers-hires-album-cover.jpg/400x400cc.jpg",
        "Songs": [
          {
            "title": "Ho Hey",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7a/f7/15/7af715f6-6242-19fd-f433-812fa45f5353/lumineers-hires-album-cover.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/01/00/92/0100929c-8d6d-629d-2446-9b5c017d8c50/mzaf_6877233337787379442.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Stubborn Love",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7a/f7/15/7af715f6-6242-19fd-f433-812fa45f5353/lumineers-hires-album-cover.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/3f/e0/cb/3fe0cb94-226d-0b45-0d7e-6094a0276bba/mzaf_9344464055692361644.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Flowers In Your Hair",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7a/f7/15/7af715f6-6242-19fd-f433-812fa45f5353/lumineers-hires-album-cover.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/fb/0a/e8/fb0ae858-7388-ea54-5b2f-ce3c17333751/mzaf_10844625049303115595.plus.aac.p.m4a",
            "description": "description"
          },
          {
            "title": "Charlie Boy",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7a/f7/15/7af715f6-6242-19fd-f433-812fa45f5353/lumineers-hires-album-cover.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/c6/dc/7f/c6dc7f2e-1976-acbb-434e-321cac16df2b/mzaf_7180749587413947426.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Ho Hey",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7a/f7/15/7af715f6-6242-19fd-f433-812fa45f5353/lumineers-hires-album-cover.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/01/00/92/0100929c-8d6d-629d-2446-9b5c017d8c50/mzaf_6877233337787379442.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "Cleopatra",
        description: "description",
        imageUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/48/df/e5/48dfe5b5-7faf-ec89-ae88-91b4362b38ae/Lums_Cleopatra_cvr.jpg/400x400cc.jpg",
        "Songs": [
          {
            "title": "Ophelia",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/48/df/e5/48dfe5b5-7faf-ec89-ae88-91b4362b38ae/Lums_Cleopatra_cvr.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/c6/87/ca/c687ca9e-4282-b7a6-9d48-ccb7b985e046/mzaf_10973513051296380376.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Sleep On The Floor",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/48/df/e5/48dfe5b5-7faf-ec89-ae88-91b4362b38ae/Lums_Cleopatra_cvr.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/1d/5d/68/1d5d684e-e872-95d4-0eda-4954dbb4e518/mzaf_18433995866010525708.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Cleopatra",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/48/df/e5/48dfe5b5-7faf-ec89-ae88-91b4362b38ae/Lums_Cleopatra_cvr.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cd/b6/ff/cdb6ff41-1190-158d-cda1-a4b325e0f9ff/mzaf_5098768524414745708.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Angela",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/48/df/e5/48dfe5b5-7faf-ec89-ae88-91b4362b38ae/Lums_Cleopatra_cvr.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/02/b7/f2/02b7f27a-3adf-f25c-3784-09a9cdb003e3/mzaf_3601782534497970357.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "Brightside",
        description: "description",
        "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/f7/cd/e8/f7cde857-6480-c7f5-5180-ba4e9597ab00/LUMINEERS_BRIGHTSIDE_FINAL.jpg/400x400cc.jpg",
        "Songs": [
          {
            "title": "BRIGHTSIDE",
            "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/f7/cd/e8/f7cde857-6480-c7f5-5180-ba4e9597ab00/LUMINEERS_BRIGHTSIDE_FINAL.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/54/50/fd/5450fdc2-2b3e-1c64-c5aa-780be46c8210/mzaf_14616462924339795268.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "WHERE WE ARE",
            "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/f7/cd/e8/f7cde857-6480-c7f5-5180-ba4e9597ab00/LUMINEERS_BRIGHTSIDE_FINAL.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/17/70/e2/1770e244-c8c6-e24c-911c-828e15428653/mzaf_6557177204210889490.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "A.M. RADIO",
            "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/f7/cd/e8/f7cde857-6480-c7f5-5180-ba4e9597ab00/LUMINEERS_BRIGHTSIDE_FINAL.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/d1/79/04/d17904fe-5b4f-4b68-c0c6-82eaef1a0427/mzaf_2767201311761271529.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        title: "Pit i ego drakon",
        description: "description",
        "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music128/v4/87/30/9b/87309bb1-a74d-6266-ec1c-0187427d4c3f/00050087349448.rgb.jpg/400x400cc.jpg",
        "Songs": [
          {
            "title": "Nobody Knows",
            "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music128/v4/87/30/9b/87309bb1-a74d-6266-ec1c-0187427d4c3f/00050087349448.rgb.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/73/38/b5/7338b5c9-f68a-a0a1-0378-08b7a9d3ee1a/mzaf_18399391382049193229.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      }
    ]
  },
  {
    firstName: 'Andrew',
    lastName: 'Hozier-Byrne',
    username: 'Hozier',
    email: 'hozier@gmail.com',
    password: 'password',
    Albums: [
      {
        "title": "Hozier",
        "description": "description",
        "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e2/68/7f/e2687fea-d90f-002b-9ea4-b50f8fee6e75/886444702157.jpg/400x400cc.jpg",
        "Songs": [
          {
            "title": "Take Me To Church",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e2/68/7f/e2687fea-d90f-002b-9ea4-b50f8fee6e75/886444702157.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/0c/b7/e0/0cb7e03d-6734-a041-71bc-c27c0f95367d/mzaf_5548461691212262790.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Work Song",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e2/68/7f/e2687fea-d90f-002b-9ea4-b50f8fee6e75/886444702157.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/40/1f/a4/401fa41a-414b-b2a1-5046-dfd84377df66/mzaf_10472210853282967386.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Someone New",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e2/68/7f/e2687fea-d90f-002b-9ea4-b50f8fee6e75/886444702157.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/93/3d/44/933d441a-b942-9f3c-b821-44ab32bf1d33/mzaf_584324207251598546.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Cherry Wine (Live)",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e2/68/7f/e2687fea-d90f-002b-9ea4-b50f8fee6e75/886444702157.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/69/d4/ab/69d4ab08-2302-fa38-49ec-6233bdea64a0/mzaf_8876158449238283436.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Like Real People Do",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e2/68/7f/e2687fea-d90f-002b-9ea4-b50f8fee6e75/886444702157.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/19/bf/29/19bf2906-89ca-a75c-ba2a-d511f72e1e2d/mzaf_2735247050699947202.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "From Eden",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e2/68/7f/e2687fea-d90f-002b-9ea4-b50f8fee6e75/886444702157.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/7c/0e/03/7c0e0368-9d06-9d14-959a-e1fa0717660e/mzaf_2872784748111439408.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Jackie And Wilson",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e2/68/7f/e2687fea-d90f-002b-9ea4-b50f8fee6e75/886444702157.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/cb/2c/81/cb2c8196-f1fb-94a9-299d-a7cfee0eac1f/mzaf_2194182607182249136.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "To Be Alone",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e2/68/7f/e2687fea-d90f-002b-9ea4-b50f8fee6e75/886444702157.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/0f/ae/7f/0fae7fa4-da28-adbe-48d2-83a9a4a297ce/mzaf_16934190680362264904.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Angel Of Small Death & The Codeine Scene",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e2/68/7f/e2687fea-d90f-002b-9ea4-b50f8fee6e75/886444702157.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/76/7e/05/767e05c0-6e10-ddaf-0b98-e52b4fb69192/mzaf_15907500842559732180.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Someone New",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e2/68/7f/e2687fea-d90f-002b-9ea4-b50f8fee6e75/886444702157.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/93/3d/44/933d441a-b942-9f3c-b821-44ab32bf1d33/mzaf_584324207251598546.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Sedated",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e2/68/7f/e2687fea-d90f-002b-9ea4-b50f8fee6e75/886444702157.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b2/f0/64/b2f06470-49ce-8909-1a73-66a9628b7afa/mzaf_12539914642147861154.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "In A Week",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e2/68/7f/e2687fea-d90f-002b-9ea4-b50f8fee6e75/886444702157.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/9e/86/71/9e8671f0-7551-7f52-a4c9-75b153af4d39/mzaf_8695855931320299145.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Take Me To Church",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e2/68/7f/e2687fea-d90f-002b-9ea4-b50f8fee6e75/886444702157.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/0c/b7/e0/0cb7e03d-6734-a041-71bc-c27c0f95367d/mzaf_5548461691212262790.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "Wasteland, Baby!",
        "description": "description",
        "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fc/73/03/fc73032d-d67d-ade3-8b9a-6f403fd9491b/886447495391.jpg/400x400cc.jpg",
        "Songs": [
          {
            "title": "Almost (Sweet Music)",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fc/73/03/fc73032d-d67d-ade3-8b9a-6f403fd9491b/886447495391.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/6c/7e/82/6c7e82d4-dc6e-5054-91d5-b3daf4b91ccb/mzaf_15182638762266694311.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Movement",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fc/73/03/fc73032d-d67d-ade3-8b9a-6f403fd9491b/886447495391.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e6/a0/18/e6a0184a-5d41-937e-4e57-0cbaac805486/mzaf_17255132546051412524.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Would That I",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fc/73/03/fc73032d-d67d-ade3-8b9a-6f403fd9491b/886447495391.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/54/8b/e7/548be72a-8460-b30e-55d2-decc4f430885/mzaf_16336941025668181538.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "As It Was",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fc/73/03/fc73032d-d67d-ade3-8b9a-6f403fd9491b/886447495391.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/80/41/2c/80412c08-11c0-48cc-b772-3b15c018ab8f/mzaf_10770247226352518499.plus.aac.ep.m4a",
            "description": "description"
          },
          {
            "title": "Shrike",
            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fc/73/03/fc73032d-d67d-ade3-8b9a-6f403fd9491b/886447495391.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/d2/e1/14/d2e1149a-60ac-a584-13aa-79c236fe6d9e/mzaf_15555381866103045741.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "The Bones",
        "description": "description",
        "imageUrl": "https://is2-ssl.mzstatic.com/image/thumb/Music123/v4/1e/fa/ed/1efaed1c-05af-74ee-5835-61c924709ec9/886447991480.jpg/400x400cc.jpg",
        "Songs": [
          {
            "title": "The Bones",
            "imageUrl": "https://is2-ssl.mzstatic.com/image/thumb/Music123/v4/1e/fa/ed/1efaed1c-05af-74ee-5835-61c924709ec9/886447991480.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/84/e2/71/84e271c7-0676-ce41-b2e2-3bb23ad1ccfd/mzaf_8092168508323293890.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      },
      {
        "title": "From Eden (EP)",
        "description": "description",
        "imageUrl": "https://is5-ssl.mzstatic.com/image/thumb/Music125/v4/a4/e2/96/a4e29682-ea91-ff67-a33b-2b2faa3ac865/886444512237.jpg/400x400cc.jpg",
        "Songs": [
          {
            "title": "Arsonist's Lullabye",
            "imageUrl": "https://is5-ssl.mzstatic.com/image/thumb/Music125/v4/a4/e2/96/a4e29682-ea91-ff67-a33b-2b2faa3ac865/886444512237.jpg/400x400cc.jpg",
            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/02/ff/b2/02ffb201-1ced-4888-5caa-ee02a6a62eb7/mzaf_1121883678041634984.plus.aac.ep.m4a",
            "description": "description"
          }
        ]
      }
    ]

  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let userObj of Users) {
      const userInfo = {};
      userInfo.firstName = userObj.firstName;
      userInfo.lastName = userObj.lastName;
      userInfo.username = userObj.username;
      userInfo.email = userObj.email;
      userInfo.password = userObj.password;
      userInfo.imageUrl = userObj.imageUrl;

      const user = await User.create(userInfo);

      let albums = [];
      for (let album of userObj.Albums) {
        album.userId = user.id;
        album.Songs.forEach(song => { song.userId = user.id })
        albums.push(
          await Album.create(album, {
            include: [Song]
          })
        );
      }
      await user.addAlbums(albums);
    }
  },

  async down(queryInterface, Sequelize) {
    for (let user of Users) {
      await User.destroy({ where: { username: user.username } })
    }
  }
};
