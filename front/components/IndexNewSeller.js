import React,{useEffect, useState} from'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import {SET_INDEX_SELLERS, SET_MORE_INDEX_SELLER} from '../action/action'
import SellerCard from './SellerCard'

const IndexNewSeller = ()=>{
    const dispatch = useDispatch();
    const [more, setMore] = useState(true)
    const {newSellers} = useSelector(state=> state.post)    
    const callNewSellers = async()=>{
        const sellers = await axios.get('http://localhost:9170/api/post/seller/config/true')
        dispatch({
            type: SET_INDEX_SELLERS,
            data : sellers.data
        })
      }

    const moreSellerCall = async()=>{
        const lastSellerid = newSellers[newSellers.length-1].id
        
        const moreSeller = await axios.get(`http://localhost:9170/api/post/seller/config/true/${lastSellerid}`)
        if(moreSeller.data.length === 0 ) {
            setMore(false)
            return;
        }
        else{
            dispatch({
                type : SET_MORE_INDEX_SELLER,
                data : moreSeller.data
            })
        }
    }
    useEffect(()=>{
        
        if(newSellers.length ===0){
            callNewSellers()
          }
    },[])
    return(
        <div>
            <div>
                {newSellers ? newSellers.map((e,i)=>{
                    return <SellerCard data = {e} key = {i}/>
                }):''}
            
            </div>
            {more ? 
                <Button onClick = {moreSellerCall} style = {{marginTop: '50px'}}variant ="contained" color = "default">설계자 명단 더 보기</Button>   :''}
            
        </div>
        
    )
}

export default IndexNewSeller;