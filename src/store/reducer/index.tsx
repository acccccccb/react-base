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
        url:'/Home',
        name:'首页'
    }
],action) =>{
    switch (action.type) {
        case actionTypes.SET_TABLIST:
            return action.tabList;
        default:
            return state;
    }
};

// let rootReducer = combineReducers({
//     token,baseURL,menuList
// });
export default combineReducers({
    token,baseURL,menuList,tabList
});
