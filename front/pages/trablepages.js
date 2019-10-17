import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import Slider from 'react-slick';
import Link from 'next/link'
import "slick-carousel/slick/slick.css";
import '../css/trablepages.scss'

import {url} from '../url'
import CityName from '../components/CityName'
import SliderLeftButton from '../components/SliderLeftButton'
import SliderRightButton from '../components/SliderRightButton'
import { SET_TRABLEPAGE_AD, SET_TRABLEPAGE_AD_ZERO } from '../action/action';

const TrablePages = ({where, data, add})=>{

    const dispatch = useDispatch();
    const {addInTrablePages} = useSelector(state=> state.post)
    let number = addInTrablePages;
    const setting = {
      infinite : true,
      speed : 500,
      arrows: true,
      prevArrow : <SliderLeftButton />,
      nextArrow : <SliderRightButton/>,
      slidesToShow : 4,
      slidesToScroll : 2,
    }
    useEffect(()=>{
      
      let inter = setInterval(()=>{
        
        if(number < add.length-1){
          number++
          dispatch({
            type: SET_TRABLEPAGE_AD,
          })
          
        }else{
          number = 0;
          dispatch({
            type: SET_TRABLEPAGE_AD_ZERO,
          })
          
        }
      }, 4000)
      return ()=>clearInterval(inter)
    },[])
    return(
        <div>
          
          <div id = "trablepage_adzone">
            <div id = "notice_content">
              {add.map((v,i)=>{
                return <Link key = {i} href = {{pathname : '/adcontent', query:{noticeid:v.id}}} as ={`/notice/${v.id}`}>
                        <img id = {i=== number? "ad_trablepages" : "ad_trablepages_none"} src = {v.image} />
                    </Link>
              })}
            </div>
          </div>
          <Slider {...setting} style = {{marginTop : "100px"}}>
            {data.map((city, i)=>{
              return <CityName key = {i} name = {city} />
            })}
          </Slider>
        </div>
        
    )
}
TrablePages.getInitialProps = async(context)=>{
    /* 여기서 쿼리 파라미터에 있는 것을 서버에 요청해서 데이터를 받아오면 ssr로
        검색엔진 최적화 됨 */
    const res = await axios.get(`${url}/api/post/cities/${context.query.where}`).catch((err)=>alert('데이터 못가져왔습니다'))
    const iskorea = context.query.where ==='korea' ? 1 : 0;
    const add = await axios.get(`${url}/api/post/viewad/${iskorea}`).catch((err)=> alert('데이터 못가져옴'))
    
    return {where : context.query.where, data : res.data, add : add.data}
}

export default TrablePages