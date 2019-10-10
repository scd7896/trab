import React from 'react'
import Link from 'next/link'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import axios from 'axios'

import {url} from '../../url'

const OneLineSeller = ({data, onReload})=>{
    const bestSwitch =()=>{
        if(data.seller_best){
            //axios.put(`/${data.seller_id}/true`)
        }else{
            //axios.put(`/${data.seller_id}/false`)
        }
    }
    const deleteSeller = async()=>{
        const res = await axios.delete(`${url}/api/master/seller/${data.id}`).catch((err)=> alert('삭제실패'))
        onReload();
    }
    return(
        <TableRow id = "table_row">
            <TableCell>
                {data.id}
            </TableCell>
            <TableCell>
                {data.user_name}
            </TableCell>
            <TableCell>
                {data.seller_bank_num}        
            </TableCell>
            <TableCell>
                <img src = {data.seller_profile_image} height = "60px" width = "60px"/>
            </TableCell>
            <TableCell>
                {data.seller_best !==0? "추천판매자" : ""}
            </TableCell>
            <TableCell>
                <button onClick = {bestSwitch}>{data.seller_best? "추천해제" : "추천하기"}</button>
            </TableCell>      
            <TableCell>
                <Button onClick = {deleteSeller} variant = "contained" color = "secondary">
                    자격박탈시키기
                </Button>
            </TableCell>
        </TableRow>   
    )
}

export default OneLineSeller;