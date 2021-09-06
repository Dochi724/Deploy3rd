import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onEmailChange = (e) => {
        console.log(e.target.value)
        setEmail(e.target.value);
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
        console.log(e)
    }
    return ( 
        <div>
            <input type="email" onChange={onEmailChange} value={email} />
            <input type="password" onChange={onPasswordChange} value={password} />
            <button>로그인</button>
        </div>
    )
}

export default Login;
{/* function Login() {}
const Login = () => {}
function Login(e) {}
const Login = (e) => {} */}