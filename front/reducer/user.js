import {MATCHING_SELLER_DATA_SET,SET_TARGET_SELLER_DATA,LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAILURE, SET_USER_SETTING, USER_LOG_OUT} from '../action/action'
import produce from 'immer'
const initalState = {
    me : {},
    targetSellerData : {},
    mathingSellerData : {}
}

const user =(state =initalState, action)=> {
    return produce(state, (draft)=>{
        switch(action.type){
         
            case SET_USER_SETTING : 
                draft.me = action.data
                break;
            case USER_LOG_OUT :
                draft.me = {}
                break;
            case SET_TARGET_SELLER_DATA :
                draft.targetSellerData = action.data
                break;           
            case MATCHING_SELLER_DATA_SET :
                draft.mathingSellerData =action.data
                break;
            default : break;
        }
    })
    
}

export default user