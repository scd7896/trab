import React from 'react'
import Link from 'next/link'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
const OneLineSellerConfigure=({data})=>{
    return(
        <TableRow>
            <TableCell>
                <Link href = {{pathname : '/configdata', query :{configid : data.id}}} as = {`/configdata/${1}`}>
                    <a>
                        {data.id}
                    </a>
                </Link>
            </TableCell>
            <TableCell>
                <Link href = {{pathname : '/configdata', query :{configid : data.id}}} as = {`/configdata/${data.id}`}>
                    <a>
                        <img src = {data.sellerImage}
                            height = "150px" width = "250px"/>
                    </a>
                </Link>    
    
            </TableCell>
            <TableCell>
                <Link href = {{pathname : '/configdata', query :{configid : data.id}}} as = {`/configdata/${data.id}`}>
                    <a>
                        {data.bankNum}
                    </a>
                </Link>
            </TableCell>
            <TableCell>
                <Link href = {{pathname : '/configdata', query :{configid : data.id}}} as = {`/configdata/${data.id}`}>
                    <a>
                        {data.intro}
                    </a>
                </Link>
            </TableCell>
            <TableCell>
                <Link href = {{pathname : '/configdata', query :{configid : data.id}}} as = {`/configdata/${data.id}`}>
                    <a>
                        {data.user_name}
                    </a>
                </Link>
            </TableCell>
        </TableRow>
    )
}

export default OneLineSellerConfigure