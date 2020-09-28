import { combineReducers } from 'redux'
import * as actionTypes from '../action/actionTypes'

let token = (state='',action) =>{
    switch (action.type) {
        case actionTypes.SET_TOKEN:
            return action.token;
        default:
            return state;
    }
};
let baseURL = (state='',action) =>{
    switch (action.type) {
        case actionTypes.SET_BASEURL:
            return action.baseURL;
        default:
            return state;
    }
};

let menuList = (state=[],action) =>{
    switch (action.type) {
        case actionTypes.SET_MENULIST:
            return action.menuList;
        default:
            return state;
    }
};

let tabList = (state=[
    {
        id:1,
        path:'/Home',
        name:'首页'
    },
],action) =>{
    switch (action.type) {
        case actionTypes.SET_TABLIST:
            return action.tabList;
        case actionTypes.ADD_TABLIST:
            let filter = state.filter((item)=>{
                return item.id===action.tabList.id;
            });
            if(filter.length===0) {
                return [
                    ...state,
                    action.tabList
                ];
            } else {
                return state;
            }
        case actionTypes.REMOVE_TABLIST:
            let newState = [...state];
            newState.splice(action.tabIndex,1);
            return newState;
        default:
            return state;
    }
};

// let rootReducer = combineReducers({
//     token,baseURL,menuList
// });
export default combineReducers({
    token,baseURL,menuList,tabList,
});
