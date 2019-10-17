import React,{useEffect,useState} from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Link from 'next/link'
import axios from 'axios'
import OneLineAd from '../../components/masterpages/OneLineAd'
import {url} from '../../url'
const adlist = ()=>{
    const [adLists, setAdLists] = useState()
    const callAdLists = async()=>{
        const res = await axios.get(`${url}/api/post/adlists`).catch((e)=>alert('데이터 못가져왔습니다'))
        setAdLists(res.data)
    }   
    useEffect(()=>{
        callAdLists();
    },[])
    return(
        <div style ={{textAlign : 'center'}}>
            <h2>광고 게시글 관리하기</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>고유번호</TableCell>
                        <TableCell>광고대표이미지</TableCell>  
                        <TableCell>광고마감날짜</TableCell>
                        <TableCell>광고하는위치</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        adLists? adLists.map((e,i)=>{
                            return <OneLineAd onReload = {callAdLists} data = {e} key = {i} />
                        }):'데이터를 불러오고있습니다.'
                    }
                </TableBody>
            </Table>
            <div style = {{textAlign : 'right', marginTop : '50px', marginRight : '50px'}}>
                <Link href = "/masterpages/adwrite">광고게시물 추가</Link>
            </div>
        </div>
    )
}
export default adlist;