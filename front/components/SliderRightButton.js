import React from 'react'
import {Icon} from 'antd'
import '../css/SliderButtons.scss'
const SampleNextArrow = (props) => {
    const { className, onClick} = props;
    return (
      <div
        className={className}
        id = "slider_right_button"
        onClick={onClick}
      ><Icon type="caret-right" /></div>
    );
  }

  export default SampleNextArrow;