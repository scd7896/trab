import React from 'react'

const sellerconfigure = ({number})=>{
    return(
        <div>
            
        </div>

    )
}
sellerconfigure.getInitialProps = async(context)=>{
    return {number : context.query.number}
}
export default sellerconfigure