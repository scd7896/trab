import React from 'react'
import Link from 'next/link'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'


const OneLineSeller = ({data})=>{
    const bestSwitch =()=>{
        if(data.seller_best){
            //axios.put(`/${data.seller_id}/true`)
        }else{
            //axios.put(`/${data.seller_id}/false`)
        }
    }
    const deleteSeller = ()=>{
        //axios.delete(`/${data.seller_id}`)
        
    }
    return(
        <TableRow id = "table_row">
            <TableCell>
                {data.pk}
            </TableCell>
            <TableCell>
                {data.fields.user_primary_id}
            </TableCell>
            <TableCell>
                {data.fields.seller_bank_num}        
            </TableCell>
            <TableCell>
                <img src = {data.seller_image} height = "60px" width = "60px"/>
            </TableCell>
            <TableCell>
                {data.fields.seller_best? "추천판매자" : ""}
            </TableCell>
            <TableCell>
                <button onClick = {bestSwitch}>{data.fields.seller_best? "추천해제" : "추천하기"}</button>
            </TableCell>      
            <TableCell>
                <button onClick = {deleteSeller}>
                    자격박탈시키기
                </button>
            </TableCell>
        </TableRow>   
    )
}

export default OneLineSeller;