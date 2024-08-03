import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const { emailSignUp } = useUserAuth();
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await emailSignUp(email, password, userName);
      } catch (err) {
        console.log(err.message);
      }
    };

  
    return (
      <form onSubmit={handleSubmit} className="border-2 border-purple-50 p-4
      flex flex-col justify-center items-center rounded-md bg-blue-500
      shadow-sm shadow-purple-200">
        <input
          className="mb-2 rounded-md p-2 border-2 border-neutral-800"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="mb-2 rounded-md p-2 border-2 border-neutral-800"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
        />
        <input
          className="mb-2 rounded-md p-2 border-2 border-neutral-800"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        
        <button type="submit"
            className='bg-gradient-to-br from-sky-800 to-green-400
            hover:bg-gradient-to-bl rounded-lg px-5 py-1 mt-4
            text-purple-50 border-2 border-purple-50
            shadow-sm shadow-purple-200'>
                Register account
        </button>

      </form>
    );
  };
  
  export default RegisterForm;