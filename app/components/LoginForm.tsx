import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { emailSignIn } = useUserAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await emailSignIn(email, password);
      } catch (err) {
        console.log(err.message);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit"
            className='bg-gradient-to-br from-sky-800 to-green-400
            hover:bg-gradient-to-bl rounded-lg px-5 py-1 my-4
            text-purple-50 border-2 border-purple-50
            shadow-sm shadow-purple-200'>
                Login
        </button>
      </form>
    );
  };
  
  export default LoginForm;