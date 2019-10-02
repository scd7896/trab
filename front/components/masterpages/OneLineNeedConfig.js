import React from 'react'
import Link from 'next/link'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'


const OneLineNeedConfig = ({data})=>{
    const deleteTema = ()=>{

    }
    return(
        <TableRow>
            <Link href = {{pathname : '/postcontent', query :{postid : data.id}}} as = {`/postcontent/${data.id}`}>
                <TableCell><a>{data.id}</a></TableCell>
            </Link>
            <Link href = {{pathname : '/postcontent', query :{postid : data.id}}} as = {`/postcontent/${data.id}`}>
                <TableCell>{data.title}</TableCell>
            </Link>
            <TableCell><img src = {data.image} width = "60px" height = "60px"/></TableCell>
            <TableCell>{data.name}</TableCell>
            
        </TableRow>
    )
}

export default OneLineNeedConfig