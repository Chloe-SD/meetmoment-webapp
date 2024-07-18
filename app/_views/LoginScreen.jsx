"use client"
import { useUserAuth } from "../_utils/auth-context";


const LoginScreen = () => {
    const { user, gitHubSignIn } = useUserAuth();

    function handleSignIn() {
        gitHubSignIn();
    };

    

    return (
        <div className="flex flex-col items-center">
            <h1 className="font-semibold">Welcome to the MeetMoment Scheduling application!</h1>
            <button onClick={handleSignIn}
            className="w-80">Login with GitHub</button>
        </div>
    );
}

export default LoginScreen;