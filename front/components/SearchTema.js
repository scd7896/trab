import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import '../css/SearchTemaComponent.scss'
import { ADD_TEMA_LIST, REMOVE_TEMA_LIST } from '../action/action';
const SearchTema = ({data})=>{
    const dispatch = useDispatch();
    const {serchTema} = useSelector(state=> state.post)
    const clickTema = ()=>{
        if(serchTema.indexOf(data) === -1){
            dispatch({
                type : ADD_TEMA_LIST,
                data : data
            })
        }else{
            dispatch({
                type : REMOVE_TEMA_LIST,
                data: data
            })
        }
    }
    return(
        <div id = "tema_button_container" onClick = {clickTema}>
            <div id = {serchTema.indexOf(data) !== -1 ? "checkbox" : "checkbox_checked"}></div>
            <p id = "tema_contens">{data}</p>
        </div>
    )   
}
export default SearchTema