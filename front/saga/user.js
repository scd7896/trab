import {all, delay,fork, takeEvery,takeLatest, call,put,take} from 'redux-saga/effects'
import {LOAD_USER_SUCCESS,LOAD_USER_REQUEST,LOAD_USER_FAILURE} from '../action/action'
function loadUSerAPI(userid){
    //todo
    return 
}

function* loadUSer (action){
    try{
        const result = yield call(loadUSerAPI, action.data)
        yield put({
            type : LOAD_USER_SUCCESS,
            data : result.data,
            me: !action.data
        })
    }catch(e){
        yield put({
            type : LOAD_USER_FAILURE,
            error : e
        })
    }
}

function* watchLoadUSer(){
    yield takeEvery(LOAD_USER_REQUEST, loadUSer)
}
export default function* userSaga(){
    yield all([
        fork(watchLoadUSer)

    ])
}