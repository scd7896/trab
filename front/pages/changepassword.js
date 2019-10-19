import React,{useState} from 'react'
import Button from '@material-ui/core/Button'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import Router from 'next/router'
import {USER_LOG_OUT} from '../action/action'
import {url} from '../url'
const changepassword = ()=>{
    const [isCertification, setIsCertification] = useState(false)
    const dispatch = useDispatch();
    const {me} = useSelector(state=> state.user)
    const doCertification = async()=>{
        const password = document.querySelector('#password_input_for_certification').value
        const res = await axios.post(`${url}/api/post/password/certification`,{
            id : me.id,
            password :password
        }).catch((err)=> {alert('비밀번호가 틀렸습니다')})
        if(!res.data){return}
        setIsCertification(res.data)
    }
    const changePassword = async()=>{
        const newPassword = document.querySelector('#new_password').value
        const newPasswordConfig = document.querySelector("#new_password_config").value
        if(newPassword !== newPasswordConfig){
            alert('비밀번호가 다릅니다')
            return;
        }
        const res = await axios.post(`${url}/api/post/password/changing`,{
            id : me.id,
            new_password : newPassword
        }).catch((err)=>alert('오류났습니다'))
        sessionStorage.removeItem('usertoken')
        dispatch({
            type : USER_LOG_OUT
        })
        alert('비밀번호가 변경되었습니다. 다시 로그인을 시도해주세요');
        Router.push('/signin');
    }
    return(
        <div>
            {isCertification? 
                <div>
                    <span>새로운 비밀번호 : </span><input type ="password" id = "new_password"></input>
                    <span>새로운 비밀번호 확인 : </span><input type ="password" id = "new_password_config"></input>
                    <Button onClick = {changePassword} variant = "contained" color = "default">비밀번호 변경</Button>
                </div>
                :
                <div>
                    <span>비밀번호를 입력해주세요</span>
                    <input id = "password_input_for_certification" type = "password"></input>
                    <Button onClick = {doCertification} variant = "contained" color = "default">인증하기</Button>
                    
                </div>}
        </div>
    )
}

export default changepassword