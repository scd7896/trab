import React,{useState} from 'react'
import axios from 'axios'
import Router from 'next/router'
import {url} from '../../url'
import PostUpload from '../../components/PostUpload'
const writenotice = ()=>{
    const [noticeImage, setNoticeImage] = useState('');
    
    const noticePosting = async(contents)=>{
        const noticeTitle = document.querySelector("#notice_title")
        const titleContents = noticeTitle.value;
        const formData = new FormData;
        formData.append("notice_title",titleContents);
        formData.append("image", noticeImage)
        formData.append("notice_contents", contents)
        const res = await axios.post(`${url}/api/post/addnotice`, formData).catch((err)=> alert('업로딩 실패'))
        if(res.status === 200){
            alert('성공');
            Router.push('/masterpages/notice');
        }
        
    }

    const setNoticeTitleImage = ()=>{
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', "image/*")
        input.setAttribute('method', 'post')
        input.click()
        input.addEventListener('change', async()=>{
            const file = input.files[0]
            
            setNoticeImage(file)
        })
    }
    return(
        <div>
            <div id = "notice_write_top_container">
                
                <p>프로필사진</p>
                <button onClick = {setNoticeTitleImage}>이미지선택하기</button>
                {noticeImage? <p>{noticeImage.name}</p>:""}
                <p>
                    <span>공지사항 제목 : </span><input id = "notice_title" type = 'text'></input>
                </p>
            </div>
            <PostUpload submitType = {noticePosting}></PostUpload>
        </div>
    )
}

export default writenotice