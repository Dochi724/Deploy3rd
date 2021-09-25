import React from "react";
import { Route, Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Ranking">Ranking</Link>
        </li>
        <li>
          <Link to="/Profile">My Page</Link>
        </li>
        <li>
          <Link to="/Write">Write</Link>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default Nav;
