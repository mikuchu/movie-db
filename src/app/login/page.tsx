"use server";
import LoginContainer
    from "./LoginContainer";
export default async function LoginPage() {
    return (
        <>
            <h1 className="font">LoginPage</h1>
            <LoginContainer />
        </>
    );
}