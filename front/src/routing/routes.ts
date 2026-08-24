export const AppRoutes = {
  main: '/',
  albums: '/artists/:artistId',
  tracks: '/albums/:albumId',
  register: '/register',
  login: '/login',
  notFound: '*',
} as const;