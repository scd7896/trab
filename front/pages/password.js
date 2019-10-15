import React,{useEffect,useState} from 'react'

import axios from 'axios'
import {url} from '../url'

const password = ()=>{
    const [question, setQuestion] = useState('')
    const callQuestion = ()=>{
        console.log('질문 불러와버리기')
    }
    const completedChangePassword = ()=>{
        alert('비밀번호 초기화 성공')
    }
    return(
        <div>
            <div>
                <span>아이디를 입력 해 주세요 : </span>
                <input type = "text" />
                <button onClick = {callQuestion}>질문 불러오기</button>
            </div>
            <div>
                <p>{question? <div>
                    <div>
                        <span>질문 : </span> <span>{question}</span>
                    </div>
                    <div>
                        <input type = 'text' placeholder = "본인 질의 응답" />
                        <button onClick = {completedChangePassword}>비밀번호 초기화</button>
                    </div>
                </div> : ''}</p>
            </div>
            
        </div>
    )
}

export default password;