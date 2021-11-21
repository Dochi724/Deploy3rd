import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../stylesheets/login.scss'; 
import { useHistory } from "react-router";
import axios from "axios";
const Login = () => {
    const history = useHistory();
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
        axios.post('http://127.0.0.1:8000/account/login/', { // 장고에 이 주소랑 통신해서 회원 가입함!! 형식은 POST
            username: name,
            password: password,
        }) 
        .then(response => {
            console.log(response)
            if(response.data.success) {
                sessionStorage.setItem('user', name);
                history.push('/');
            }
            else {
                alert('로그인 실패!');
            }
        }) // 일단 서버 대답 받아와서 콘솔로 확인해봤음!!
    
    }
    const onSuperClick = () => {
        sessionStorage.setItem('user', "개발자");
        axios.post('http://127.0.0.1:8000/account/login/', { // 장고에 이 주소랑 통신해서 회원 가입함!! 형식은 POST
            username: "개발자",
            password: 123456,
        }) 
        .then (response => {
            console.log(response)
            if(response.data.success) {
                history.push('/');
            }
        });
        //history.push('/');
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
                <button onClick={onSuperClick}>개발자 모드</button>
            </div>
        </div>
    )
}


export default Login;
/* function Login() {}
const Login = () => {}
function Login(e) {}
const Login = (e) => {} */
