import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import likeIcon from "../images/like.png";
import '../stylesheets/home.scss'; 
import { useHistory } from "react-router";

const Ranking = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/articles/')
      .then(
        ({ data }) => {
          data = data.sort((a,b) => b.like_users.length - a.like_users.length )
          setPosts(data) 
          // console.log(data)
        });
        // response => console.log(response))
  }, []);
  const onImgClick = (id) => {
    // console.log(id);
    history.push({pathname: `/post/${id}`})
  }
  return (
    <>
       <Container>
      <GlobalStyle />
      {posts.map((post, index) => (
        <div>
          <Post key={post.id} onClick={() => onImgClick(post.id)} >
            <img style={{width: "10em", height: "10em"}} src = { `http://127.0.0.1:8000/articles${post.image}`}/>
            {/* {console.log(post.image)} */}
          </Post>
          <div className="like_count">
          <img src = {likeIcon} />
          <p style={{fontWeight: 'bold'}}>{post.like_users === undefined ? 0 : post.like_users.length}</p>
          <p>{index === 0 && "🥇"}</p>
          <p>{index === 1 && "🥈"}</p>
          <p>{index === 2 && "🥉"}</p>
          </div>
        </div>
      ))}
    </Container>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 23.4375rem;
  margin: auto;
  margin-top: 3em;
`;

const Post = styled.div`
  width: 10em;
  height: 10em;
  background: white;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;


const Body = styled.div`
  
`;

export default Ranking;