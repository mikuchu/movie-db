import { createSlice } from '@reduxjs/toolkit';
import {DisplayState} from "@/common/type"
import { RootState } from '@/redux/store/store';
import { Home, NowPlaying } from "@/common/type"

const initialState:DisplayState = {
    homePageCache: {},
    totalPage:1,
    currentPage:1,
    currentTab: Home.display, 
    currentSelect: NowPlaying.api,
}

export const displaySlice = createSlice({
    name: 'display',
    initialState,
    reducers: {
        setCurrentTab: (state, action) => {
            state.currentTab = action.payload;
        },
        setTotalPage: (state, action) => {
            state.totalPage = action.payload;
        },

        resetCurrentPage: (state) => {
            state.currentPage = 1;
        },
        setCurrentPage: (state, action) => {
            const temp = state.currentPage + action.payload;
            if (temp < 1 || temp > state.totalPage) return;
            state.currentPage += action.payload; 
        },
        setCurrentSelect: (state, action) => {
            state.currentSelect = action.payload;
        },
        setHomePageCache: (state, action) => {
           state.homePageCache = {...state.homePageCache, [`${state.currentSelect}_${action.payload.page}`]: action.payload };
        }
    },
});


export const {setCurrentTab, setTotalPage, setCurrentPage, setCurrentSelect, setHomePageCache,resetCurrentPage } = displaySlice.actions;

export const totalPage = (state:RootState) => state.display.totalPage;
export const currentPage = (state:RootState) => state.display.currentPage;
export const currentSelect = (state:RootState) => state.display.currentSelect;
export const currentTab = (state:RootState) => state.display.currentTab;
export const homePageCache = (state:RootState) => state.display.homePageCache;
export default displaySlice.reducer;
