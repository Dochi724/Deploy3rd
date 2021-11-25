import React, {useEffect, useState} from "react";
import likeIcon from "../images/like.png";
import axios from "axios";
import profile from "../images/profile.png";
import {useHistory} from "react-router-dom";
const DetailPageItem = ({item}) => {
    const history = useHistory()
    const {id, like_users, image, content, tags, comment_set} = item;
    const [newComment, setNewComment] = useState("");
    const onButtonClick = () => {
        axios.post(`http://127.0.0.1:8000/articles/${id}/likes/`)
        .then(response => {
                    // console.log(response)
                   
                })
                .catch(function (error) {
                });
        
    }

    const onCommentChange = e => {
        setNewComment(e.target.value);
    }

    const onSubmit = () => {
        axios.post(`http://127.0.0.1:8000/articles/${id}/comment/`,{
            // name: sessionStorage.getItem('user'),  
            content: newComment
        })
        .then(
            // response => console.log(response)
        )
    }

    return (
        <div className="detail-page">
            <div className="author">
                <img src={profile} />
                <p>익명</p>
            </div>
            <div className="detail-box">
                <div className="detail-img"><img src = { `http://127.0.0.1:8000/articles${image}`}/></div>
                <div className="detail-like"><img src={likeIcon}/><p>{like_users === undefined ? "0개" : `${like_users.length}개`}</p></div>
                <div className="detail-content"><p>{content}</p></div>
                <div className="detail-tag"><p>#{tags}</p></div>
                <div className="detail-button-area">
                    <button className="detail-button" onClick={onButtonClick}>추천 하기</button>
                    <button className="detail-button">게시글 저장하기</button>
                </div>
            </div>
            <div className="detail-comment">
                    <div className = "detail-comment-count">
                    <p>댓글 {comment_set.length}개</p>
                    </div>
                    <div className="detail-comment-content">
                        {comment_set.map((comment, index) => 
                            <div className="detail-comment-content-form"><div className="detail-comment-profile"><img src={profile}/><p>익명 {index + 1}</p></div><p>{comment.content}</p></div> )} 
                    </div>
                    <form onSubmit={onSubmit}>
                        <input type="text" className="comment-input" onChange={onCommentChange} value={newComment} placeholder="댓글 쓰기" />
                        <input type="submit" className="comment-button" value="게시"/>
                    </form>
            </div>
        </div>
    )
}
export default DetailPageItem;