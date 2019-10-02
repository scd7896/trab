import React,{useState,useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import {useSelector} from 'react-redux'
import Router from 'next/router'

import Editor from '../components/PostUpload'


import '../css/seller.scss'

const seller = ()=>{
   
    const [profileImage, setProfileImage] = useState('')
    const {me} = useSelector(state=>state.user)
    const onSubmit = async(chilText)=>{
        const countries = document.querySelector("#countries")
        const bankNum = document.querySelector('#bank_num')
        const intro = document.querySelector("#intro")
        const check = chilText.length >60000 || countries.value.length > 25 || bankNum.value.length > 30 || intro.value.length > 30
        if(check){
            alert('어딘가 문자열이 말도안되게 깁니다 다시 작성하세요')
            return;
        }
        const formData = new FormData()
        formData.append('image', profileImage)
        formData.append('countries', countries.value)
        formData.append('bank_num', bankNum.value)
        formData.append('intro', intro.value)
        formData.append('test_content', chilText)
        formData.append('user', me.id)
        const result = await axios.post('http://127.0.0.1:9170/api/post/sellerconfig',formData)
        if(result.status !== 200){
            alert('업로드 실패')
            return
        }else{
            alert('관리자가 심사하겠습니다!')
            Router.push('/').then((value)=>{
                location.reload();
            })

            return
        }
    }
    const setImage = (e)=>{
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', "image/*")
        input.setAttribute('method', 'post')
        input.click()
        input.addEventListener('change', async()=>{
            const file = input.files[0]
            
            setProfileImage(file)
        })
    }
    const checkCall = async()=>{
        const res = await axios.get(`http://127.0.0.1:9170/api/post/sellerconfig/${me.id}`)
        if(res.status !== 200){
            alert('심사중입니다 기다려주세요')
            Router.push('/')
        }
    }
    useEffect(()=>{
        checkCall();
    },[])
    return(
        <div style = {{marginLeft : '5%', marginRight : '5%'}}>
            <div id = 'seller_picture'>
                <p>프로필사진</p>
                <button onClick = {setImage}>이미지선택하기</button>
                {profileImage? <p>{profileImage.name}</p>:""}
            </div>
            <div id = 'seller_data'>
                
                <p>설계가능국가 : <TextField id = "countries" ></TextField></p>
                <p>계좌번호 : <TextField id = "bank_num" ></TextField></p>
                <p>한줄 본인 소개: <TextField id = "intro"></TextField></p>
            </div>
            <div>
                <Editor submitType = {onSubmit} />
            </div>
        </div>
    )
}

export default seller