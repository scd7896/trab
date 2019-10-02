import React from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Router from 'next/router'
import axios from 'axios'

import OneLineData from '../../components/masterpages/OneLineNeedConfig'
const trabpost = ({postList})=>{
   
    return(
        <div>
            <h2>여행계획 등록 확인</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>게시글번호</TableCell>
                        <TableCell>게시글제목</TableCell>
                        <TableCell>게시글대표사진</TableCell>
                        <TableCell>게시글작성자</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {postList ? postList.map((e,i)=>{
                        return <OneLineData data = {e} key = {i} />
                    }): ""}
                </TableBody>
            </Table>
        </div>
    )
}
trabpost.getInitialProps = async(context)=>{
    const res = await axios.get('http://localhost:9170/api/master/trabpost/config/need')
            .catch((err)=>{
                Router.back();
            })
    return{postList : res.data}
}

export default trabpost;