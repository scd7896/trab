import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import '../css/trablepages.scss'

import CityName from '../components/CityName'
import SliderLeftButton from '../components/SliderLeftButton'
import SliderRightButton from '../components/SliderRightButton'

const TrablePages = ({where})=>{
    const {citys, countries} = useSelector(state => state.post)
    const setting = {
      infinite : true,
      speed : 500,
      arrows: true,
      prevArrow : <SliderLeftButton />,
      nextArrow : <SliderRightButton/>,
      slidesToShow : 4,
      slidesToScroll : 2,
    }
    const mappingContent = where === 'korea' ? citys : countries
    return(
        <div>
          <div id = "trablepage_adzone">

          </div>
          <Slider {...setting} style = {{marginTop : "100px"}}>
            {mappingContent.map((city)=>{
              return <CityName name = {city} />
            })}
          </Slider>
        </div>
        
    )
}
TrablePages.getInitialProps = async(context)=>{
    /* 여기서 쿼리 파라미터에 있는 것을 서버에 요청해서 데이터를 받아오면 ssr로
        검색엔진 최적화 됨 */
    
    return {where : context.query.where}
}

export default TrablePages