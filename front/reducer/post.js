import produce from 'immer'
import {SET_TARGET_SELLER_DATA,SET_TARGET_SELLER_POSTS,SET_INDEX_SELLERS,SET_INDEX_POSTS,COUNTRY_ADD, COUNTRY_REMOVE,ADD_TEMA_LIST, REMOVE_TEMA_LIST,FILTER_ORDERBY_SETTING,CALL_POST_FAILURE,CALL_POST_SUCCESS, CALL_POST_REQUEST,NOTICE_NUM_SETTING,TRAB_BEST_SETTING, SET_MORE_INDEX_SELLER,SET_COUNTRY_LIST} from '../action/action'
const initalState = {
    nowPosts : [],//게시글 추가시에는 nowPost :  state.nowPost.concat(action.data)
    newSellers : [],
    lastId : 0,
    filterOrderBy : null, //순서 필터링
    noticeNum : 0, //메인 공지사항 보여줄 인덱스 넘버
    trabBest : 0, //트래비가 추천해주는 게시물
    weekBestPost : [], //이번주 최신 게시물
    weekBestPostFilter : '', // 이번주 최신 게시물 필터링
    citys : ["서울", "대전", "대구", "부산", "제주", "가평", "감자국"], 
    countries : ['미국', '중국', '일본',"대만", "러시아","유럽"], // trablepages 에서 뿌려줄 국가리스트
    selectedCountry : [], //나라별 늘리기,
    targetSellerPosts : [], //판매자 눌렀을때 계획표 출력
    targetSellerData : {}, // 판매자 눌렀을때 정보 출력
    masterPageCountries : [],
    masterPageCities : []
}
//has
const post =(state =initalState, action)=> {
    return produce(state, (draft)=>{
        switch(action.type){
            case TRAB_BEST_SETTING:
                draft.trabBest = action.data
                break
            case NOTICE_NUM_SETTING:
                draft.noticeNum = action.data
                break;
            case FILTER_ORDERBY_SETTING :
                draft.filterOrderBy = action.data
                break;
            case ADD_TEMA_LIST:
                draft.serchTema.push(action.data)
                break;
            case REMOVE_TEMA_LIST:
                draft.serchTema = draft.serchTema.filter((e)=> e!== action.data)
                break;
            case COUNTRY_ADD :
                draft.selectedCountry.push(action.data)
                break;
            case COUNTRY_REMOVE :
                const index = draft.selectedCountry.findIndex(action.data)
                draft.selectedCountry.splice(index,1)
                break;
            case SET_INDEX_POSTS :
                draft.newPosts = action.data
                break;
            case SET_INDEX_SELLERS :
                draft.newSellers = action.data
                break;
            case SET_TARGET_SELLER_POSTS:
                draft.targetSellerPosts = action.data
                break;
            case SET_MORE_INDEX_SELLER:
                action.data.map((e)=>{
                    draft.newSellers.push(e)
                })
                break;
            case SET_TARGET_SELLER_DATA :
                draft.targetSellerData = action.data
                break;
           
            case SET_COUNTRY_LIST :
                draft.masterPageCountries = action.data;
                break;
                
            case CALL_POST_REQUEST:
            case CALL_POST_SUCCESS :
            case CALL_POST_FAILURE :
            
            default : break;
    }
    })
   
}

export default post