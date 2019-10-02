import React,{useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'

import TrabCard from '../TrabCard'
import {SET_TARGET_SELLER_POSTS} from '../../action/action'
import '../../css/BottomSellerPosts.scss'
const BottomSellerPosts = ({sellerid})=>{
    const dispatch = useDispatch();
    const {targetSellerPosts} = useSelector(state => state.post)
    const [check, setCheck] = useState(false)
    const callTargetSellerPosts = async()=>{
        const res = await axios.get(`http://localhost:9170/api/master/seller/posts/${sellerid}`)
       
       
        dispatch({
            type : SET_TARGET_SELLER_POSTS,
            data : res.data
        })
       
    }
    useEffect(()=>{
        
        callTargetSellerPosts()
        
    },[])
    return(
        <div id = "post_card_container">
            {targetSellerPosts.length >= 1 ? 
                targetSellerPosts.map((e,i)=>{
                    return <TrabCard data = {e} key = {i} />})
                : ''}
        </div>
    )
}

export default BottomSellerPosts;