import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes.ts";
import { MainLayout } from "../pages/MainLayout/MainLayout.tsx";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage.tsx";
import { ArtistsPage } from "../pages/ArtistsPage/ArtistsPage.tsx";
import { AlbumsPage } from "../pages/AlbumsPage/AlbumsPage.tsx";
import { TracksPage } from "../pages/TracksPage/TracksPage.tsx";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage.tsx";

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
        path: AppRoutes.register,
        element: <RegisterPage />,
      },
      {
        path: AppRoutes.notFound,
        element: <NotFoundPage />
      }
    ],
  },
]);
