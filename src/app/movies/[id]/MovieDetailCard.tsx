"use client"
import { Card, Box, CardContent, Typography, Select, MenuItem, SelectChangeEvent, Button, FormControl, InputLabel } from '@mui/material';
import { MovieDetail as MD, IMG_SRC_BASE } from '@/common/type';
import Image from 'next/image';
import { FaStar } from "react-icons/fa";
import React, { useState, useMemo } from 'react';
import { isLogin, userID, userSessionID, setRate as userSetRate, ratedMoviesList } from '@/redux/features/userSlice'
import { useSelector, useDispatch } from 'react-redux';
import { addMovieToRated } from '@/lib/api';

const MovieDetailCard: React.FC<{ movie: MD }> = ({ movie }) => {
    const [rate, setRate] = useState("1")
    const numbers = useMemo(() => { return Array.from({ length: 10 }, (_, i) => i + 1); }, []);
    const login = useSelector(isLogin)
    const accountId = useSelector(userID)
    const sessionId = useSelector(userSessionID)
    const rateList = useSelector(ratedMoviesList);
    const dispatch = useDispatch()
    let rating = "Not Yet"
    const handleRate = (event: SelectChangeEvent) => {
        setRate(event.target.value);
    };

    const handleSubmitRate = async (movie: MD) => {
        const payload = {
            movie,
            rate
        }
        dispatch(userSetRate(payload))
        await addMovieToRated(accountId, movie.id, sessionId, rate)

    }

    if (login) {
        const isRate = rateList.find(m => m.id === movie.id);
        if (isRate !== undefined && isRate.rating !== undefined) rating = String(isRate.rating)
    }

    return (
        <Card sx={{ width: "90%", display: 'flex', margin: '2rem' }}>
            <div style={{ position: 'relative', width: '100%' }}>
                <Image src={`${IMG_SRC_BASE}${movie.poster_path}`} alt="poster" fill style={{ objectFit: 'contain' }} />
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0 1rem' }}>
                <CardContent sx={{ flex: '4 0 auto' }}>
                    <Typography component="div" variant="h3" sx={{ textAlign: 'center' }}>
                        {movie.title}
                    </Typography>

                    <Typography component="div" variant="h5" >
                        Release date:
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{ padding: '1rem', color: 'text.secondary' }}>
                        {movie.release_date}
                    </Typography>

                    <Typography component="div" variant="h5" >
                        Overview:
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{ padding: '1rem', color: 'text.secondary' }}>
                        {movie.overview}
                    </Typography>


                    <Typography component="div" variant="h5" >
                        Genres:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.5rem' }}>
                        {movie.genres.map((c, index) =>
                            <Box key={index} className="genres"> {c.name}</Box>
                        )}
                    </Box>

                    <Typography component="div" variant="h5" >
                        Average Rating:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.5rem' }}>
                        <FaStar size={30} style={{ color: "rgb(245, 197, 24)", marginRight: "5px" }} />
                        <Typography variant="subtitle1" component="div" sx={{ padding: '0.5rem', color: 'text.secondary' }}>
                            {movie.vote_average}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography component="div" variant="h5" >
                            Your Rating:
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{ paddingLeft: '25px', paddingTop: '6px', color: 'text.secondary' }}>
                            {rating}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <FormControl sx={{ minWidth: 120 }} disabled={!login}>
                            <InputLabel >Rate</InputLabel>
                            <Select
                                id="rate-select"
                                value={rate}
                                label="Rate"
                                onChange={handleRate}
                            >
                                {numbers.map(number =>
                                    <MenuItem key={number} value={String(number)}>
                                        {number}
                                    </MenuItem>)}
                            </Select>
                        </FormControl>
                        <Button
                            variant="outlined"
                            sx={{ margin: '25px' }}
                            onClick={() => login && handleSubmitRate(movie)}
                        >
                            Rate It!
                        </Button>
                    </Box>


                    <Typography component="div" variant="h5" >
                        Production Companies:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {movie.production_companies.map((c, index) =>
                            <Box key={index} sx={{ padding: '0.5rem' }}>
                                <Image src={`${IMG_SRC_BASE}${c.logo_path}`} alt="poster" width={40} height={40} />
                                <Typography variant="subtitle1" component="div" sx={{ color: 'text.secondary' }}>
                                    {c.name}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Box >
        </Card >
    );
}

export default MovieDetailCard;