import React from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Link from 'next/link'
const adlist = ()=>{
    return(
        <div style ={{textAlign : 'center'}}>
            <h2>광고 게시글 관리하기</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>광고대표이미지</TableCell>
                        <TableCell>광고제목</TableCell>  
                        <TableCell>광고마감날짜</TableCell>
                        <TableCell>광고하는위치</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
            </Table>
            <div style = {{textAlign : 'right', marginTop : '50px', marginRight : '50px'}}>
                <Link href = "/masterpages/adwrite">광고게시물 추가</Link>
            </div>
        </div>
    )
}
export default adlist;