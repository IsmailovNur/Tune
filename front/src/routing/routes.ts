export const AppRoutes = {
  main: '/',
  albums: '/artists/:artistId',
  tracks: '/albums/:albumId',
  register: '/register',
  login: '/login',
  trackHistory: '/track_history',
  notFound: '*',
} as const;