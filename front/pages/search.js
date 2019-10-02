import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import RadioButton from '../components/RadioButton'
import SearchTema from '../components/SearchTema'
const search = ({text})=>{
    const tema = ['맛집', '명소', '멋진뷰']
    const moreContents = ()=>{
        //더보기를 구현해보자
    }
    return(
        <div>
            <div>
                <button>영국</button>
            </div>
            <div>
                <div id = 'filter_container'>
                    필터 
                    {['평점순' , '조회순', '후기순'].map((e,i)=>{
                        return <RadioButton key = {i} filterName = {e} index = {i}/>
                    })}
                </div>
                
                <div id = 'tema_container'>
                    테마
                    {tema.map((e,i)=>{
                        return(<SearchTema key = {i} data = {e}/>)  
                    })}
                </div>
                <div id = 'posts_container'>
                    무언가 데이터가 입빠이하게 들어갈것이다.
                </div>
                <button onClick = {moreContents}>더 보기</button>
            </div>
        </div>
    )
}

search.getInitialProps = async(context)=>{
    //데이터 가져와서 데이터.map으로 돌려라
    console.log(context)
    return {text : context.query.text}
}

export default search