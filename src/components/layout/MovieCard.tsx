"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { Movie, IMG_SRC_BASE, MovieCard as MVCard } from "@/common/type";
import { isLogin, likeMoviesList, setLike, userID, userSessionID } from "@/redux/features/userSlice";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import { FaRegHeart, FaStar, FaHeart } from "react-icons/fa";
import { addMovieToFavorite } from "@/lib/api";
interface MoviesCardProps {
    movie: Movie | MVCard;
}

const MovieCard: React.FC<MoviesCardProps> = (prop: MoviesCardProps) => {
    const { movie } = prop;
    const dispatch = useDispatch();
    const likeMovies = useSelector(likeMoviesList);
    const login = useSelector(isLogin);
    const accountId = useSelector(userID)
    const sessionId = useSelector(userSessionID)
    const like = Boolean(login && likeMovies.find(m => m.id === movie.id))

    const handleIsLike = async (movie: Movie | MVCard) => {
        dispatch(setLike(movie));
        await addMovieToFavorite(accountId, movie, sessionId, !like);
    }
    return (
        <Card sx={{ maxWidth: 345, minWidth: 345 }}>
            <div style={{ position: 'relative', width: '100%', height: '500px' }}>
                <Image src={`${IMG_SRC_BASE}${movie.poster_path}`} alt="poster" fill style={{ objectFit: 'cover' }} />
            </div>
            <CardContent style={{ flex: "flex", textAlign: "center" }}>
                <Typography gutterBottom variant="h5" component="div">
                    <Link href={`/movies/${movie.id}`}> {movie.title} </Link>
                </Typography>
            </CardContent>
            <CardActions>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: '100%', padding: '0 16px' }}>
                    <span style={{ display: "flex", alignItems: "center" }}>
                        <FaStar size={30} style={{ color: "rgb(245, 197, 24)", marginRight: "5px" }} />
                        <span style={{ padding: "1rem", textAlign: "center" }}>{movie.vote_average}{movie.rating ? ` / ${movie.rating}` : ""} </span>
                    </span>
                    <span onClick={async () => login && handleIsLike(movie)}>
                        {like ? <FaHeart size={30} style={{ color: "red", marginRight: "5px" }} /> : <FaRegHeart size={30} style={{ marginRight: "5px" }} />}
                    </span>
                </Box>
            </CardActions>
        </Card >
    )
}

export default MovieCard;