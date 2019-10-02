import React,{useEffect} from 'react'
import TopSellerData from '../components/targetSeller/TopSellerData'
import BottomSellerPosts from '../components/targetSeller/BottomSellerPosts'


const targetSeller = ({sellerid})=>{
    
    useEffect(()=>{
         
       
        
    },[])
    return(
        <div>
            <TopSellerData sellerid = {sellerid}></TopSellerData>
            <BottomSellerPosts sellerid={sellerid}></BottomSellerPosts>
        </div>
    )
}
targetSeller.getInitialProps= async(context)=>{
    return {sellerid : context.query.sellerid}
}
export default targetSeller;