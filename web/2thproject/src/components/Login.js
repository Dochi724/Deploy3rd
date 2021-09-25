import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../stylesheets/login.scss'; 
import axios from "axios";
const Login = () => {
<<<<<<< HEAD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(e);
  };
  return (
    <div>
      <input type="email" onChange={onEmailChange} value={email} />
      <input type="password" onChange={onPasswordChange} value={password} />
      <button>로그인</button>
      <Link to="/register">회원가입</Link>
    </div>
  );
};
=======
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const onNameChange = (e) => {
        setName(e.target.value);
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault();
        // axios.post('http://127.0.0.1:8000/account/api-auth/login/', { // 장고에 이 주소랑 통신해서 회원 가입함!! 형식은 POST
        //     username: name,
        //     password: password,
        // }) 
        // .then(response => console.log(response)) // 일단 서버 대답 받아와서 콘솔로 확인해봤음!!
        // console.log('제출');
    }

    return ( 
        <div id = "login" onSubmit={onSubmit}>
            <div id = "just-login-div">
                <h1>로고</h1>
                <form onSubmit={onSubmit}>
                    <input type="text" className="login-input" onChange={onNameChange} value={name} placeholder="name" />
                    <input type="password" className="login-input" onChange={onPasswordChange} value={password} placeholder="password"/>
                    <div id="find-field">
                        <Link to ="/login">아이디 찾기</Link>
                        <Link to ="/login">비밀번호 찾기</Link>
                    </div>
                    <input type="submit" value = "로그인" className="login-button"/>
                    </form>
                    <div id="just-login-or-register">
                        <div className="just-login-line-div">
                            <div className="just-login-or-register-line" />
                        </div>
                        <p>또는</p>
                        <div className="just-login-line-div">
                            <div className="just-login-or-register-line" />
                        </div>
                    </div>
                    <Link to="/register"><button className = "register-button">회원가입</button></Link>
            </div>
        </div>
    )
}
>>>>>>> dc4047dc26ac9aa59100ff011fffe8f348c51ce5

export default Login;
/* function Login() {}
const Login = () => {}
function Login(e) {}
const Login = (e) => {} */
