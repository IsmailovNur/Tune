export const AppRoutes = {
  main: '/',
  albums: '/artists/:artistId',
  tracks: '/albums/:albumId',
  register: '/register',
  notFound: '*',
} as const;