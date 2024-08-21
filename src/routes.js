import { GenreMoviesPage, Home, MoviePage, Page404 } from "./pages";

const routes = [
    {
        id: 1,
        path: "/",
        Element: <Home/>
    },
    {
        id: 2,
        path: "/movie_page",
        Element: <MoviePage/>
    },
    {
        id: 3,
        path: "/genre_movies",
        Element: <GenreMoviesPage/>
    },
    {
        id: 4,
        path: "*",
        Element: <Page404/>
    }
];

export default routes;