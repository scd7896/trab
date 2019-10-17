import React,{useState} from 'react'
import PostUpload from '../../components/PostUpload'
import { DatePicker } from '@y0c/react-datepicker';
import Router from 'next/router'
import axios from 'axios'
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import 'moment/locale/ko'
import {url} from '../../url'
const adwrite = ()=>{
    const [titleImage, setTitleImage] = useState()
    const [lastDate, setLastDate] = useState('')
    const [isKorea, setIsKorea] = useState(false)
    const isKoreaChange = (e)=>{
        setIsKorea(e.target.value)
    }
    const dateChange = (date)=>{
        const year = date.$y;
        const month = date.$M+1;
        const day = date.$D
        const string = `${year}-${month}-${day}`
        setLastDate(string);
    }
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
        const formData = new FormData();
        formData.append("contents", contents)
        formData.append("image", titleImage)
        formData.append("last_day", lastDate)
        formData.append("is_korea", isKorea)
        const res = axios.post(`${url}/api/post/ad`, formData)
            .then((value)=>{
                Router.push('/masterpages/adlist')
            })
            .catch((err)=>{
                alert('추가실패')
            })
    }
    return(
        <div>
            <div>
                <span>대표 이미지 : </span>    
                <button onClick = {setAdTitleImage}>이미지선택하기</button>
                {titleImage ? titleImage.name : '이미지가 없습니다'}
            </div>
            <div>
                <label onChange = {isKoreaChange}>
                    <span>한국</span>
                    <input type = "radio" name = "isKorea" value = {true} />
                </label>
                <label onChange = {isKoreaChange}>
                    <span>외국</span>
                    <input type = "radio" name = "isKorea" value = {false} />
                </label>
                
            </div>
            <div style = {{height : '400px'}}>
                <span>마감날짜 : </span><DatePicker id = "date_picker" showToday onChange = {dateChange}/>
            </div>
            
            <PostUpload submitType = {addSubmit}></PostUpload>
        </div>
    )
}

export default adwrite;