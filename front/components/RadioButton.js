import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {FILTER_ORDERBY_SETTING} from '../action/action'

import '../css/RadioButton.scss'
const RadioButton = ({filterName, index})=>{
    const {filterOrderBy} = useSelector(state => state.post)
    const dispatch = useDispatch();
    const clickFilterCheckBox = ()=>{
        if(index === filterOrderBy) return
        dispatch({
            type: FILTER_ORDERBY_SETTING,
            data : index
        })
        let res;
        // switch(filterName){
        //     case '조회순' :
        //         res = await axios.get('아무튼url/아무튼조회순')
        //         break;
        //     case '평점순' :
        //         res = await axios.get('아무튼url/아무튼평점순')
        //         break;    
        //     case '후기순' :
        //         res = await axios.get('아무튼url/아무튼후기순')
        //         break;
        // }
        /*
            useDispatch({
                type: 필터링거는거 바꾸기,
                data : res.data
            })
        */
        
    }
    return(
        <div id = "checkbox_container" onClick = {clickFilterCheckBox}>
            <div className = {index === filterOrderBy ? "checked" : "unchecked"}></div>
            {filterName}
        </div>
    )
}

export default RadioButton