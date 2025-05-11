"use client"
import React from "react";
import { Grid, Box } from '@mui/material';
import { Movie, MovieCard as MVCard } from "@/common/type";
import MovieCard from "@/components/layout/MovieCard";

interface MoviesGridProps {
    moviesList: Movie[] | MVCard[];
}

const MoviesGrid: React.FC<MoviesGridProps> = (prop: MoviesGridProps) => {
    const mvLists: Movie[] | MVCard[] = prop.moviesList;
    return (
        <Box sx={{ minWidth: '100rem', width: '100%', p: 5, overflowX: 'auto' }}>
            <Grid container spacing={2} columns={4} >
                {mvLists.map((movie: Movie | MVCard, index) => (
                    <Grid size={1} key={index}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}


export default MoviesGrid;  
