"use client"
import { useUserAuth } from "../_utils/auth-context";
import LoginForm from "../components/LoginForm";


const LoginScreen = () => {
    const { user, gitHubSignIn } = useUserAuth();

    function handleSignIn() {
        gitHubSignIn();
    };

    

    return (
        <div className="flex flex-col items-center bg-sky-800 rounded-md
            border-2 border-neutral-800 shadow-lg"> 
            
            <div className="flex space-x-2 bg-blue-500 px-2 pt-6 rounded-md
            border-2 border-purple-50 shadow-sm shadow-purple-200 m-4">
                <div className="flex-1">
                    <img src="/meeting1.jpg" alt="meeting" />
                    <a title="photo by fauxels - View on Pexels" target="_blank"
                    href="https://www.pexels.com/photo/positive-diverse-coworkers-chatting-and-sitting-at-table-with-laptop-4350093/">
                        <p className="text-gray-400 hover:text-gray-300">photo by Ketut Subiyanto</p>
                    </a>
                </div>

                <div className="flex-1">
                    <img src="/meeting3.jpg" alt="meeting" />
                    <a title="photo by fauxels - View on Pexels" target="_blank"
                    href="https://www.pexels.com/photo/group-of-friends-hanging-out-933964/">
                        <p className="text-gray-400 hover:text-gray-300">photo by Helena Lopes</p>
                    </a>
                </div>

                <div className="flex-1">
                    <img src="/meeting2.jpg" alt="meeting" />
                    <a title="photo by fauxels - View on Pexels" target="_blank"
                    href="https://www.pexels.com/photo/group-of-people-gathered-around-wooden-table-3184360/">
                        <p className="text-gray-400 hover:text-gray-300">Photo by fauxels</p>
                    </a>
                </div>

                <div className="flex-1">
                    <img src="/meeting4.jpg" alt="meeting" />
                    <a title="photo by fauxels - View on Pexels" target="_blank"
                    href="https://www.pexels.com/photo/group-of-people-having-a-meeting-on-a-restaurant-9543814/">
                        <p className="text-gray-400 hover:text-gray-300">Photo by Mikhail Nilov</p>
                    </a>
                </div>  
            </div>

            <h1 className="font-semibold text-purple-50 text-3xl">Welcome to MeetMoment!</h1>
            <p className="text-purple-100 text-lg w-2/3 text-center my-4">
                MeetMoment is a meeting scheduling app that finds common availability between 
                multiple people. Perfect for work, school projects, or coffee dates. Log in, 
                create meetings, add participants, and see common availability at a glance!
            </p>

            {/* TODO: Attempting to implement email/password sign in, cant get usernames to display.
            This is a *Nice to have*, will come back if theres time
            <LoginForm/> */}
            <button onClick={handleSignIn}
                className='bg-gradient-to-br from-sky-800 to-green-400
                hover:bg-gradient-to-bl rounded-lg px-5 py-1 my-4
                text-purple-50 border-2 border-purple-50
                shadow-sm shadow-purple-200 w-80'>Login with GitHub</button>
        </div>
    );
}

export default LoginScreen;