import React from 'react'

const adcontent = ()=>{
    return(
        <div>

        </div>
    )
}
adcontent.getInitialProps = async(context)=>{
    console.log(context.query.id)
    return{}
}
export default adcontent