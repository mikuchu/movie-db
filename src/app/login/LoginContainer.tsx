"use client"
import React, { useState, useEffect } from "react";
import { TextField, Box, Button } from '@mui/material';
import { login, getFavoriteMoviesList, getRatedMoviesList } from "@/lib/api";
import { Loading } from "@/components/layout/Loading";
import { isLogin, setLogin } from '@/redux/features/userSlice'
import { UserInfo } from "@/common/type";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';

const LoginContainer: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [loginError, setLoginError] = useState(false)
    const userLogin = useSelector(isLogin)
    const dispatch = useDispatch()
    const router = useRouter();

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const sumbitUserInfo = async () => {
        if (username.length === 0 || password.length === 0) {
            setError(true)
            return
        }
        setError(false)
        setLoading(true)

        const data: UserInfo | null = await login(username, password)

        if (data !== null) {
            const favorite = await getFavoriteMoviesList(String(data.accountId), data.sessionId);
            const rated = await getRatedMoviesList(String(data.accountId), data.sessionId);
            const payload = {
                isLogin: true,
                likeMoviesList: favorite,
                ratedMoviesList: rated,
                ...data,
            }
            dispatch(setLogin(payload))
            setLoginError(false)
        } else {
            setLoginError(true)
        }
        setLoading(false)
        setUsername("")
        setPassword("")
    }

    useEffect(() => {
        if (userLogin) {
            router.replace('/');
        }
    }, [userLogin, router]);

    if (loading) return <Loading />

    return (
        <>
            {loginError && <div className="font" style={{ paddingTop: "10px", color: "red" }}> Failed to login! </div>}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '50ch' }, display: "flex",
                    flexDirection: "column", alignItems: "center", paddingTop: "3rem"
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    error={error && username.length === 0}
                    helperText={error && username.length === 0 && "Username is required"}
                    label="UserName"
                    variant="filled"
                    onChange={handleUsername} />
                <TextField
                    error={error && password.length === 0}
                    helperText={error && password.length === 0 && "Password is required"}
                    label="Password"
                    variant="filled"
                    type="password"
                    onChange={handlePassword} />
                <Button variant="contained" onClick={sumbitUserInfo}> Submit </Button>

            </Box >
        </>
    )
}


export default LoginContainer