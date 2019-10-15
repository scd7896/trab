import React,{useEffect,useState} from 'react'

import axios from 'axios'
import {url} from '../url'

const password = ()=>{
    const [question, setQuestion] = useState('')
    const callQuestion = ()=>{
        console.log('질문 불러와버리기')
    }
    return(
        <div>
            <div>
                <span>아이디를 입력 해 주세요 : </span>
                <input type = "text" />
                <button onClick = {callQuestion}>질문 불러오기</button>
            </div>
            <div>
                <p>{question? question : ''}</p>
            </div>
            
        </div>
    )
}

export default password;