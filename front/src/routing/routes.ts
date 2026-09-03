export const AppRoutes = {
  main: '/',
  albums: '/artists/:artistId',
  tracks: '/albums/:albumId',

  createArtist: '/artists/new',
  createAlbum: '/albums/new',
  createTrack: '/tracks/new',

  register: '/register',
  login: '/login',
  trackHistory: '/track_history',

  notFound: '*',
} as const;