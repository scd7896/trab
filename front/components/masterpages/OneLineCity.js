import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import axios from 'axios'

import {url} from '../../url'

const OneLineCity = ({data, onReload})=>{
    const deleteCity = async()=>{
        const res = await axios.delete(`${url}/api/post/delete/city/${data.id}`).catch((err)=>alert('삭제실패'))
        if(res.status === 200){
            onReload();
        }
    }
    return(
        <TableRow>
            <TableCell>
                {data.id}
            </TableCell>
            <TableCell>
                {data.city_name}
            </TableCell>
            <TableCell>
                {data.country_name}
            </TableCell>
            <TableCell>
                <img src = {data.city_image} width = "80px" height = "80px"/>
            </TableCell>
            <TableCell>
                <Button onClick ={deleteCity} variant="contained" color = "secondary">삭제</Button>
            </TableCell>
        </TableRow>
    )
}

export default OneLineCity;