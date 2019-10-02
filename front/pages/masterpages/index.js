import React,{useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Helmet from 'react-helmet'
const masterpages = ()=>{
    const me = 'master'
    useEffect(()=>{
        if(me!== 'master'){
            alert('접속권한이없습니다')
            Router.push('/')
        }
    },[])
    return(
        <div>
            
            <div><Link href = '/masterpages/seller'><button>판매자들보기</button></Link></div>
            <div><Link href = '/masterpages/sellerpost'><button>판매자신청보기</button></Link></div>
            <div><Link href = '/masterpages/trabpost'><button>여행계획신청보기</button></Link></div>
            <div><Link href = '/masterpages/postmanage'><button>여행계획관리하기</button></Link></div>
            <div><Link href = '/masterpages/notice'><button>공지사항쓰기</button></Link></div>
            <div><Link href = '/masterpages/adlist'><button>광고확인하기</button></Link></div>
            <div><Link href = '/masterpages/directmatching'><button>매칭관리하기</button></Link></div>
            
            <div><Link href = '/masterpages/news'><button>소식관리하기</button></Link></div>
            
        </div>
    )
}
/* 관리자가 들어오면 판매자신청과 여행판매계획,  */
export default masterpages