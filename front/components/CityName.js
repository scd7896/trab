import React from 'react'

import "../css/CityName.scss"

const CityName = ({name})=>{
    return(
        <div id = "city_circle">
            <img id = "city_back_image" src = {name.cimage} />
            <p id = "city_front_contents">{name.cname}</p>
        </div>  
    )
}
export default CityName