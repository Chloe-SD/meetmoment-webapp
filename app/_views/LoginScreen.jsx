"use client"
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Image from "next/image";


const LoginScreen = () => {
    const { user, gitHubSignIn } = useUserAuth();
    const [emailLogin, setEmailLogin] = useState(false);
    const [register, setRegister] = useState(false);

    function handleSignIn() {
        setEmailLogin(false);
        setRegister(false);
        gitHubSignIn();
    };

    function handleEmailLogin() {
        setRegister(false);
        setEmailLogin(true);
    }

    function handleRegister() {
        setEmailLogin(false);
        setRegister(true);
    }

    

    return (
        <div className="flex flex-col items-center bg-sky-800 rounded-md
            border-2 border-neutral-800 shadow-lg"> 
            
            <div className="flex space-x-2 bg-blue-500 px-2 pt-6 rounded-md
            border-2 border-purple-50 shadow-sm shadow-purple-200 m-4">
                <div className="flex-1">
                    <Image src="/meeting1.jpg" alt="meeting" width={500} height={300}/>
                    <a title="photo by fauxels - View on Pexels" target="_blank"
                    href="https://www.pexels.com/photo/positive-diverse-coworkers-chatting-and-sitting-at-table-with-laptop-4350093/">
                        <p className="text-gray-400 hover:text-gray-300">photo by Ketut Subiyanto</p>
                    </a>
                </div>

                <div className="flex-1">
                    <Image src="/meeting3.jpg" alt="meeting" width={500} height={300}/>
                    <a title="photo by fauxels - View on Pexels" target="_blank"
                    href="https://www.pexels.com/photo/group-of-friends-hanging-out-933964/">
                        <p className="text-gray-400 hover:text-gray-300">photo by Helena Lopes</p>
                    </a>
                </div>

                <div className="flex-1">
                    <Image src="/meeting2.jpg" alt="meeting" width={500} height={300}/>
                    <a title="photo by fauxels - View on Pexels" target="_blank"
                    href="https://www.pexels.com/photo/group-of-people-gathered-around-wooden-table-3184360/">
                        <p className="text-gray-400 hover:text-gray-300">Photo by fauxels</p>
                    </a>
                </div>

                <div className="flex-1">
                    <Image src="/meeting4.jpg" alt="meeting" width={500} height={300}/>
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

            
            <div className="flex items-center space-x-8 mb-4">
                <div className="flex flex-col">
                    <button onClick={handleEmailLogin}
                        className='bg-gradient-to-br from-sky-800 to-green-400
                        hover:bg-gradient-to-bl rounded-lg px-5 py-1 mb-4
                        text-purple-50 border-2 border-purple-50
                        shadow-sm shadow-purple-200 w-80'>Login with Email</button>
                    <button onClick={handleSignIn}
                        className='bg-gray-600
                        hover:bg-gray-700 rounded-lg px-5 py-1 mb-8
                        text-purple-50 border-2 border-purple-50
                        shadow-sm shadow-purple-200 w-80'>Login with GitHub</button>
                    <button onClick={handleRegister}
                        className='bg-gradient-to-br from-sky-800 to-green-400
                        hover:bg-gradient-to-bl rounded-lg px-5 py-1 mb-4
                        text-purple-50 border-2 border-purple-50
                        shadow-sm shadow-purple-200 w-80'>Register new account</button>
                </div>
                {emailLogin? ( <LoginForm/> ): null }
                {register? ( <RegisterForm/> ) : null }
            </div>
            
            
        </div>
    );
}

export default LoginScreen;