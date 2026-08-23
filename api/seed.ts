import mongoose from 'mongoose';
import config from './config';
import { Artist } from './models/Artist';
import { Album } from './models/Album';
import { Track } from './models/Track';

const run = async () => {
  await mongoose.connect(config.mongoDbUrl);
  const db = mongoose.connection;

  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
  } catch {
    console.log('Collection were not present, skipping drop!');
  }

  const [artist1, artist2] = await Artist.create([
    {
      name: 'Taylor Swift',
      information: 'American singer-songwriter',
      image: 'images/Taylor_Swift.webp'
    },

    {
      name: 'The Weeknd',
      information: 'Canadian singer-songwriter',
      image: 'images/The_Weeknd.jpg'
    },
  ]);

  const [album1, album2, album3, album4] = await Album.create([
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
  ]);

  await Track.create([
    {
      title: 'Welcome to New York',
      album: album1._id,
      duration: '3:32',
      trackNumber: 1
    },

    {title: 'Blank Space', album: album1._id, duration: '3:51', trackNumber: 2},
    {title: 'Style', album: album1._id, duration: '3:51', trackNumber: 3},

    {
      title: 'Out of the Woods',
      album: album1._id,
      duration: '3:55',
      trackNumber: 4
    },

    {
      title: 'Shake It Off',
      album: album1._id,
      duration: '3:39',
      trackNumber: 5
    },

    {
      title: 'Lavender Haze',
      album: album2._id,
      duration: '3:22',
      trackNumber: 1
    },

    {title: 'Maroon', album: album2._id, duration: '3:38', trackNumber: 2},
    {title: 'Anti-Hero', album: album2._id, duration: '3:20', trackNumber: 3},

    {
      title: 'Snow on the Beach',
      album: album2._id,
      duration: '4:16',
      trackNumber: 4
    },

    {
      title: 'You are on Your Own, Kid',
      album: album2._id,
      duration: '3:14',
      trackNumber: 5
    },

    {title: 'Alone Again', album: album3._id, duration: '4:10', trackNumber: 1},
    {title: 'Too Late', album: album3._id, duration: '3:59', trackNumber: 2},

    {
      title: 'Hardest to Love',
      album: album3._id,
      duration: '3:31',
      trackNumber: 3
    },

    {
      title: 'Scared to Live',
      album: album3._id,
      duration: '3:11',
      trackNumber: 4
    },

    {
      title: 'Blinding Lights',
      album: album3._id,
      duration: '3:20',
      trackNumber: 5
    },

    {title: 'Starboy', album: album4._id, duration: '3:50', trackNumber: 1},

    {
      title: 'Party Monster',
      album: album4._id,
      duration: '4:09',
      trackNumber: 2
    },

    {title: 'False Alarm', album: album4._id, duration: '3:40', trackNumber: 3},
    {title: 'Reminders', album: album4._id, duration: '3:51', trackNumber: 4},
    {title: 'Rockin’', album: album4._id, duration: '3:52', trackNumber: 5},
  ]);

  console.log('Fixtures populated!');
  await db.close();
};

run().catch(console.error);