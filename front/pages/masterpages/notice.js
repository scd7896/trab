import React from 'react'
import PostUpload from '../../components/PostUpload'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

const noticePost = ()=>{
    const noticePosting = (contents)=>{
        console.log(contents)
    }
    
    return(
        <div>
            <h2>공지사항 관리</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>공지사항번호</TableCell>
                        <TableCell>공지사항제목</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                </TableBody>
            </Table>            

            <PostUpload submitType = {noticePosting}></PostUpload>
        </div>
    )
}
export default noticePost;