import React,{useState, useEffect} from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogAction from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Router from 'next/router'
import {useSelector, useDispatch} from 'react-redux'
import '../css/matching.scss'
import { MATCHING_SELLER_DATA_SET } from '../action/action'
import {url} from '../url'
const Matching = ({postid})=>{
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    
    const {mathingSellerData, me} = useSelector(state=>state.user)
    const openClick = async()=>{
        const etcText = document.querySelector('#textArea')
        
        const formData = {
            etc: etcText.value,
            seller_id :mathingSellerData.id,
            request_user : me.id
        } 
        
        const res = await axios.post(`${url}/api/post/directmatching`, formData).catch((err)=>{alert('새로고침 후 다시 시도해주세요')})
        setOpen(true)
    }
    const submitClick = ()=>{
        setOpen(false)
        
        Router.push('/')
    }
    const handleClose = ()=>{
        setOpen(false)
    }
    const handleCansle = ()=>{
        Router.back()
    }
    const callSellerDatas = async()=>{
        const res = await axios.get(`${url}/api/post/post/to/sellerdata/${postid}`).catch((err)=> alert("데이터를 못가져왔습니다"))
        dispatch({
            type : MATCHING_SELLER_DATA_SET,
            data : res.data
        })
        
    }
    useEffect(()=>{
        callSellerDatas()
        
    },[])
    return(
        <div>
            <div style = {{textAlign : "center",marginBottom : '10px'}}>
                <div id = 'matching_left'>
                    <img src = {mathingSellerData.image}></img>
                </div>
                <div id = 'matching_right'>
                    <p id = "matching_seller_name">설계자 이름 : {mathingSellerData.user_name}</p>
                    <p id = "matching_seller_intro">설계자 본인소개 : {mathingSellerData.intro} </p>
                </div>
            </div>
            <hr></hr>
            <div id = 'matching_bottom'>
               <textarea id = "textArea" maxLength = "500" placeholder ="꼭 가고 싶은 키워드를 정리해주세요"></textarea>
            </div>
            <div id = 'matching_action'>
                <Button variant="contained" color = "primary" onClick = {openClick} >신청하기</Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>신청되었습니다!</DialogTitle>
                    <DialogContent>
                        해당 설계자님과 빠른 시일에 매칭할 수 있도록 하겠습니다.
                    </DialogContent>
                    <DialogAction>
                        <Button variant="contained" color = "default" onClick = {submitClick}>확인</Button>
                        
                    </DialogAction>
                </Dialog>
                <Button onClick = {handleCansle} style = {{marginLeft : '10%'}} variant="contained" color = "secondary">취소</Button>
            </div>
        </div>
    )
}
Matching.getInitialProps = (context)=>{
    
    return {postid : context.query.postid}
}
export default Matching