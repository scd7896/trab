import React,{useState, useEffect} from "react";
import {Icon} from 'antd'
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import {useSelector, useDispatch} from 'react-redux'

import axios from 'axios'

import "slick-carousel/slick/slick.css";
import '../css/indexComponent.scss'

import {url} from '../url'
import IndexNewPosts from '../components/IndexNewPosts'
import IndexNewSeller from '../components/IndexNewSeller'
import {NOTICE_NUM_SETTING,TRAB_BEST_SETTING} from '../action/action'




import { dummmyNotice,dummyTrabBest, dummyCountrys}from'../dummydatas/post'
const Index = ()=>{
  /* Todo : 공지사항 리스트를 가져와서 화면에 뿌려줄것 */
  const dispatch = useDispatch()
  const {noticeNum, trabBest} = useSelector(state=> state.post)
  
  
  const left = "<"
  const right = ">"
  const leftClik = ()=>{
    if(noticeNum === 0 ) return
    dispatch({
      type : NOTICE_NUM_SETTING,
      data : noticeNum -1
    })
  }
  const rightClick =()=>{
    if(noticeNum === dummmyNotice.length-1) return
    dispatch({
      type : NOTICE_NUM_SETTING,
      data : noticeNum +1
    })
  }
  
  
  useEffect(()=>{
   
    
    //const sellers = await axios.get('http://localhost:9170/seller/config/true')
    
    let autoNoticeChange = setInterval(()=>{
      if(noticeNum < dummmyNotice.length-1){
        dispatch({
          type: NOTICE_NUM_SETTING,
          data: noticeNum+1
        })
      }else{
        dispatch({
          type: NOTICE_NUM_SETTING,
          data : 0
        })
      }
    },5000)
    
    return ()=> clearInterval(autoNoticeChange)
  },[])

  return(
    <div id = 'root'>
      <div id = "notice">
        <div id = "notice_content">
          {dummmyNotice.map((v,i)=>{
            return <Link key = {i} href = {{pathname : '/notice', query:{noticeid:v.notice_id}}} as ={`/notice/${v.notice_id}`}>
                    <img id = {i=== noticeNum? "notice_image" : "notice_image_none"} src = {v.notice_image} />
                </Link>
          })}
        </div>

        <div id = "notice_navigator">
          <button className="notice_button" onClick = {leftClik}>{left}</button>
            {noticeNum+1}/{dummmyNotice.length}
          <button className = "notice_button" onClick = {rightClick}>{right}</button>
        </div>
      </div>
      <div id = "trable_selector">
          <Link href = {{pathname : "/trablepages", query :{where : 'korea'}}} as = '/trablepages/korea'>
            <div className = "select_left">
              <h2>국내여행 열람하기</h2>
            </div>
          </Link>
          
          <Link href = {{pathname : "/trablepages", query :{where : 'overseas'}}} as = '/trablepages/overseas'>
            <div className = "select_right">
              <h2>해외여행 열람하기</h2>  
            </div>
          </Link>
      </div>

      <div id = "country_best">
        <h2> 최근 등록된 게시물 입니다 </h2>
        <IndexNewPosts/>
      </div>
      <div id = "new_sellers"
        //마찬가지로 화면에 뿌려줄 카드에 들어갈 컨텐츠 상의후 진행
      >
        <h2>최근 등록된 설계자들 입니다!</h2>
        <IndexNewSeller/>
        
      </div>
      
    </div>
  )
}

export default Index;
