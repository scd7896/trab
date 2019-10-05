import React from 'react'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import Router from 'next/router'
const noticePost = ()=>{
    
    const noticeWrite= ()=>{
        Router.push('/masterpages/writenotice');
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                </TableBody>
            </Table>            

            <Button onClick = {noticeWrite} variant = "contained" color = "default">공지사항쓰기</Button>
        </div>
    )
}
export default noticePost;