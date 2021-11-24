import React from "react";
import profile from "../images/profile.png";
import save from "../images/save.png";
import blank from "../images/blank.png"; // 대충 임시 사진 들고온거
import Nav from "./Nav";
import '../stylesheets/profile.scss'; 
import ProfileContent from "./ProfileContents";

const Profile = ({who}) => {
  return (<>
    <div className="profile">
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <div className="mypage_header">
        <div className = "mypage_who">
            <img src = {profile}/>
            <p>{who ? who : "나"} 의 페이지</p> 
            {/* 나중에 어떤 게시글의 사용자 이름 누르면 그걸 props로 who로 전달할 것 */}
        </div>
        <div className = "mypage_save">    
            <img src = {save} />
            <p>저장한 콘텐츠</p>
        </div>
      </div>
      </div>
      <div className="profile_content">
        <ProfileContent img = {blank} tag = "#살려줘 #할게너무많아 #ㅠㅠ" content="대충 폼만 만들었다@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" like={0}/>
        <ProfileContent img = {blank} tag = "#살려줘 #할게너무많아 #ㅠㅠ" content="대충 폼만 만들었다@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" like={0}/>
        <ProfileContent img = {blank} tag = "#살려줘 #할게너무많아 #ㅠㅠ" content="대충 폼만 만들었다@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" like={0}/>
      </div>
    </div>
    </>
  )
};

export default Profile;
