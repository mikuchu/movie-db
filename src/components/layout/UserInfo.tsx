"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button } from '@mui/material';
import { userName, setLogout, isLogin } from "@/redux/features/userSlice";

export const UserInfo: React.FC = () => {
    const [isClicked, setIsClicked] = useState(false);

    const dispatch = useDispatch();
    const userInfo = useSelector(userName);
    const login = useSelector(isLogin)
    const handleClick = () => {
        setIsClicked(!isClicked);
    };
    if (!login) return <></>
    return (
        !isClicked ?
            <span onClick={handleClick}>{userInfo}</span>
            :
            <Button onClick={() => {
                handleClick();
                dispatch(setLogout());
            }} variant="contained">Sign Out</Button>
    )
}