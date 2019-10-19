import React,{useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import Router from 'next/router'
import Button from "@material-ui/core/Button"
import {url} from '../url'
const mypage = ()=>{
    const {me} = useSelector(state=> state.user);
    const [myData, setMyData] = useState()
    const callMyData = async()=>{
        const res = await axios.get(`${url}/api/post/mydata/${me.id}`).catch((err)=>{
            alert('데이터 가져오기 실패')
        })
        setMyData(res.data)
    }

    const moveToChangePassword = ()=>{
        Router.push('/changepassword')
    }
    useEffect(()=>{
        if(me.id){
            callMyData()
        }
    },[])
    return(
        <div>
            {myData ?<div>
                <div><span>아이디 : </span> <span>{myData.acount}</span></div>
                <div><span>연락처 : </span> <span>{myData.user_tel}</span></div>
                <div><span>이름 : </span><span>{myData.user_name}</span> </div>
                <div><span>유저 등급 :  </span> <span>{myData.user_rank}</span></div>
                <Button onClick = {moveToChangePassword} variant = "contained" color = "default"> 비밀번호 변경 하기 </Button>
            </div> :'데이터를 가져오는중'}
        </div> 
    )
}

mypage.getInitialProps = async(context)=>{
    return{}
}

export default mypage