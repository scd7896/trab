import React,{useEffect,useState} from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import axios from 'axios'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import {useSelector, useDispatch} from 'react-redux'
import OneLineCity from '../../components/masterpages/OneLineCity'
import {url} from '../../url'
import { SET_COUNTRY_LIST } from '../../action/action'

const city = ()=>{
    const dispatch = useDispatch();
    const {masterPageCountries} = useSelector(state=>state.post)
    const [cityLists, setCityLists] = useState([])
    
    const [selCountry, setSelCountry] = useState('')
    const [cityImg, setCityImg] = useState()
    const [addCityOpen, setAddCityOpen] = useState(false)
    const openCityModal = ()=>{
        setAddCityOpen(true)
    }
    const cityImgChange = (e)=>{
        setCityImg(e.target.files[0])
    }
    const submitCityAdd = async()=>{
        const city_name = document.querySelector("#add_city_name")
        const cityNameValue = city_name.value;
        const formData = new FormData();
        formData.append('city_name', cityNameValue)
        formData.append('country_id', selCountry )
        formData.append('image', cityImg)
        
        const res = await axios.post(`${url}/api/post/add/city`, formData).catch((err)=> {alert('에러났음')})
        location.reload();
    }
    const setCountryValue = (e)=>{
        setSelCountry(e.target.value)
        
    }
    const callCityLists = async()=>{
        const res = await axios.get(`${url}/api/post/cities`).catch((err)=> alert('에러났음'))
        setCityLists(res.data)
    }
    const callCountryData = async()=>{
        const res = await axios.get(`${url}/api/post/countries`)
        dispatch({
            type : SET_COUNTRY_LIST,
            data : res.data
        })
    }
    const handleCloseCityModal = ()=>{
        setAddCityOpen(false);
    }
    useEffect(()=>{
        callCityLists();
        callCountryData()
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
                            도시이름
                        </TableCell>
                        <TableCell>
                            국가이름
                        </TableCell>
                        <TableCell>
                            대표이미지
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cityLists ? cityLists.map((e, i)=>{
                        return <OneLineCity data = {e} key = {i} />
                    }):''}
                </TableBody>
            </Table>
            <Button onClick = {openCityModal}>도시 추가</Button>
            <Dialog open = {addCityOpen} onClose = {handleCloseCityModal}>
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {}
                        </DialogContentText>
                        <div>
                            <span>국가를 선택하세요 : </span>{masterPageCountries? <select onChange = {setCountryValue}>
                                {masterPageCountries.map((e,i)=>{
                                    return(
                                        <option value = {e.id}  key = {i}>{e.country_name}</option>
                                    )
                                })}
                            </select> : ''}
                        </div>
                        <div style = {{marginTop : "50px", marginBottom : "30px"}}>
                            <span>도시 이름 : </span> <TextField id = "add_city_name"/>
                        </div>
                        <input type = 'file' onChange = {cityImgChange} accept = "image/*"></input>    
                    </DialogContent>
                <DialogActions>
                    <Button onClick = {submitCityAdd} variant = "contained" color = "primary">확인</Button>
                    <Button onClick = {handleCloseCityModal} variant = "contained" color = "secondary">취소</Button>
                </DialogActions>
          </Dialog>
        </div>
    )
}

export default city;