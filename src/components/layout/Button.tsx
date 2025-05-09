import Link from 'next/link';
import React from "react";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTab, setCurrentPage } from "@/redux/features/displaySlice";
import { isLogin } from '@/redux/features/userSlice';

interface TabButtonProps {
    tab: string;
    nav: string;
}

interface PageButtonProps {
    tab: string;
    num: number;
}
export const TabButton: React.FC<TabButtonProps> = (prop: TabButtonProps) => {
    const { tab, nav } = prop;
    const dispatch = useDispatch();
    return (
        <Link href={`${nav}`} >
            <Button style={{ fontSize: "1.5rem" }} onClick={() => dispatch(setCurrentTab(tab))} variant="text">{tab}</Button>
        </Link >
    )
}

export const LoginButton: React.FC<TabButtonProps> = (prop: TabButtonProps) => {
    const { tab, nav } = prop;
    const login = useSelector(isLogin)
    if (login) return <></>
    return (
        <Link href={`${nav}`} >
            <Button variant="contained">{tab}</Button>
        </Link >
    )
}

export const PageButton: React.FC<PageButtonProps> = (prop: PageButtonProps) => {
    const { tab, num } = prop;
    const dispatch = useDispatch();
    return (
        <Button variant="outlined" onClick={() => dispatch(setCurrentPage(num))}> {tab} </Button>
    )
}
