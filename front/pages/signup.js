
import React, {useState,useCallback} from 'react'
import axios from 'axios'
import Router from 'next/router'

import {url} from '../url'
import '../css/signup.scss'
const signup = ()=>{
    const [user_id, setUserId] = useState('')
    const [user_id_confirm, setUserIdConfirm] = useState(false)
    const [user_password, setUserPassword] = useState('')
    const [user_password_check, setUserPasswordCheck] = useState('')
    const [user_tel, setUserTel] = useState('')
    const [user_name, setUserName] = useState('')
    const [user_birthday, setUserBirthday] = useState('')
    const [user_mms, setUserMMS] = useState(false)
    const [user_question, setUserQuestion] = useState('')
    const [user_question_answer, setUserQuestionAnswer] = useState('')
    const [password_error_check, setPasswordErrorCheck] = useState(false)
    
    const birthdayChange = (e)=>{
        if(user_birthday.length >= 40) return;
        setUserBirthday(e.target.value)
    }
    const userIdChange = (e)=>{
        if(user_id.length >= 40) return
        setUserId(e.target.value)
    }

    const userPasswordChange = (e)=>{
        if(user_password.length >= 40) return
        setUserPassword(e.target.value)
    }

    const userPasswordCheckChange = useCallback((e)=>{
        setPasswordErrorCheck(e.target.value !== user_password)
        setUserPasswordCheck(e.target.value)
    }, [user_password, user_password_check])

    const userTelChange = (e)=>{
        if(user_tel.length >= 30) return
        setUserTel(e.target.value)
    }

    const userQuestionChange = (e)=>{
        if(user_question.length >= 50) return
        setUserQuestion(e.target.value)
    }

    const userQuestionAnswerChange = (e)=>{
        if(user_question_answer >= 40) return
        setUserQuestionAnswer(e.target.value)
    }
    
    const nameChange = (e)=>{
        setUserName(e.target.value)
    }

    const submitData = async()=>{
        if(password_error_check){
            alert('비밀번호확인이 체크가 안되어있습니다')
            return
        }
        
        const formData = {
            userId:user_id,
            password:user_password,
            userMMS:user_mms,
            userTel:user_tel,
            userName:user_name,
            question:user_question,
            questionAnswer:user_question_answer,
            userBirthday:user_birthday
        }
        const result = await axios.post(`${url}/api/signup`, formData)
            .catch((err)=>{
                console.log(err)
                alert('이미 그아이디가 있습니다')
                
            })
        
        if(result.status !== 401){
            alert(result.data)
            Router.push('/signin');
            return
        }
        
    }
    return(
        <div id = "signup_form_container">
            <p>아이디</p>
            <input type = 'text' value = {user_id} onChange ={userIdChange}></input>
            <p>이름</p>
            <input type = 'text' value = {user_name} onChange = {nameChange}></input>
            <p>비밀번호</p>
            <input type = 'password' value = {user_password} onChange = {userPasswordChange}></input>
            <p>비밀번호 확인</p>
            <input type = 'password' value = {user_password_check} 
                onChange = {userPasswordCheckChange}></input>
            <p>연락처</p><input type = 'text' value= {user_tel} onChange={userTelChange}></input>
            <p>생년월일(YYYY-MM-DD 형식으로 입력해주세요)</p>
            <input id = "birthday" value = {user_birthday} onChange = {birthdayChange}type = 'text'></input>
            <p>본인확인 질문</p><input type = 'text' value = {user_question} onChange = {userQuestionChange}></input>
            <p>본인확인 질문 답변</p><input type = 'text' value = {user_question_answer} onChange = {userQuestionAnswerChange}></input>

            <button onClick = {submitData}>제출하기</button>
        </div>
    )
}

export default signup