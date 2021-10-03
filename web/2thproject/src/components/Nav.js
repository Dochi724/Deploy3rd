import axios from "axios";
import React from "react";
import { Route, Link } from "react-router-dom";
import '../stylesheets/nav.scss'; 
import { useHistory } from "react-router";
const Nav = () => {
  const history = useHistory();
  const onLogoutClick = () => {
    // 로그아웃
  }
  const onWriteClick = () => {
    history.push('/write');
  }
  return (
    <div id = "nav">
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/ranking">RANKING</Link>
        </li>
        <li>
          <Link to="/profile">MY PAGE</Link>
        </li>
        <li id = "nav-button-border">
          <button id = "nav-write-button" onClick = {onWriteClick}>글쓰기</button>
        </li>
        <li>
          <button onClick = {onLogoutClick}>LOGOUT</button>
        </li>
      </ul>

    </div>
  );
};

export default Nav;
