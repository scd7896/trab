import React from 'react'
import ReactHtmlParser from 'react-html-parser'

import '../css/HtmlParser.scss'
const HtmlParser = ({data})=>{
    data = data.replace(/<img /gi, `<img id = "posts_in_images"`)
    return(
        <div id = "html_parser">{ReactHtmlParser(data)}</div>
    )
}

export default HtmlParser;