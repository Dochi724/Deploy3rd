import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import Nav from "./Nav";

const Write = () => {
  const [title, setTitle] = useState(
    "제목을 입력해주세요"
  );
  const [textarea, setTextarea] = useState(
    "글 내용을 입력해주세요"
  );
  const [hashtag, setHashtag] = useState(
    "해시 태그를 입력해주세요"
  );
  const [image, setImage] = useState(null)
  
  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const onTextChange = (e) => {
    setTextarea(e.target.value)
  } 
  const onHashtagChange = (e) => {
    setHashtag(e.target.value)
  } 
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
   }
  }

  return (
    <form>
      < Nav/>
      <div>
        <input type='text' onchange={onTitleChange} id='title_txt' name='title' placeholder='제목'/> 
      </div>
      <div>
        <input type="file" onChange={onImageChange} id='img' name='image' placeholder='사진 첨부' />
        <img src={image} alt="preview image" />
       </div> 
      <div>
        <input type="text" onchange={onTextChange} id='ex_txt' name='content' placeholder='내용을 입력해주세요'/>   
      </div>
      <div>
        <input type="text" onchange={onHashtagChange} id='hash_txt' name='hashtag' placeholder='hashtag입력해주세요'/> 
      </div>     
    </form>
  )
}





  


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