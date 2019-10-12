import React,{useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import Router from 'next/router'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import {url} from '../url'

import {SET_MODAL_LISTS} from '../action/action'
const SearchDialog = ({keywordOpen = false, handleSearchClose =f=>f})=>{
    const dispatch = useDispatch();
    const [targetCity, setTargetCity] = useState('')
    const {modalCityLists, modalCountryLists} = useSelector(state=> state.post);
    const cityChange = (e)=>{
        setTargetCity(e.target.value)
    }
    const moveTargetSearch = ()=>{
        console.log("movemove")
    }
    const callAndSetLists = async()=>{
        const res = await axios.get(`${url}/api/post/countries`).catch((err)=>alert('국가정보 못가져옴'))
        const res2 = await axios.get(`${url}/api/post/cities`).catch((err)=>alert('도시정보 못가져옴'))
        dispatch({
            type : SET_MODAL_LISTS,
            citys : res2.data,
            countries : res.data
        })
    }
    useEffect(()=>{
        callAndSetLists();
    },[])
    return(
        <Dialog open = {keywordOpen} onClose = {handleSearchClose} style ={{borderRadius : '30px'}}>
            <DialogTitle>확인하고 싶은 도시를 선택하세요</DialogTitle>
            <DialogContent>
                {
                    modalCityLists !== null && modalCountryLists !== null ? 
                        <select onChange = {cityChange}>
                            {modalCountryLists.map((e,index)=>{
                                return(
                                    <optgroup key = {index} label = {e.country_name}>
                                        {
                                            modalCityLists.filter((city,jindex)=>{
                                                return city.country_name === e.country_name
                                            }).map((e,findex)=>{
                                                return(
                                                    <option value = {e.city_name}>
                                                        {e.city_name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </optgroup>
                                )   
                            })}
                        </select>
                    :'데이터 불러오는중'
                }
                <Button onClick = {moveTargetSearch} variant = "contained" color = "primary">확인</Button>
                <Button onClick = {handleSearchClose} variant = "contained" color = "secondary">취소</Button>
            </DialogContent>
                
        </Dialog>
    )
}

export default SearchDialog;