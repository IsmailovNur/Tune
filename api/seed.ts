import mongoose from 'mongoose';
import config from './config';
import { Artist } from './models/Artist';
import { Album } from './models/Album';
import { Track } from './models/Track';
import { User } from "./models/User";
import { TrackHistory } from "./models/TrackHistory";
import { randomUUID } from "node:crypto";

const run = async () => {
  await mongoose.connect(config.mongoDbUrl);
  const db = mongoose.connection;

  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('users');
    await db.dropCollection('trackhistories');
  } catch {
    console.log('Collection were not present, skipping drop!');
  }

  const [artist1, artist2, artist3] = await Artist.create([
    {
      name: 'Taylor Swift',
      information: 'American singer-songwriter',
      image: 'images/Taylor_Swift.webp',
      isPublished: true,
    },

    {
      name: 'The Weeknd',
      information: 'Canadian singer-songwriter',
      image: 'images/The_Weeknd.jpg',
      isPublished: true,
    },

    {
      name: 'Test Artist',
      information: 'Test Artist infromation',
      image: null,
      isPublished: false,
    },
  ]);


  const [album1, album2, album3, album4, unpublishedAlbum] = await Album.create([
    {
      title: '1989 (Taylor\'s Version)',
      artist: artist1._id,
      releaseYear: 2023,
      coverImage: 'images/Taylor_Swift-1989.png'
    },

    {
      title: 'Midnights',
      artist: artist1._id,
      releaseYear: 2022,
      coverImage: 'images/Taylor_Swift-Midnights.png'
    },

    {
      title: 'After Hours',
      artist: artist2._id,
      releaseYear: 2020,
      coverImage: 'images/The_Weeknd-After_Hours.png'
    },

    {
      title: 'Starboy',
      artist: artist2._id,
      releaseYear: 2016,
      coverImage: 'images/The_Weeknd-Starboy.png'
    },

    {
      title: 'Unpublished Album',
      artist: artist3._id,
      releaseYear: 2026,
      coverImage: null,
      isPublished: false,
    },
  ]);

  const [
    track1, track2, track3, track4, track5,
    track6, track7, track8, track9, track10,
    track11, track12, track13, track14, track15,
    track16, track17, track18, track19, track20
  ] = await Track.create([
    {
      title: 'Welcome to New York',
      album: album1._id,
      duration: '3:32',
      trackNumber: 1,   isPublished: true,
    },
    {title: 'Blank Space', album: album1._id, duration: '3:51', trackNumber: 2,   isPublished: true,},
    {title: 'Style', album: album1._id, duration: '3:51', trackNumber: 3,   isPublished: true,},
    {
      title: 'Out of the Woods',
      album: album1._id,
      duration: '3:55',
      trackNumber: 4,
         isPublished: true,
    },
    {
      title: 'Shake It Off',
      album: album1._id,
      duration: '3:39',
      trackNumber: 5,
         isPublished: true,
    },

    {
      title: 'Lavender Haze',
      album: album2._id,
      duration: '3:22',
      trackNumber: 1,
         isPublished: true,
    },
    {title: 'Maroon', album: album2._id, duration: '3:38', trackNumber: 2,    isPublished: true,},
    {title: 'Anti-Hero', album: album2._id, duration: '3:20', trackNumber: 3,    isPublished: true,},
    {
      title: 'Snow on the Beach',
      album: album2._id,
      duration: '4:16',
      trackNumber: 4,
         isPublished: true,
    },
    {
      title: 'You are on Your Own, Kid',
      album: album2._id,
      duration: '3:14',
      trackNumber: 5,
         isPublished: true,
    },

    {title: 'Alone Again', album: album3._id, duration: '4:10', trackNumber: 1,   isPublished: true,},
    {title: 'Too Late', album: album3._id, duration: '3:59', trackNumber: 2,   isPublished: true,},
    {
      title: 'Hardest to Love',
      album: album3._id,
      duration: '3:31',
      trackNumber: 3,
      isPublished: true,
    },
    {
      title: 'Scared to Live',
      album: album3._id,
      duration: '3:11',
      trackNumber: 4,
      isPublished: true,
    },
    {
      title: 'Blinding Lights',
      album: album3._id,
      duration: '3:20',
      trackNumber: 5,
      isPublished: true,
    },

    {title: 'Starboy', album: album4._id, duration: '3:50', trackNumber: 1,   isPublished: true,},
    {
      title: 'Party Monster',
      album: album4._id,
      duration: '4:09',
      trackNumber: 2,
      isPublished: true,
    },
    {title: 'False Alarm', album: album4._id, duration: '3:40', trackNumber: 3,    isPublished: true,},
    {title: 'Reminders', album: album4._id, duration: '3:51', trackNumber: 4,    isPublished: true,},
    {title: 'Rockin’', album: album4._id, duration: '3:52', trackNumber: 5,    isPublished: true,},

    {
      title: 'Unpublished 1',
      album: unpublishedAlbum._id,
      duration: '3:20',
      trackNumber: 1,
      isPublished: false,
    },
    {
      title: 'Unpublished 2',
      album: unpublishedAlbum._id,
      duration: '3:30',
      trackNumber: 2,
      isPublished: false,
    },
    {
      title: 'Unpublished 3',
      album: unpublishedAlbum._id,
      duration: '3:40',
      trackNumber: 3,
      isPublished: false,
    },
  ]);

  await User.create([
    {
      username: 'admin',
      password: '1234',
      role: 'admin',
      token: randomUUID(),
    },
    {
      username: 'user',
      password: '1234',
      role: 'user',
      token: randomUUID(),
    },
  ]);

  const admin = await User.findOne({
    username: 'admin'
  });

  if (admin) {
    await TrackHistory.create([
      {
        user: admin._id,
        track: track15._id,
        artist: artist2._id,
        datetime: new Date('2026-08-24T10:15:00.000Z'),
      },
      {
        user: admin._id,
        track: track2._id,
        artist: artist1._id,
        datetime: new Date('2026-08-24T11:30:00.000Z'),
      },
      {
        user: admin._id,
        track: track8._id,
        artist: artist1._id,
        datetime: new Date('2026-08-24T14:45:00.000Z'),
      },
    ]);
  }

  console.log('Fixtures populated!');
  await db.close();
};

run().catch(console.error);