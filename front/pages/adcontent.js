import React from 'react'
import axios from 'axios'

import HTMLParser from '../components/HtmlParser'
import {url} from '../url'
const adcontent = ({data})=>{
    console.log(data)
    return(
        <div>
            <HTMLParser data = {data.content}/>
        </div>
    )
}
adcontent.getInitialProps = async(context)=>{
    const res = await axios.get(`${url}/api/post/adlist/${context.query.id}`)
        .catch((err)=>alert('데이터를 수신 못햇습니다'))
    
    
    return{data : res.data}
}
export default adcontent