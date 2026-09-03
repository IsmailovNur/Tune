import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes.ts";
import { MainLayout } from "../pages/MainLayout/MainLayout.tsx";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage.tsx";
import { ArtistsPage } from "../pages/ArtistsPage/ArtistsPage.tsx";
import { AlbumsPage } from "../pages/AlbumsPage/AlbumsPage.tsx";
import { TracksPage } from "../pages/TracksPage/TracksPage.tsx";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage.tsx";
import { LoginPage } from "../pages/LoginPage/LoginPage.tsx";
import {
  TrackHistoryPage
} from "../pages/TrackHistoryPage/TrackHistoryPage.tsx";
import {
  CreateArtistPage
} from "../pages/CreateArtistPage/CreateArtistPage.tsx";
import { CreateAlbumPage } from "../pages/CreateAlbumPage/CreateAlbumPage.tsx";
import { CreateTrackPage } from "../pages/CreateTrackPage/CreateTrackPage.tsx";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: AppRoutes.main,
        element: <ArtistsPage />,
      },
      {
        path: AppRoutes.albums,
        element: <AlbumsPage />,
      },
      {
        path: AppRoutes.tracks,
        element: <TracksPage />,
      },
      {
        path: AppRoutes.trackHistory,
        element: <TrackHistoryPage />,
      },


      {
        path: AppRoutes.createArtist,
        element: <CreateArtistPage />,
      },

      {
        path: AppRoutes.createAlbum,
        element: <CreateAlbumPage />,
      },

      {
        path: AppRoutes.createTrack,
        element: <CreateTrackPage />,
      },

      {
        path: AppRoutes.register,
        element: <RegisterPage />,
      },
      {
        path: AppRoutes.login,
        element: <LoginPage />,
      },
      {
        path: AppRoutes.notFound,
        element: <NotFoundPage />
      }
    ],
  },
]);
