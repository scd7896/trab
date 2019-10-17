import React,{useEffect,useState} from 'react'
import Router from 'next/router'
import axios from 'axios'
import {url} from '../url'

const password = ()=>{
    const [question, setQuestion] = useState('')
    const callQuestion = async()=>{
        const id = document.querySelector("#input_forgot_password_id").value
        
        const res = await axios.get(`${url}/api/post/question/${id}`).catch((err)=>alert('정보불러오기실패'))
        setQuestion(res.data.user_question)
    }
    const completedChangePassword = async()=>{
        const id = document.querySelector("#input_forgot_password_id").value
        const answer = document.querySelector("#answer_forgot_password").value
        const formData = {
            id : id,
            answer : answer
        }
        
        const res = await axios.post(`${url}/api/post/question/answer`, formData).catch((err)=>alert('실패함'))
        if(res.status === 201){
            alert("본인질의문이 틀렸습니다")
            return;
        }
        alert('초기화 성공')
        Router.push('/signin')
    }
    return(
        <div>
            <div>
                <span>아이디를 입력 해 주세요 : </span>
                <input id = "input_forgot_password_id" type = "text" />
                <button onClick = {callQuestion}>질문 불러오기</button>
            </div>
            <div>
                <p>{question? <div>
                    <div>
                        <span>질문 : </span> <span>{question}</span>
                    </div>
                    <div>
                        <input id = "answer_forgot_password" type = 'text' placeholder = "본인 질의 응답" />
                        <button onClick = {completedChangePassword}>비밀번호 초기화</button>
                    </div>
                </div> : ''}</p>
            </div>
            
        </div>
    )
}

export default password;