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
                className='bg-gradient-to-br from-sky-800 to-green-400
                hover:bg-gradient-to-bl rounded-lg px-5 py-1 my-4
                text-purple-50 border-2 border-purple-50
                shadow-sm shadow-purple-200 w-px-80'>Login with GitHub</button>
        </div>
    );
}

export default LoginScreen;