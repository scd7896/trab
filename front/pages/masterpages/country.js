import React,{useEffect, useState} from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import axios from 'axios'

import OneLineCountry from '../../components/masterpages/OneLineCountry'
import {url} from '../../url'

const country = ()=>{
    const [countryData, setCountryData] = useState([])
    const [countryImg, setCountryImg] = useState();
    const [openMo, setOpenMo] = useState(false)
    const openModal = ()=>{
        setOpenMo(true);
    }
    const handleCloseConModal = ()=>{
        setOpenMo(false)
    }
    const addSubmitCountry = async()=>{
        const country_name = document.querySelector("#country_name")
        const nameValue = country_name.value
        const formData = new FormData();
        formData.append('image', countryImg)
        formData.append("country_name", nameValue)
        const res = await axios.post(`${url}/api/post/country`, formData).catch((err)=>{alert('추가실패')})
        callCountryData()
        setOpenMo(false)
    }
    const callCountryData = async()=>{
        const res = await axios.get(`${url}/api/post/countries`)
        setCountryData(res.data)
    }
    const selectCountryImg = ()=>{
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', "image/*")
        input.setAttribute('method', 'post')
        input.click()
        input.addEventListener('change', async()=>{
            const file = input.files[0]
            
            setCountryImg(file)
        })
    }
    useEffect(()=>{
        callCountryData();
    },[])
    return(
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            id
                        </TableCell>
                        <TableCell>
                            국가이름
                        </TableCell>
                        <TableCell>
                            국가대표 이미지
                        </TableCell>
                        <TableCell>

                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {countryData ? countryData.map((e,i)=>{
                        return <OneLineCountry data = {e} key = {i} onReload = {callCountryData}/>
                    }):''}
                </TableBody>
            </Table>
            <Button onClick = {openModal} variant = "contained" color = "primary">국가 추가하기</Button>
            <Dialog open = {openMo} onClose = {handleCloseConModal}>
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            추가 할 국가 이름을 적으세요
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="country_name"
                            fullWidth
                        />
                        <button onClick = {selectCountryImg}>대표이미지 선택</button>
                        <p>선택된 이미지 이름 : {countryImg? countryImg.name:'' }</p>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={addSubmitCountry} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
          </Dialog>
        </div>
    )
}

export default country;