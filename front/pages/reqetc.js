import React,{useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Router from 'next/router'
import axios from 'axios'
import {url} from '../url'
const reqetc = ({id})=>{
    const [matchEtc, setMatchEtc] = useState('')
    const callMatchData = async()=>{
        const res = await axios.get(`${url}/api/master/matching/data/${id}`).catch((err)=> alert('데이터 못가져옴'))
        setMatchEtc(res.data.etc);
    }
    useEffect(()=>{ 
        callMatchData();
    },[])
    const goBack = ()=>{
        Router.back();
    }
    return(
        <div>
            <h1>{matchEtc?  matchEtc:''}</h1>
            <Button onClick ={goBack}variant="contained" color = "default">뒤로가기</Button>
        </div>
    )
}

reqetc.getInitialProps = async(context)=>{
    
    return{id : context.query.id}
}

export default reqetc;