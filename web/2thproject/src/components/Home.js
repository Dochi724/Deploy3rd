import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import likeIcon from "../images/like.png";
import '../stylesheets/home.scss'; 
import { useHistory } from "react-router";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState("");
  const history = useHistory();
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/articles/')
      .then(
        ({ data }) => {
          setPosts(data) 
          // console.log(data)
        });
        // response => console.log(response))
  }, []);
  const onImgClick = (id) => {
    // console.log(id);
    history.push({pathname: `/post/${id}`})
  }
  const locationChange = (e) => {
    // console.log(location)

    setLocation(e.target.value )
    // console.log(e.target.value)
    if(e.target.value!=="") {
     axios
       .get(`http://127.0.0.1:8000/articles/search/?search=${e.target.value}`)
       .then(
         ({ data }) => {
           setPosts(data) 
           console.log(data)
         });
         // response => console.log(response)
       }
       else {
         axios
         .get('http://127.0.0.1:8000/articles/')
         .then(
           ({ data }) => {
             setPosts(data) 
            // console.log(data)
           });
       }
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent:"center", marginTop: 25}}>
      <FormControl sx={{m: 1, width: "21.5rem" }}>
          <Select
            value={location}
            onChange={locationChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            style={{
              background: '#FFFFFF',
              border: '1px solid #000000',
              boxSizing: 'border-box',
              borderRadius: '5px',
              height: 30,
              width: 100
            }}
          >
            <MenuItem value="">
              <em style={{fontWeight: "bold", fontFamily: 'Noto Sans KR'}}>전체</em>
            </MenuItem>
            <MenuItem style={{fontWeight: "bold", fontFamily: 'Noto Sans KR'}} value="부산대">부산대</MenuItem>
            <MenuItem style={{fontWeight: "bold", fontFamily: 'Noto Sans KR'}} value="부경대">부경대</MenuItem>
            <MenuItem style={{fontWeight: "bold", fontFamily: 'Noto Sans KR'}} value="부산">부산</MenuItem>
          </Select>
      </FormControl>
    </div>
    <Container>
      <GlobalStyle />
      {posts.map((post) => (
        <div>
          <Post key={post.id} onClick={() => onImgClick(post.id)} >
            <img style={{width: "10em", height: "10em"}}src = { `http://127.0.0.1:8000/articles${post.image}`}/>
            {/* {console.log(post.image)} */}
          </Post>
          <div className="like_count">
          <img src = {likeIcon} />
          <p style={{fontWeight: 'bold'}}>{post.like_users === undefined ? 0 : post.like_users.length}</p>
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
  margin-top: 1.5em;
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

export default Home;