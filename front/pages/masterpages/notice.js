import React,{useState} from 'react'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import Router from 'next/router'
import axios from 'axios'

import OneLineNotice from '../../components/masterpages/OneLineNotice'
import {url} from '../../url'
const noticePost = ({data})=>{
    const[noticeData, setNoticeData] = useState(data)
    const noticeWrite= ()=>{
        Router.push('/masterpages/writenotice');
    }
    const reloadData = async()=>{    
        const res = await axios.get(`${url}/api/post/addnotice`).catch((err)=> alert('에러남 새로고침 요청'))
        setNoticeData(res.data)
    }
    return(
        <div>
            <h2>공지사항 관리</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>공지사항번호</TableCell>
                        <TableCell>공지사항제목</TableCell>
                        <TableCell>공지사항대표사진</TableCell>
                        <TableCell>공지사항생성일</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {noticeData ?  noticeData.map((e,i)=>{
                        return <OneLineNotice onReload = {reloadData} data = {e} key = {i} />
                    }):''}
                </TableBody>
            </Table>            

            <Button onClick = {noticeWrite} variant = "contained" color = "default">공지사항쓰기</Button>
        </div>
    )
}

noticePost.getInitialProps = async(context)=>{
    const res = await axios.get(`${url}/api/post/addnotice`)
    return {data : res.data}
}
export default noticePost;