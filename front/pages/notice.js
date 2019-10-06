import React from 'react'
import axios from 'axios'
import HtmlParser from '../components/HtmlParser'
import '../css/container.scss'
import {url} from '../url'
const notice = ({data})=>{
    
    return(
        <div>
            <HtmlParser data = {data} />
        </div>
    )
}
notice.getInitialProps = async(context)=>{
    const id = context.query.noticeid
    const res = await axios.get(`${url}/api/post/notice/contents/${id}`).catch((err)=>console.log(err))
    
    
    return {data : res.data.notice_conetent}
}
export default notice;