import React, {useState} from 'react'

const contact = ()=>{
    const [company,setCompany] = useState('')
    const [companyNum,setCompanyNum] = useState('')
    const [tel,setTel] = useState('')
    const [eMail,setEmail] = useState('')
    const [requirements,setREquirements] = useState('')
    
    const doContact = ()=>{
        console.log('승인보내기')
    }
    return(
        <div>
            <h1>Contac us</h1>
            <p>회사 / 개인 성명 :</p>
            <p>사업자 번호 :</p>
            <p>Tel : </p>
            <p>E-mail : </p>
            <p>목적(간략하게) : </p>
            <p>요구사항(세세하게) : </p>
            <button onClick = {doContact}>등록하기</button>
        </div>
    )
}

export default contact