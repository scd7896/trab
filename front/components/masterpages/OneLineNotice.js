import React from 'react'
import Router from 'next/router'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import {url} from '../../url'
const OneLineNotice = ({data, onReload})=>{

    const routeNoticeContents = ()=>{
        Router.push(`/notice/${data.id}`)
    }
    const noticeDelete = async()=>{
        const res = await axios.delete(`${url}/api/post/notice/${data.id}`).catch((err)=> alert('삭제실패'))
        alert('삭제성공')
        onReload()
    }
    return(
        <TableRow>
            <TableCell onClick = {routeNoticeContents}>
                {data.id}
            </TableCell>
            <TableCell>
                {data.notice_title}
            </TableCell>
            <TableCell>
                <img src = {data.notice_image} width = "60px" height = "60px" />
            </TableCell>
            <TableCell>
                {data.notice_createat}
            </TableCell>
            <TableCell>
                <Button onClick = {noticeDelete} variant = "contained" color = "secondary">삭제</Button>
            </TableCell>
        </TableRow>
    )
}

export default OneLineNotice;