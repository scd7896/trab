import React, {useState, useRef,useEffect} from 'react'
import {useSelector} from 'react-redux'
import Router from 'next/router'
import axios from 'axios'
import {url} from '../url'

import PostUpload from '../components/PostUpload'
const sellerwrite = ()=>{
    
    let title
    const [image, setImage] = useState('')
    const [city, setCity] = useState('')
    const [cityId, setCityId] = useState(1)
    const {me} = useSelector(state => state.user)
    const submitPost = (postcontent)=>{
        if(!me.id || me.userRank ==='일반회원'){
            alert('판매자로 등급업 해주세요')
            Router.push('/')
            return;
        }
        const formdata = new FormData();
        
        formdata.append('post_content', postcontent)
        formdata.append('image', image)
        formdata.append('post_title', title.value)
        formdata.append('user_id', me.id)
        formdata.append('city_id', cityId)
        axios.post(`${url}/api/post/trabpost`,formdata)
        .then((value)=>{
            return alert('심사하겠습니다')
        }).then((value)=>{
            return Router.push('/')
        }).then((value)=>{
            location.reload();
        })
        .catch((err)=> console.log(err))
        
    }   
    const imageChange = (e)=>{
        setImage(e.target.files[0])
    }
    const setCityValue = (e)=>{
        setCityId(e.target.value)
    }
    const callCity = async()=>{
        const res = await axios.get(`${url}/api/post/city`)
            if(res.status === 200){
              
                setCity(res.data)
            }
    }
    useEffect(()=>{
        if(!city){
            callCity();
        }
        return;
    },[])
    
    return(
        <div>
            <div style = {{marginBottom : '50px'}}>
                <input type = 'file' onChange={imageChange} accept = "image/*"></input>                
                <div>
                    <input type = 'text' style = {{width : '250px'}} maxLength = {20}
                        ref = {el=>title = el} placeholder ="제목"></input>    
                    {city ? 
                        <select onChange = {setCityValue}>
                            {city.map((e,i)=>{
                                return(
                                    <option value = {e.id}  key = {i}>{e.city_name}</option>
                                )
                            })}
                        </select>
                        : ''}
                </div>
            </div>
            <PostUpload submitType ={submitPost}></PostUpload>
        </div>
    )
}

export default sellerwrite