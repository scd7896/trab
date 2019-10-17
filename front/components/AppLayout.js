import React,{useEffect} from "react";
import {Row, Col} from 'antd'
import MenuList from './MenuList'
import {useSelector, useDispatch} from 'react-redux'
import jwtDecode from 'jwt-decode'

import {SET_USER_SETTING} from '../action/action'
import '../css/header.scss'
import '../css/container.scss'

const AppLayout =({children})=> {
    const {me} = useSelector(state=> state.user)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        
        if(!me.id && sessionStorage.usertoken){
        const token = sessionStorage.usertoken;
        const decode = jwtDecode(token)
        dispatch({
            type : SET_USER_SETTING,
            data : decode
        })
        }
       
    },[])
    return (
        <div id = "root_layout">
            <Row id = 'headerBackground'>
                <Col md = {12}>
                    <MenuList></MenuList>
                </Col>
            </Row>
            <Row gutter = {10} id = "contents">
                <div className = "container">
                    <Col xs = {24} md = {12}>
                        {children}
                    </Col>   
                </div> 
            </Row>
            <Row >
                <div id ='footer'>
                    <p>About us</p>
                    <p>Contact</p>
        
                </div>
            </Row>
        
      </div>
    )
}

export default AppLayout