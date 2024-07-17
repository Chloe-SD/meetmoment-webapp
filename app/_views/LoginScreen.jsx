"use client"
import { useUserAuth } from "../_utils/auth-context";


const LoginScreen = () => {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    function handleSignIn() {
        gitHubSignIn();
    };

    

    return (
        <div>
            <button onClick={handleSignIn}>Login with GitHub</button>
        </div>
    );
}

export default LoginScreen;