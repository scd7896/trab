import React,{useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import axios from 'axios'
import {useSelector}from 'react-redux'
import Router from 'next/router'
import ReactHtmlParser from 'react-html-parser'
import '../css/postcontent.scss'

const Contents = ({postid})=>{
    
    const [postData, setPostData] = useState('');
    const {me} = useSelector(state => state.user)

    const configPost = async()=>{
        const res = await axios.put(`http://localhost:9170/api/master/postconfig/${postid}`).catch((err)=>{alert('새로고침 후 재시도 해주시기 바랍니다.')})
        if(res.status === 200 ){
            alert('승인됬습니다')
            Router.push('/masterpages/trabpost').then(()=> location.reload())
        }

    }
    const callPostData = async()=>{
        const res = await axios.get(`http://localhost:9170/api/post/trable/${postid}`)
        setPostData(res.data[0]);
    }
    
    useEffect(()=>{
        if(!postData){
            callPostData()
        }
    },[])
    return (
        <div>
           {postData ? <div id="content_block" >                
                    <div id = "user_profile_photo">
                        {postData.seller_image? <img src = {`${postData.seller_image}`}></img>: '이미지가 없습니다'}
                    </div>
                    <div id = "user_profile_content">
                        <h1>제목 : {postData.trable_post_title}</h1>
                        <p>작성자 : {postData.seller_name}</p>
                        <p>도시 : {postData.city_name}</p>
                    </div>
                <div id = "post_content_block">
                    <div>{ReactHtmlParser(postData.postcontent)}</div>
                    
                    {postData.trable_post_configday ? 
                        <div id = "button_block">
                            <Link href = {{pathname : '/matching', query : {postid : postid}}}
                            as = {`/matching/${postid}`}><Button variant='contained' color ='primary'><a>1:1 맞춤 여행 설계 신청하기</a></Button></Link>
                        </div>:''}
                    {!postData.trable_post_configday ?
                        <div>
                            <Button onClick = {configPost} variant='contained' color ='primary'>승인</Button> 
                            <Button  variant='contained' color ='secondary'>거절</Button> 
                        </div>
                        :''}
                    {me.userRank === "관리자" && postData.trable_post_configday ? <Button  variant='contained' color ='secondary'>삭제</Button> : ''}
                </div>
            </div> : ''}
        </div>
    )
}
Contents.getInitialProps = async(context)=>{
    
    return {postid : context.query.postid}
}
export default Contents