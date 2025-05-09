"use client"
import Image from "next/image";
import React from "react";
import { useSelector } from 'react-redux';
import { isLogin } from "@/redux/features/userSlice";
import { TabButton, LoginButton } from "@/components/layout/Button";
import { UserInfo } from "@/components/layout/UserInfo";
import { Home, Favorite, Rated } from "@/common/type";

const Header: React.FC = () => {
    const loginInfo = useSelector(isLogin);
    return (
        <div className="header">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div><Image src="/logo.svg" alt="Logo" width={100} height={100} /></div>
                <span style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0px 5rem" }}>
                    <TabButton tab={Home.display} nav={Home.api} />
                    <TabButton tab={Favorite.display} nav={Favorite.api} />
                    <TabButton tab={Rated.display} nav={Rated.api} />
                </span>
            </div>

            {!loginInfo ? <LoginButton tab="Login" nav="/login" /> : <UserInfo />
            }

        </div>
    )
}

export default Header;