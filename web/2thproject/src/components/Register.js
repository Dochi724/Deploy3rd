import React, { useState } from "react";
import axios from "axios" // 서버랑 통신하는거
import '../stylesheets/register.scss'; // css
const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordError, setPasswordError] = useState();
    const [email, setEmail] = useState('');
    const [favoritePlace, setFavoritePlace] = useState([]);
       
    const onNameChange = e => {
        setName(e.target.value)
        console.log(e.target.value)
    }
    const onEmailChange = e => {
        setEmail(e.target.value)
        console.log(e.target.value)
    }
    const onPasswordChange = e => {
        setPassword(e.target.value)
        console.log(e.target.value)
    }
    const onPasswordCheck = (a) => {
        if(password !== a){
            setPasswordError(true);
        }
        else{
            setPasswordError(false);
        }
    }

    const onPasswordConfirmChange = e => {
        setPasswordConfirm(e.target.value)
        onPasswordCheck(e.target.value)
    }

    const onFavoritePlaceChange = e => {

        let str = e.target.value
        let placeList = str.split(',')

        setFavoritePlace(e.target.value)
        console.log(e.target.value)
    } // 3개까지 검색해서 선택할 수 있게

    const onSubmit = (e) => { // 제출하면 이 입력한 정보
        e.preventDefault(); // 새로고침 안되게하는거
        axios.post('http://127.0.0.1:8000/account/signup/', { // 장고에 이 주소랑 통신해서 회원 가입함!! 형식은 POST
            username: name, // 장고 변수명: 넣어줄 우리 변수명 json형식!!!!
            password: password,
            email: email,
            favorite_place: favoritePlace 
        }) // 장고는 8000번, 리액트는 3000번 포트 사용 -> CORS 에러 생김!!!
        .then(response => console.log(response)) // 일단 서버 대답 받아와서 콘솔로 확인해봤음!!
        console.log('제출');
    }
    return (
        <div className = "register">
            <h1>회원가입</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={name} placeholder="이름" onChange={onNameChange} required/>
                <input type="email" value={email} placeholder="이메일" onChange={onEmailChange} required/>
                <input type="password" value={password} placeholder="비밀번호" onChange={onPasswordChange} required/>
                <input type="password" value={passwordConfirm} placeholder="비밀번호확인" onChange={onPasswordConfirmChange} required/>
                {passwordError && <p>비밀번호 틀림</p>}
                <input type="text" value={favoritePlace} placeholder="자주 찾는 장소" onChange={onFavoritePlaceChange} required/>
                <input type="submit" value="회원가입" />
            </form>
        </div>
    )
}

export default Register;

// 뭐 ? 상황1 : 상황2