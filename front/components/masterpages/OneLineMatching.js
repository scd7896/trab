import React from 'react'
import Router from 'next/router'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import axios from 'axios'
const OneLineMathing = ({data})=>{
    
    const matchingData = ()=>{
        Router.push(`/reqetc/${data.id}`)
    }
    const buttonClick = async()=>{
        const res = axios.delete(`http://localhost:9170/api/master/matching/data/${data.id}`)
            .catch((err)=>{alert('새로고침 후 재시도 해주세요')})
        location.reload();
    }
    return(
        <TableRow>
            <TableCell onClick = {matchingData}>
                {data.id}
            </TableCell>
            <TableCell onClick = {matchingData}>
                {data.req_name}
            </TableCell>
            <TableCell onClick = {matchingData}> 
                {data.req_tel}
            </TableCell>
            <TableCell onClick = {matchingData}>
                {data.seller_name}
            </TableCell>
            <TableCell onClick = {matchingData}>
                {data.seller_tel}
            </TableCell>
            <TableCell onClick = {matchingData}>
                {data.bank_num}
            </TableCell >
            <TableCell >
                <Button onClick = {buttonClick} variant = "contained" color = "secondary">삭제</Button>
            </TableCell>
            
        </TableRow>
    )
}

export default OneLineMathing;