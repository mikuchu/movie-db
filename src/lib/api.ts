import { Movie, MoviesList, BASE_URL, API_KEY, UserInfo, MovieCard, MovieCard as MVCard, Bearer_TOKEN } from "@/common/type"


export const login = async (username: string, password: string): Promise<UserInfo | null> => {
    try {
        const getRequestToken = await fetch(
            `${BASE_URL}/authentication/token/new?api_key=${API_KEY}`,
            { method: 'GET' }
        );
        if (!getRequestToken.ok) return null;

        const requestTokenData = await getRequestToken.json();
        const requestToken = requestTokenData.request_token;

        const validateRequestToken = await fetch(
            `${BASE_URL}/authentication/token/validate_with_login?username=${username}&password=${password}&request_token=${requestToken}&api_key=${API_KEY}`,
            { method: 'POST' }
        );
        if (!validateRequestToken.ok) return null;


        const getSessionId = await fetch(
            `${BASE_URL}/authentication/session/new?request_token=${requestToken}&api_key=${API_KEY}`,
            { method: 'POST' }
        );
        if (!getSessionId.ok) return null;

        const sessionIdTokenData = await getSessionId.json();
        const sessionIdToken = sessionIdTokenData.session_id;

        const getAccountDetail = await fetch(
            `${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionIdToken}&api_key=${API_KEY}`,
            { method: 'GET' }
        );

        if (!getAccountDetail.ok) return null;


        const accountDetailData = await getAccountDetail.json();

        const userData: UserInfo = {
            username: accountDetailData.username,
            accountId: accountDetailData.id,
            sessionId: sessionIdToken,
            requestToken: requestToken
        }

        return userData;
    } catch {
        return null;
    }

}


export const getMovieDetailsById = async (id: string) => {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    return fetch(url, { method: 'GET' })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                console.error("Network response was not ok");
                return null
            }
        }).catch((error) => {
            console.error("Error fetching movies:", error);
            return null;
        })
}

export const getMoviesListByCategoryAndPage = async (page: number, select: string): Promise<MoviesList | null> => {
    const url = `${BASE_URL}/movie/${select}?page=${String(page)}&api_key=${API_KEY}`;
    return fetch(url, { method: 'GET' })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                console.error("Network response was not ok");
                return null
            }
        }).catch((error) => {
            console.error("Error fetching movies:", error);
            return null;
        })
}

export const getFavoriteMoviesList = async (accountId: string, sessionID: string) => {
    const url = `${BASE_URL}/account/${accountId}/favorite/movies?session_id=${sessionID}&api_key=${API_KEY}`;
    return fetch(url, { method: 'GET' })
        .then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                const l: MovieCard[] = data.results.map((m: Movie) => {
                    return {
                        title: m.title,
                        id: m.id,
                        poster_path: m.poster_path,
                        vote_average: m.vote_average,
                    }
                })
                return l;
            } else {
                console.error("Network response was not ok");
                return []
            }
        }).catch((error) => {
            console.error("Error fetching movies:", error);
            return [];
        })
}

export const getRatedMoviesList = async (accountId: string, sessionID: string): Promise<MovieCard[] | null> => {
    const url = `${BASE_URL}/account/${accountId}/rated/movies?session_id=${sessionID}&api_key=${API_KEY}`;
    return fetch(url, { method: 'GET' })
        .then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                const l: MovieCard[] = data.results.map((m: Movie) => {
                    return {
                        title: m.title,
                        id: m.id,
                        poster_path: m.poster_path,
                        vote_average: m.vote_average,
                        rating: m.rating
                    }
                })
                return l;
            } else {
                console.error("Network response was not ok");
                return []
            }
        }).catch((error) => {
            console.error("Error fetching movies:", error);
            return [];
        })
}

export const addMovieToFavorite = async (accountId: string | null, movieId: Movie | MVCard, sessionId: string | null, favorite: boolean): Promise<string> => {
    if (accountId === null || sessionId === null) return "ID Error";

    const url = `${BASE_URL}/account/${accountId}/favorite`;
    return fetch(url, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${Bearer_TOKEN}`
        },
        body: JSON.stringify({
            media_type: 'movie',
            media_id: movieId.id,
            favorite: Boolean(favorite)
        }),
    }).then(async (res) => {
        if (res.ok) {
            const data = await res.json();
            return data.status_message;
        } else {
            const error = await res.json();
            return `Error: ${error.status_message}`;
        }
    });

}
export const addMovieToRated = async (accountId: string | null, movieId: number, sessionId: string | null, rate: string) => {
    if (accountId === null || sessionId === null) return "ID Error";

    const url = `${BASE_URL}/movie/${movieId}/rating?session_id=${sessionId}`;
    return fetch(url, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${Bearer_TOKEN}`
        },
        body: JSON.stringify({
            value: rate
        }),
    }).then(async (res) => {
        if (res.ok) {
            const data = await res.json();
            return data.status_message;
        } else {
            const error = await res.json();
            return `Error: ${error.status_message}`;
        }
    });
}   