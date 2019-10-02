import React from 'react'
import '../css/SliderButtons.scss'
const SampleNextArrow = (props) => {
    const { className, onClick} = props;
    return (
      <div
        className={className}
        id = "slider_left_button"
        onClick={onClick}
      />
    );
  }

  export default SampleNextArrow;