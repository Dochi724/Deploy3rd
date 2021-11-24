import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import Nav from "./Nav";
import { useHistory } from "react-router";
import temp from "../images/temporaryImg.png";
import tag from "../images/#.png";
import '../stylesheets/write.scss';

const Write = () => {
  const history = useHistory();
  const [textarea, setTextarea] = useState("");
  const [hashtag_1, setHashtag1] = useState(""); // 음식 분류
  const [hashtag_2, setHashtag2] = useState("");
  const [hashtag_3, setHashtag3] = useState("");
  const [regiontag1, setRegiontag1] = useState(""); // 지역
  const [regiontag2, setRegiontag2] = useState("");
  const [regiontag3, setRegiontag3] = useState("");
  const [image, setImage] = useState(temp);

  const onTextChange = (e) => {
    setTextarea(e.target.value);
  };
  const onHashtag1Change = (e) => {
    setHashtag1(e.target.value);
  };
  const onHashtag2Change = (e) => {
    setHashtag2(e.target.value);
  };
  const onHashtag3Change = (e) => {
    setHashtag3(e.target.value);
  };
  const onRegion1Change = (e) => {
    setRegiontag1(e.target.value);
  };
  const onRegion2Change = (e) => {
    setRegiontag2(e.target.value);
  };
  const onRegion3Change = (e) => {
    setRegiontag3(e.target.value);
  };
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault(); // 새로고침 안되게하는거
    axios.post('http://127.0.0.1:8000/articles/', {
        user_id: sessionStorage.getItem('user'), 
        title: '',
        images: [image],
        tags: [regiontag1, regiontag2, regiontag3], // 일단 태그 하나밖에 안된대서 지금..!! 태그 하나만 보내자
        content: textarea,
        like_users: [],
    }) 
    .then(response => {
        console.log("된다임마")
        console.log(response)
        // if(response.data.message == "success!") {
        //     history.push('/')
        // }
        }) // 일단 서버 대답 받아와서 콘솔로 확인해봤음!!
    .catch(err => console.log(err));

  }


  return (
    <form onSubmit = {onSubmit}>
      <Nav />
      <div className="btn">
        <div className = "btn-area">
        <input className = "submit"
          type="submit"
          value="완료"
        />
        </div>
      </div>
      
      <div className="image">
          <div className="img">
            <h4 className="explanation">이미지</h4>
            <p>최대 3장</p>
          </div>
          <input 
          type="file"
          onChange={onImageChange}
          id="img"
          name="image"
          placeholder="사진 첨부"
        />
        <div className="image_area">
          <img src={image} alt="preview image" style={{marginRight: 7}} />
       
        </div>
      </div>

      <div className="content">
      <h4 className="explanation" style={{width: "21.5rem", margin: "15px auto 3px"}}>내용</h4>
        <textarea
          type="text"
          onChange={onTextChange}
          id="ex_txt"
          name="content"
          placeholder="내용을 입력해주세요"
          value={textarea}
        />
      </div>
      <div className="region_total">
        <div className="setRegion">
          지역
        </div>
        <div className = "region_area">
          <img src = {tag} />
          <input className="region"
          type="text"
          onChange={onRegion1Change}
          value={regiontag1}
          // id="reg_txt"
          // name="region"
          // placeholder="#"
        />
        </div>
        <div className = "region_area">
        <img src = {tag} />
        <input className="region"
          type="text"
          onChange={onRegion2Change}
          value={regiontag2}
          // id="reg_txt"
          // name="region"
          // placeholder="#"
        />
        </div>
        <div className = "region_area">
        <img src = {tag} />
        <input className="region"
          type="text"
          onChange={onRegion3Change}
          value={regiontag3}
          // id="reg_txt"
          // name="region"
          // placeholder="#"
        />
        </div>
      </div>
      <div className="tag_area">
        <div className="Type">
          음식분류
        </div>
        <div className="tag_input">
        <input className="tag"
          type="text"
          onChange={onHashtag1Change}
          value={hashtag_1}
          // id="hash_txt1"
          // name="hashtag"
          // placeholder=""
        />
        <input className="tag"
          type="text"
          onChange={onHashtag2Change}
          value={hashtag_2}
          // id="hash_txt2"
          // name="hashtag"
          // placeholder=""
        />
        <input className="tag"
          type="text"
          onChange={onHashtag3Change}
          value={hashtag_3}
          // id="hash_txt3"
          // name="hashtag"
          // placeholder=""
        />
        </div>
      </div>

    </form>
  );
};

//   return (
//         <div className='Write'>
//             <form action="/api/write" method="post">
//                 <div>
//                 	<input type='text' id='title_txt' name='title' placeholder='제목'/>
//                 </div>
//                 <div>
//                 	<textarea id='ex_txt' name='content' placeholder='내용을 입력해주세요'></textarea>
//                 </div>
//                 <div>
//                 	<input type='url' id='link_txt' name='url' placeholder='링크'/>
//                 </div>
//                 <div id="submit_btn">
//                     <button type="submit">완료</button>&nbsp;&nbsp;
//                     <button>취소</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

export default Write;

// ...
