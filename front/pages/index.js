import React,{useState, useEffect} from "react";
import {Icon} from 'antd'
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import {useSelector, useDispatch} from 'react-redux'
import Helmet from 'react-helmet';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "slick-carousel/slick/slick.css";
import '../css/indexComponent.scss'
import '../css/container.scss'
import {url} from '../url'
import IndexNewPosts from '../components/IndexNewPosts'
import IndexNewSeller from '../components/IndexNewSeller'
import {NOTICE_NUM_SETTING,TRAB_BEST_SETTING} from '../action/action'

const Index = ({noticeData})=>{
  /* Todo : 공지사항 리스트를 가져와서 화면에 뿌려줄것 */
  const dispatch = useDispatch()
  const {noticeNum, trabBest} = useSelector(state=> state.post)
  const [keywordOpen , setKeywordOpen] = useState(false)
  const searchKeyword = ()=>{
    setKeywordOpen(!keywordOpen);
  }
  const handleSearchClose = ()=>{
    setKeywordOpen(false)
  }
  
  const left = "<"
  const right = ">"
  const leftClik = ()=>{
    if(noticeNum === 0 ) return
    dispatch({
      type : NOTICE_NUM_SETTING,
      data : noticeNum -1
    })
  }
  const rightClick =()=>{
    if(noticeNum === noticeData.length-1) return
    dispatch({
      type : NOTICE_NUM_SETTING,
      data : noticeNum +1
    })
  }
  
  
  useEffect(()=>{
   
    
    //const sellers = await axios.get('http://localhost:9170/seller/config/true')
    
    let autoNoticeChange = setInterval(()=>{
      if(noticeNum < noticeData.length-1){
        dispatch({
          type: NOTICE_NUM_SETTING,
          data: noticeNum+1
        })
      }else{
        dispatch({
          type: NOTICE_NUM_SETTING,
          data : 0
        })
      }
    },5000)
    
    return ()=> clearInterval(autoNoticeChange)
  },[])

  return(
    <div id = 'root'>
      <div >
        <Helmet 
                  title = {'TraB'}
                  description = {'안녕하세요 TraB입니다'}
                  meta = {[{
                      name : 'description', content : '안녕하세요 TraB입니다'
                  },{
                      property : 'og:title', content : 'TraB 여행을 떠나요'
                  },{
                      property : 'og:image', content : 'https://kr.object.ncloudstorage.com/trabimg/biglogo.png'
                  },{
                      property : 'og:url', contnet : 'http://localhost:8081/'
                  }]}
              />   
        <div id = "notice">
          <div id = "notice_content">
            {noticeData.map((v,i)=>{
              return <Link key = {i} href = {{pathname : '/notice', query:{noticeid:v.id}}} as ={`/notice/${v.id}`}>
                      <img id = {i=== noticeNum? "notice_image" : "notice_image_none"} src = {v.notice_image} />
                  </Link>
            })}
          </div>

          <div id = "notice_navigator">
            <button className="notice_button" onClick = {leftClik}>{left}</button>
              {noticeNum+1}/{noticeData.length}
            <button className = "notice_button" onClick = {rightClick}>{right}</button>
          </div>
          <div id = "search" onClick = {searchKeyword} ></div>
          <Dialog open = {keywordOpen} onClose = {handleSearchClose}>
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates
                occasionally.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSearchClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSearchClose} color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div id = "trable_selector">
            <Link href = {{pathname : "/trablepages", query :{where : 'korea'}}} as = '/trablepages/korea'>
              <div className = "select_left">
                <h2>국내여행 열람하기</h2>
              </div>
            </Link>
            
            <Link href = {{pathname : "/trablepages", query :{where : 'overseas'}}} as = '/trablepages/overseas'>
              <div className = "select_right">
                <h2>해외여행 열람하기</h2>  
              </div>
            </Link>
        </div>

        <div id = "country_best">
          <h2> 최근 등록된 게시물 입니다 </h2>
          <IndexNewPosts/>
        </div>
        <div id = "new_sellers"
          //마찬가지로 화면에 뿌려줄 카드에 들어갈 컨텐츠 상의후 진행
        >
          <h2>최근 등록된 설계자들 입니다!</h2>
          <IndexNewSeller/>
          
        </div>
      </div>
    </div>
  )
}
Index.getInitialProps = async(context)=>{
  const res = await axios.get(`${url}/api/post/addnotice`).catch((err)=> console.log(err))
  
  return {noticeData : res.data} 
}
export default Index;
