import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleRegister } from "../utils/resource";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() && password.trim() && email.trim()) {
            console.log(email, username, password);
            setPassword("");
            setUsername("");
            setEmail("");
           // window.location.href = "https://signup.live.com/signup?lcid=1033&wa=wsignin1.0&rpsnv=19&ct=1704674045&rver=7.0.6738.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26signup%3d1%26cobrandid%3dab0455a0-8d03-46b9-b18b-df2f57b9e44c%26RpsCsrfState%3de92005fb-e3b3-b1c4-18aa-7f891ca2f276&id=292841&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=ab0455a0-8d03-46b9-b18b-df2f57b9e44c&lic=1&uaid=c060bbccbd9d416aa66f7eb4841161e9";

        }
    };

    return (
        <main className='signup'>
            <form className='signup__form' onSubmit={handleSubmit}>
                <h2 className='signup__title'>Create an account</h2>
                <label htmlFor='email'>Email Address</label>
                <input
                    id='email'
                    name='email'
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='username'>Username</label>
                <input
                    id='username'
                    name='username'
                    required
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    type='password'
                    name='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='signupButton'>REGISTER</button>
                <p style={{ textAlign: "center", marginTop: "30px" }}>
                    Already have an account?{" "}
                    <Link className='link' to='/'>
                        Sign in
                    </Link>
                </p>
            </form>
        </main>
    );
};

export default Signup;