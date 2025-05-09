"use client";
import React from 'react';
import { setCurrentSelect, currentSelect, resetCurrentPage } from '@/redux/features/displaySlice';
import { useSelector, useDispatch } from 'react-redux';
import { Popular, TopRated, Upcoming, NowPlaying } from '@/common/type';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';

const Pagination: React.FC = () => {
    const select = useSelector(currentSelect);
    const dispatch = useDispatch();
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                    value={select}
                    label="Category"
                    onChange={(e: SelectChangeEvent) => {
                        dispatch(setCurrentSelect(e.target.value))
                        dispatch(resetCurrentPage())
                    }}
                >
                    <MenuItem value={Popular.api}>{Popular.display}</MenuItem>
                    <MenuItem value={TopRated.api}>{TopRated.display}</MenuItem>
                    <MenuItem value={Upcoming.api}>{Upcoming.display}</MenuItem>
                    <MenuItem value={NowPlaying.api}>{NowPlaying.display}</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default Pagination;