import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Router from 'next/router'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import OneLineSeller from '../../components/masterpages/OneLineSeller'

import {seller, user} from '../../dummydatas/user'

import {url} from '../../url'
const sellers = ({res})=>{
    
    
    const [dataTables, setDataTables] = useState(res)
    console.log(dataTables)
    useEffect(()=>{
        if(user.user_rank !== '관리자'){
            alert('당신은 관리자가 아닙니다')
            Router.push('/')
        }
    },[])
    return(
        <div>
            <h2>설계자 관리</h2>
            <Table>
                <TableHead> 
                    <TableRow>
                        <TableCell>
                            설계자 고유번호
                        </TableCell>
                        <TableCell>
                            설계자 이름
                        </TableCell>
                        <TableCell>
                            설계자 계좌번호
                        </TableCell>
                        <TableCell>
                            설계자 프로필이미지
                        </TableCell>
                        <TableCell>
                            추천설계자
                        </TableCell>
                        <TableCell>
                            추천하기
                        </TableCell>
                        <TableCell>
                            자격박탈시키기
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataTables.map((e,i)=>{
                        return <OneLineSeller key = {i} data = {e} />
                    })}
                </TableBody>
            </Table>
            
        </div>
    )
}
sellers.getInitialProps = async(context)=>{
    const res = await axios.get(`${url}/masterapi/seller`) 
    return {res : res.data}
}
export default sellers