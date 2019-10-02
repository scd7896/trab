import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import OneLineMatching from '../../components/masterpages/OneLineMatching'

const Direct = ()=>{
    const [lists, setLists] = useState();
    const callMatchingLists = async()=>{
        const res = await axios.get('http://localhost:9170/api/master/matching/datas').catch((err)=> alert('데이터를 못가져왔습니다'))
        setLists(res.data);
    }
    useEffect(()=>{
        callMatchingLists()
    },[])
    return(
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            고유번호
                        </TableCell>
                        <TableCell>
                            신청자 이름
                        </TableCell>
                        <TableCell>
                            신청자 연락처
                        </TableCell>
                        <TableCell>
                            판매자 이름
                        </TableCell>
                        <TableCell>
                            판매자 연락처
                        </TableCell>
                        <TableCell>
                            판매자 계좌번호
                        </TableCell>
                        <TableCell>
                            삭제하기
                        </TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lists ? lists.map((e,i)=>{
                        return <OneLineMatching key = {i} data = {e} />
                    }):''}
                </TableBody>
            </Table>
        </div>
    )   
}

export default Direct