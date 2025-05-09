"use client";
import React from 'react';
import { totalPage, currentPage } from '@/redux/features/displaySlice';
import { useSelector } from 'react-redux';
import { PageButton } from './Button';
import { Box } from '@mui/material';

const Pagination: React.FC = () => {
    const currentTotalPage = useSelector(totalPage);
    const currentPageNum = useSelector(currentPage);

    return (
        <Box sx={{ minWidth: 600 }}>
            <div className='pagination'>
                <PageButton tab="Prev" num={-1} />
                <span> {`${currentPageNum}/${currentTotalPage}`}</span>
                <PageButton tab="Next" num={1} />
            </div>
        </Box>
    )
}

export default Pagination;