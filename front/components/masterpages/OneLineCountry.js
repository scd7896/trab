import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import axios from 'axios'

import {url} from '../../url'

const OneLineCountry = ({data, onReload})=>{
    
    const onDelete = async()=>{
        const res = await axios.delete(`${url}/api/post/country/${data.id}`).catch((err)=>{alert("삭제실패")})
        onReload();
    }
    return(
        <TableRow>
            <TableCell>{data.id}</TableCell>
            <TableCell>{data.country_name}</TableCell>
            <TableCell>
                <img src = {data.country_image} width = "80px" hight = "80px"/>
            </TableCell>
            <TableCell><Button onClick = {onDelete} variant = "contained" color = "secondary">삭제하기</Button></TableCell>
        </TableRow>
    )
}

export default OneLineCountry;