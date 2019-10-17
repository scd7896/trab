import React,{useState} from 'react'
import { DatePicker } from '@y0c/react-datepicker';
import axios from 'axios'
import HtmlParser from '../../components/HtmlParser'
import {url} from '../../url'
import '@y0c/react-datepicker/assets/styles/calendar.scss';

const adcontent =({data})=>{
    console.log(data)
    return(
        <div>
            <DatePicker id = "date_picker" showToday />
            <HtmlParser data = {data.content}/>
        </div>
    )
}

adcontent.getInitialProps = async(context)=>{
    const id = context.query.id;
    const res = await axios.get(`${url}/api/post/adlist/${id}`).catch((err)=> console.log(err))

    return{data : res.data}
}

export default adcontent