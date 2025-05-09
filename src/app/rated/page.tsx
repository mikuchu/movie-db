"use client";
import { ratedMoviesList } from "@/redux/features/userSlice";
import { useSelector } from "react-redux";
import MovieGrid from '@/components/layout/HomeMoviesGrid';
import { MovieCard } from "@/common/type";
export default function RatedPage() {
    const rateList: MovieCard[] = useSelector(ratedMoviesList)
    return (
        <>
            <h1 className="font">RatePage</h1>
            <MovieGrid moviesList={rateList} />
        </>
    );
}