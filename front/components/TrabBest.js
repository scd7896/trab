import React from 'react'
import {useSelector} from 'react-redux'

import '../css/trabbest.scss'
const TrabBest = ({data, target})=>{
    const trabBest = useSelector(state=> state.post.trabBest)
    
    return(
        <div id = "trab_best_container" className = {target !==trabBest? "trab_best_none_display":"" }>
            <div id = "trab_best_image_container">
                <img id = "trab_best_image" src = {data.TrabBest_image} />
            </div>
            <div id = "trab_best_content">
                <div dangerouslySetInnerHTML={{__html: `${data.TrabBest_content}`}} />  
            </div>
        </div>
    )   
}

export default TrabBest