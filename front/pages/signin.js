import React from 'react'
import Link from 'next/link'
import TextField from '@material-ui/core/TextField'
import '../css/signin.scss'
import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import {useDispatch} from 'react-redux'
import jwtDecode from 'jwt-decode'

import {SET_USER_SETTING} from '../action/action'

const signin = ()=>{
    const [inputId, setInputId] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const dispatch = useDispatch()
    const login = async() =>{
       
        const result = await axios.post('http://127.0.0.1:9170/api/login', {
            userId : inputId,
            userPassword : inputPassword   
        })
        if(result.status === 207){
            alert(result.data)
            return
        }
        if(result.status === 208){
            alert(result.data)
            return
        }
        
        sessionStorage.setItem('usertoken', result.data)
        const decode = jwtDecode(result.data)
        dispatch({
            type:SET_USER_SETTING,
            data : decode
        })
        alert('로그인성공!')
        Router.push('/')
}
    const changeId = (e)=>{
        setInputId(e.target.value)
    }
    const changePassword = (e)=>{
        setInputPassword(e.target.value)
    }
    return(
        <div id = "login_page">

            <div id = "login_form">
                <p className = "input_login">아이디를 입력하세요 </p>
                <p><TextField type = 'text' value = {inputId} onChange = {changeId}></TextField></p>
                <p className = "input_login">비밀번호를 입력하세요</p>
                <p><TextField type = "password" value = {inputPassword} onChange = {changePassword}></TextField></p>
                <Link href = "/password"><a className = 'signid'>비밀번호 찾기</a></Link>
                <Link href = "/signup"><a className = 'signid'>회원가입하기</a></Link>
                <button onClick = {login}>로그인하기</button>
            </div>
            <div id = 'in_box'><img src = 'https://static-cdn.jtvnw.net/jtv_user_pictures/cbba3796-12bc-425c-8512-f292a8f2ab39-profile_image-300x300.png'/></div>

        </div>
    )
}

export default signin;