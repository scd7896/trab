import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'next/link'
import Router from 'next/router'
import {Icon} from 'antd'
import {useSelector, useDispatch} from 'react-redux'


import '../css/menuButton.scss'
import { USER_LOG_OUT } from '../action/action';




const MenuList = ()=>{
    
    
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const [sevAnchorEl, setSaveAnchorEl] = useState(null);
    const {me} = useSelector(state=>state.user)
    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }
    const subMenuOpen = (event)=>{
        setSaveAnchorEl(event.currentTarget)
    }
    function handleClose() {
        setAnchorEl(null);
        setSaveAnchorEl(null);
    }
    const moveToMasterpages = ()=>{
        Router.push('/masterpages')
    }
    const logOut = ()=>{
        sessionStorage.removeItem('usertoken')
        dispatch({
            type : USER_LOG_OUT
        })
    }
  return (
    <>
        <div id = "header_left" style ={{position : 'relative'}}>
            <Link as= {'/'} href = '/'>
                <a style ={{position : 'absolute', cursor: "pointer",display : 'inline-block', marginLeft :'5%', marginRight:'3%'}} >
                    <img src = 'https://kr.object.ncloudstorage.com/trabimg/biglogo.png' style = {{width:'60px', height: '60px'}}/>
                </a>
            </Link>
            <Button id = "menu-button" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <Icon style = {{color : 'yellow'}}type="menu" />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                
            >   
                {me.id?<MenuItem onClick={handleClose}><a style = {{ textDecoration : 'none'}}>마이페이지</a></MenuItem>
                    :<MenuItem onClick={handleClose}><Link href = '/signin'><a style = {{ textDecoration : 'none'}}>로그인/회원가입</a></Link></MenuItem> }
                <MenuItem onClick={subMenuOpen}><Link href = {{pathname : '/trablepages'}}><a style = {{ textDecoration : 'none'}}>국내/해외여행</a></Link></MenuItem>
                <MenuItem onClick={handleClose}><Link href = '/sellerlist'><a style = {{ textDecoration : 'none'}}>트래비(trab) 설계자 명단</a></Link></MenuItem>
                {me.userRank ==='일반회원' ? <MenuItem onClick={handleClose}><Link href = {'/seller'}><a style = {{ textDecoration : 'none'}}>설계자 등록하기</a></Link></MenuItem>:
                    <MenuItem onClick={handleClose}><Link href = {'/sellerwrite'}><a style = {{ textDecoration : 'none'}}>여행계획판매하기</a></Link></MenuItem>}
                {me.userRank ==='관리자' ?<MenuItem onClick={handleClose}><Link href = '/masterpages'> 관리자 </Link></MenuItem>:
                    ''}
            </Menu>    
        </div>
        <div id = "navigation">
            <ul className = "nav-links">
                {me.id?  <Link href = {`/mypage`}><li>마이페이지</li></Link>:<Link href = "/signin"><li>로그인/회원가입</li></Link>}
                {me.id? <li onClick = {logOut}>로그아웃</li> : ''}
                <Link href = '/allpost'><li>국내/해외여행</li></Link>
                <Link href = "/sellerlist"><li>설계자명단</li></Link>
                {me.userRank ==='일반회원'? <Link href = "/seller"><li>판매자등록하기</li></Link> :
                    me.userRank ==="관리자"||me.userRank ==="판매자"? 
                    <Link href = "/sellerwrite"><li>여행계획판매하기</li></Link> 
                        :''}
                {me.userRank ==='관리자' ?<li onClick = {moveToMasterpages}>관리자 </li>: ''}
            </ul>
            
        </div>
        {me.id? <p id = "user_name">{me.userName} 님</p> : ''}
        
    </>
  )
}

export default MenuList