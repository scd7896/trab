import React from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import OneLineTema from '../../components/masterpages/OneLineTema'
const temalist = ()=>{
    return(
        <div>
            <p>테마리스트 관리하기</p>
            <Table>
                <TableHead>
                    <TableRow></TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
            </Table>
        </div>
    )
}

export default temalist