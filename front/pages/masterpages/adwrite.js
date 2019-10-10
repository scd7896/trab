import React,{useState} from 'react'
import PostUpload from '../../components/PostUpload'

import axios from 'axios'

import {url} from '../../url'
const adwrite = ()=>{
    const [titleImage, setTitleImage] = useState()
    const setAdTitleImage = (e)=>{
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', "image/*")
        input.setAttribute('method', 'post')
        input.click()
        input.addEventListener('change', async()=>{
            const file = input.files[0]
            setTitleImage(file)
        })
    }
    const addSubmit = (contents)=>{
        const title = document.querySelector("#title_text");
        const titleText = title.value;
        const formData = new FormData();
        formData.append("contents", contents)
        formData.append("title", titleText);
        formData.append("image", titleImage)
        const res = axios.post(`${url}/api/post/`)
    }
    return(
        <div>
            <div>
                <button onClick = {setAdTitleImage}>이미지선택하기</button>
                {titleImage ? titleImage.name : '이미지가 없습니다'}
            </div>
            <div>
                <p>제목 : <input type = "text" id = "title_text"></input></p>
            </div>
            <PostUpload submitType = {addSubmit}></PostUpload>
        </div>
    )
}

export default adwrite;