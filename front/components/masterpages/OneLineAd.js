import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import Router from 'next/router'
import axios from 'axios'
import {url} from '../../url'
const OneLineAd = ({data, onReload})=>{
    const deleteAd = async()=>{
        const res = await axios.delete(`${url}/api/post/adlists/${data.id}`).catch((err)=>alert('삭제실패'))
        onReload();
    }
    const moveToAdContentPage = ()=>{
        
        Router.push(`/masterpages/adcontent/${data.id}`)
    }
    return(
        <TableRow>
            <TableCell onClick = {moveToAdContentPage}>{data.id}</TableCell>
            <TableCell onClick = {moveToAdContentPage}><img src = {data.image} width = "60px" height = "60px" /></TableCell>
            <TableCell onClick = {moveToAdContentPage}>{data.id}</TableCell>
            <TableCell onClick = {moveToAdContentPage}>{data.iskorea === 1?"한국" : '외국'}</TableCell>
            <TableCell><Button onClick = {deleteAd} variant = "contained" color = "secondary">삭제</Button></TableCell>
        </TableRow>
    )
}

export default OneLineAd