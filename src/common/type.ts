
export const Home = {
    display: "Home",
    api: "/",
}
export const Favorite = {
    display: "Favorite",
    api: "/favorite",
}
export const Rated = {
    display: "Rated",
    api: "/rated",
}

export const Popular = {
    display: "Popular",
    api: "popular",
}

export const TopRated = {
    display: "Top Rated",
    api: "top_rated",
}
export const Upcoming = {
    display: "Upcoming",
    api: "upcoming",
}
export const NowPlaying = {
    display: "Now Playing",
    api: "now_playing",
}

export type MovieCard = {
    title: string,
    id: number,
    poster_path: string,
    vote_average: string,
    rating?: number,
}
export type MovieDetail = {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: string,
    budget: number,
    genres: {
        id: number,
        name: string
    }[],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: {
        id: number,
        logo_path: string,
        name: string,
        origin_country: string
    }[],
    production_countries: {
        iso_3166_1: string,
        name: string
    }[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: {
        english_name: string,
        iso_639_1: string,
        name: string
    }[],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export type Movie = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    rating?: number,
}

export type MoviesList = {
    dates: {
        maximum: string,
        minimum: string,
    }
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number,
}

export interface DisplayState {
    homePageCache: { [key: string]: MoviesList }
    totalPage: number;
    currentPage: number;
    currentTab: string;
    currentSelect: string;
}

export type UserInfo = {
    username: string;
    accountId: number;
    sessionId: string;
    requestToken: string;
}
export type UserState = {
    isLogin: boolean,
    userName: string | null;
    accountId: string | null;
    sessionId: string | null;
    requestToken: string | null;
    likeMoviesList: MovieCard[],
    ratedMoviesList: MovieCard[],
}





export const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_SRC_BASE = `https://image.tmdb.org/t/p/w500`;
export const API_KEY = "62db472545f5819db7f11785b7d76cf0";
export const Bearer_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MmRiNDcyNTQ1ZjU4MTlkYjdmMTE3ODViN2Q3NmNmMCIsIm5iZiI6MTc0NTM0MDE3OC43MSwic3ViIjoiNjgwN2M3MTJjNWM4MDM1ZmIwOGE3N2ZjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.X22HHClPADJYBwdPD2WKKqw2W3EJ7bmLfqCKSXelQlY"