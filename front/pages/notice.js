import React from 'react'

const notice = ({noticeid})=>{
    console.log(noticeid)
    return(
        <div>
            {noticeid}번째 공지사항입니다
        </div>
    )
}
notice.getInitialProps = async(context)=>{
   console.log(context.query.headers);
    return {noticeid : context.query.noticeid}
}
export default notice;