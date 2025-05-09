"use client";
import React, { useState, useEffect } from 'react';
import { getMovieDetailsById } from '@/lib/api';
import { MovieDetail as MD } from '@/common/type';
import MovieDetailCard from './MovieDetailCard';
import { Loading } from '@/components/layout/Loading';

type MovieDetailProps = {
    id: string;
}

const MovieDetail: React.FC<MovieDetailProps> = (prop: MovieDetailProps) => {
    const { id } = prop;
    const [movieDetails, setMovieDetails] = useState<MD | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let movie: MD | null = null;
        async function fetchMovieDetails() {
            const data = await getMovieDetailsById(id);
            if (data) movie = data
            setMovieDetails(movie);
            setLoading(false);
        }
        fetchMovieDetails()
    }, [id]);
    if (loading) {
        return <Loading />;
    }
    return (
        movieDetails ?
            <MovieDetailCard movie={movieDetails} />:
            <div style={{ flex: "flex", textAlign: "center", padding: "2rem" }}>  Unable to find Movie Detail By given ID </div>
    );
}

export default MovieDetail;