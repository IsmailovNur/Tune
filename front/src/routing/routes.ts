export const AppRoutes = {
  main: '/',
  albums: '/artists/:artistId',
  tracks: '/albums/:albumId',
  notFound: '*',
} as const;