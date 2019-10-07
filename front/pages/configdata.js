import React from 'react'
import axios from 'axios'
import Router from 'next/router'
import Button from '@material-ui/core/Button'
import HtmlParser from '../components/HtmlParser'
import {url} from '../url'

const configdata = ({configid, configData})=>{
    
    const rejectPost = async()=>{
        const res = await axios.delete(`${url}/api/master/sellerconfig/${configid}`)

        alert('삭제 성공했습니다')
        Router.push('/masterpages/sellerpost').then((value)=>{
            location.reload()
        }).catch((e)=>{
            location.reload()
        })
    }
    const successSeller = async()=>{
        const res = await axios.get(`${url}/api/master/sellerconfigconfirm/${configid}`)
        if(res.status === 200){
            await axios.delete(`${url}/api/master/sellerconfig/${configid}`)
            alert('업데이트 성공')
            Router.push('/masterpages/sellerpost').then((value)=>{
            location.reload()
            })
        }else{
            alert('업데이트 실패 새로고침 후 다시해주세요')
        }
        
    }
    return(
        <div>
            {configData?
                <HtmlParser data = {configData.contents}/> : ''
            }
            <p>{configData?
                configData.countryList : ''}</p>
            
            <Button variant = "contained" color="primary"
                onClick = {successSeller}>승인하기</Button>
            <Button variant = "contained" color="secondary"
                onClick = {rejectPost}>거절하기</Button>
        </div>
    )
}
configdata.getInitialProps = async(context)=>{
    const res = await axios.get(`${url}/api/master/sellerconfig/${context.query.configid}`)
    return{configid : context.query.configid, configData : res.data}
}
export default configdata;