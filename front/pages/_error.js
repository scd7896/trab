import Error from 'next/error'
import React from 'react'

const MyError = ({statusCode})=>{
    return(
        <div>
            <h1>{statusCode}에러발생</h1>
            
        </div>
    )
}
MyError.getInitialProps = async(context)=>{
    const statusCode = context.res ? context.res.statusCode : context.err? context.err.statusCode : null;
    return {statusCode}
}
export default MyError;