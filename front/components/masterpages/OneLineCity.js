import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const OneLineCity = ({data})=>{
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
        </TableRow>
    )
}

export default OneLineCity;