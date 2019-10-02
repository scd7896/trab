import React,{useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'


import {SET_TARGET_SELLER_DATA} from '../../action/action'
import {url} from '../../url'
import '../../css/TopSellerData.scss'
const TopSellerData = ({sellerid})=>{
    const dispatch = useDispatch();
    const {targetSellerData} = useSelector(state=>state.user)
    
    const callTargetSellerData = async()=>{
        const res = await axios.get(`${url}/api/master/seller/data/${sellerid}`)
        console.log(res.data)
        dispatch({
            type : SET_TARGET_SELLER_DATA,
            data : res.data
        })
    }
    useEffect(()=>{
        
        callTargetSellerData()
        
    },[])
    return(
        <div>
            {targetSellerData? 
            <div id = "seller_data_container">
                <img src = {targetSellerData.image} width = "200px" height = "200px"/>
                <span id = "seller_user_name_text">판매자 이름 : {targetSellerData.user_name}</span>
            </div>
                :' 못가져옴'}
        </div>
    )
}

export default TopSellerData;