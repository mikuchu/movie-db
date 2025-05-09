"use client";

import { useSelector } from 'react-redux';
import { likeMoviesList } from "@/redux/features/userSlice";
import MovieGrid from '@/components/layout/HomeMoviesGrid';
import { MovieCard } from '@/common/type'

export default function FavoritePage() {
    const mvlist: MovieCard[] = useSelector(likeMoviesList)
    return (
        <>
            <h1 className='font' > FavoritePage</h1 >
            <MovieGrid moviesList={mvlist} />
        </>
    );
}