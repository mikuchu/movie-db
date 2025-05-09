import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store/store';
import { UserState, MovieCard, Movie } from "@/common/type"



const initialState: UserState =
{
    isLogin: false,
    userName: null,
    accountId: null,
    sessionId: null,
    requestToken: null,
    likeMoviesList: [],
    ratedMoviesList: []
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.isLogin = action.payload.isLogin;
            state.userName = action.payload.username;
            state.accountId = action.payload.accountId;
            state.sessionId = action.payload.sessionId;
            state.requestToken = action.payload.requestToken;
            state.likeMoviesList = action.payload.likeMoviesList
            state.ratedMoviesList = action.payload.ratedMoviesList
        },
        setLogout: (state) => {
            localStorage.clear();
            state.isLogin = false;
            state.userName = null;
            state.accountId = null;
            state.sessionId = null;
            state.requestToken = null;
            state.likeMoviesList = [];
            state.ratedMoviesList = [];
        },
        setLike: (state, action) => {
            const movieToToggleLike: Movie = action.payload;
            if (!movieToToggleLike || !movieToToggleLike.id) return;

            const index = state.likeMoviesList.findIndex(item => item.id === movieToToggleLike.id);
            const m: MovieCard = {
                title: movieToToggleLike.title,
                id: movieToToggleLike.id,
                poster_path: movieToToggleLike.poster_path,
                vote_average: String(movieToToggleLike.vote_average),
            }
            if (index === -1) {
                state.likeMoviesList = [...state.likeMoviesList, m]
            } else {
                const updatedList = state.likeMoviesList.filter(m => m.id !== movieToToggleLike.id);
                state.likeMoviesList = [...updatedList];
            }
        },
        setRate: (state, action) => {
            const movieToToggleRate: Movie = action.payload.movie;
            if (!movieToToggleRate) return;
            const index = state.ratedMoviesList.findIndex(item => item.id === movieToToggleRate.id);
            const m: MovieCard = {
                title: movieToToggleRate.title,
                id: movieToToggleRate.id,
                poster_path: movieToToggleRate.poster_path,
                vote_average: String(movieToToggleRate.vote_average),
                rating: action.payload.rate
            }
            if (index === -1) {
                state.ratedMoviesList = [...state.ratedMoviesList, m]
            } else {
                state.ratedMoviesList[index] = {
                    ...m,
                };
            }
        },

    },
});


export const { setLogin, setLogout, setLike, setRate } = userSlice.actions;
export const isLogin = (state: RootState) => state.user.isLogin
export const userName = (state: RootState) => state.user.userName
export const userID = (state: RootState) => state.user.accountId
export const userSessionID = (state: RootState) => state.user.sessionId
export const likeMoviesList = (state: RootState) => state.user.likeMoviesList
export const ratedMoviesList = (state: RootState) => state.user.ratedMoviesList

export default userSlice.reducer;