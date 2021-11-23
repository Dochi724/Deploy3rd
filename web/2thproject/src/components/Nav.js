import axios from "axios";
import React from "react";
import { Route, Link, NavLink } from "react-router-dom";
import '../stylesheets/nav.scss'; 
import { useHistory } from "react-router";
const Nav = () => {
  const history = useHistory();
  const onLogoutClick = () => {
    sessionStorage.clear();
    window.location.reload();
    // 로그아웃
  }
  const onWriteClick = () => {
    history.push('/write');
  }
  return (
    <div id = "nav">
      <ul>
        <li>
          <NavLink exact to= "/" className="tab" activeClassName="active">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/ranking" className="tab" activeClassName="active">RANKING</NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="tab" activeClassName="active">MY PAGE</NavLink>
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
