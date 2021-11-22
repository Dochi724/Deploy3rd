import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import Nav from "./Nav";
import { useHistory } from "react-router";
import '../stylesheets/write.scss';

const Write = () => {
  const history = useHistory();
  const [title, setTitle] = useState("제목을 입력해주세요");
  const [textarea, setTextarea] = useState("글 내용을 입력해주세요");
  const [hashtag, setHashtag] = useState("해시 태그를 입력해주세요");
  const [regiontag, setRegiontag] = useState("지역을 입력해주세요");
  const [image, setImage] = useState(null);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onTextChange = (e) => {
    setTextarea(e.target.value);
  };
  const onHashtagChange = (e) => {
    setHashtag(e.target.value);
  };
  const onRegionChange = (e) => {
    setRegiontag(e.target.value);
  };
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <form>
      <Nav />
      <div className="btn">
        <button className = "submit"
          type="button"
          onClick={() => history.push('/')}
        >
          완료
        </button>
      </div>
      
      <div className="image">
        <div className="img">
        이미지  
        </div>
          <input 
          type="file"
          onChange={onImageChange}
          id="img"
          name="image"
          placeholder="사진 첨부"
        />
        
        <img src={image} alt="preview image" />
      </div>

      <div className="content">
        <input
          type="text"
          onchange={onTextChange}
          id="ex_txt"
          name="content"
          placeholder="내용을 입력해주세요"
        />
      </div>
      <div className="region">
        <div className="setRegion">
          지역
        </div>
        <input className="region1"
          type="text"
          onchange={onTextChange}
          id="reg_txt"
          name="region"
          placeholder="#"
        />
        <input className="region2"
          type="text"
          onchange={onTextChange}
          id="reg_txt"
          name="region"
          placeholder="#"
        />
        <input className="region3"
          type="text"
          onchange={onTextChange}
          id="reg_txt"
          name="region"
          placeholder="#"
        />

      </div>
      <div className="tag">
        <div className="Type">
          음식분류
        </div>
        <input className="tag1"
          type="text"
          onchange={onHashtagChange}
          id="hash_txt1"
          name="hashtag"
          placeholder=""
        />
        <input className="tag2"
          type="text"
          onchange={onHashtagChange}
          id="hash_txt2"
          name="hashtag"
          placeholder=""
        />
        <input className="tag3"
          type="text"
          onchange={onHashtagChange}
          id="hash_txt3"
          name="hashtag"
          placeholder=""
        />
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
