import React,{useEffect, useState} from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import axios from 'axios'

import OneLineSellerConfigure from '../../components/masterpages/OneLineSellerConfigure'
const sellerpost = ()=>{
    const [configureData, setConfigureData] = useState([])
    const callConfigData = async()=>{
        const res = await axios.get('http://127.0.0.1:9170/api/master/sellerconfig')
        
        if(res.status === 200){
            setConfigureData(res.data)
        }
    }
    useEffect(()=>{
        callConfigData();
    },[])
    return(
        <>
            <h2>설계자 신청 관리</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>설계자신청번호</TableCell>
                        <TableCell>프로필사진</TableCell>
                        <TableCell>계좌번호</TableCell>
                        <TableCell>한줄소개</TableCell>
                        <TableCell>유저명</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {configureData? configureData.map((e ,i)=>{
                        return <OneLineSellerConfigure data = {e} key = {i}/>
                    }): ''}
                </TableBody>
            </Table>
        </>
    )
}

export default sellerpost;