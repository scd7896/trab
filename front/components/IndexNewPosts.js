import React,{useEffect} from'react'
import {useDispatch, useSelector} from 'react-redux'
import Slider from 'react-slick'
import axios from 'axios'

import {SET_INDEX_POSTS} from '../action/action'
import SliderLeftButton from './SliderLeftButton'
import SliderRightButton from './SliderRightButton'
import TrabCard from './TrabCard'
const IndexNewPosts = ()=>{
    const dispatch = useDispatch();
    const {newPosts} = useSelector(state=> state.post)
    const setting = {
        infinite : true,
        speed : 500,
        arrows: true,
        prevArrow : <SliderLeftButton />,
        nextArrow : <SliderRightButton/>,
        slidesToShow : 4,
        slidesToScroll : 2,
      }
    
    const callNewPosts = async()=>{
        const trabPost = await axios.get('http://localhost:9170/api/post/trabpost/config/true')
          dispatch({
            type: SET_INDEX_POSTS,
            data : trabPost.data
          })
      }
    useEffect(()=>{
        if(!newPosts){
            callNewPosts()
          }
    },[])
    return(
        <div>
            {newPosts? newPosts.map((e,i)=>{
                return <TrabCard data = {e} key = {i} />
            }): ''}
        
        </div>
    )
}

export default IndexNewPosts;