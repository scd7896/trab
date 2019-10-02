import React,{useEffect, useRef} from 'react'
import Button from '@material-ui/core/Button'
import axios from 'axios'

const EditPost = ({submitType})=>{
    let ReactQuill
    let quillRef = useRef()
    if(typeof window !== 'undefined'){
        ReactQuill = require('react-quill')
    }
    
    
    const quillModules = {
        toolbar :{
            container : [['bold', 'italic', 'underline', 'strike'], ['image']],
            handlers :{
                image : ()=>{
                    const input = document.createElement('input')
                    input.setAttribute('type', 'file')
                    input.setAttribute('accept', 'image/*')
                    input.setAttribute('method', 'post')
                    input.click()
                    input.addEventListener('change',async()=>{
                        const file = input.files[0]
                        const formData = new FormData()
                        
                        formData.append('image', file)
                        const quill = quillRef.current.getEditor()
                        const range = quill.getSelection(true);    
                        
                        //const res = await axios.post('http://localhost:8000/api/database/image/upload', formData) //image uplaod
                        // 업로드 하고 바로 api url 반환 합니다.
                        // json['api_url']
                        // 모든 db관련 api /api/database/~

                        // 이미지 가져오는 api = /api/database/image/get?image=이미지이름.jpg
                         // 태경 :받아온 res값을 콘솔에 찍는 함수입니다. 브라우저 환경에서 보시면 이대로 나올꺼에요

                        const res = await axios.post('http://localhost:9170/api/post/image',formData )
                        console.log(res.data)
                        quill.setSelection(range.index+1)
                        quill.deleteText(range.index, 1)
                        quill.insertEmbed(range.index, 'image',res.data)// 태경 : 이 함수가 quill js에 그림을 그려주는 함수입니다 res.data.api_url
                        // 태경 : 만약에 그려지지 않으면 40번 라인에 있는 콘솔에 있는 res를 참고해서 44번을 바꾸어주시면 감사하겠습니다
                        // 태경 : res.data.api_url에는 온전하게 url 주소가 그대로 넘어와야 프론트에서 받아서 처리할 수 있습니다

                    })
                }
            }
        }
    }
    
    

    /* 태경 : 서브밋 날릴 때의 작동 함수입니다 */
    const saveContents = ()=>{
        /* 태경 : 위에 로직대로 바이너리 파일을 주고 url 로직을 처리 하게 된다면 
         다음과 같은 json 형식으로 파일을 날릴 예정입니다. req.body.content 에 글 내용이 들어가고
         req.body.title에 글 제목이 들어가지만 아직 테스트 단계이고 추후에 유저 정보도 넣어야 되서 
         위에 로직을 우선 처리하고 이 부분은 로그인 문제해결후 마저 작성하면 됩니다 
         */
        submitType(quillRef.current.state.value)
        
        quillRef.current.state.value =''
    }
    useEffect(()=>{

    },[])
    return typeof window !== "undefined" && ReactQuill ? (
      <div>
          <div>
            <ReactQuill
                ref = {quillRef }
                placeholder = {'내용을 입력하시오'}
                modules = {quillModules}
                style = {{height : '400px'}}
            >
                
            </ReactQuill>
        </div>
            <div style ={{textAlign:'center', marginTop:'100px'}}>
                <Button variant = "contained" color="primary"
                onClick ={saveContents}>등록하기</Button>
                <Button variant = "contained" color="secondary"
                onClick ={saveContents} style = {{marginLeft : '10%'}}>취소하기</Button>    
            </div>            
      </div>
      
    ) : null;
  }

export default EditPost