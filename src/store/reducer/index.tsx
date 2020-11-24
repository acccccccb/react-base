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

let activeUrl = (state='/Login',action) =>{
    switch (action.type) {
        case actionTypes.SET_ACTIVE_URL:
            return action.activeUrl;
        default:
            return state;
    }
};

let theme = (state='light',action) =>{
    switch (action.type) {
        case actionTypes.SET_THEME:
            return action.theme;
        default:
            return state;
    }
};

let collapsed = (state=false,action) =>{
    switch (action.type) {
        case actionTypes.SET_COLLAPSED:
            return action.collapsed;
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
let userInfo = (state={},action) =>{
    switch (action.type) {
        case actionTypes.SET_USER_INFO:
            return action.userInfo;
        default:
            return state;
    }
};
let tabList = (state=[
    {
        id:1,
        route:'Home',
        icon:'fa fa-home',
        name:'首页'
    },
],action) =>{
    switch (action.type) {
        case actionTypes.SET_TABLIST:
            return [{
                id:1,
                route:'Home',
                icon:'fa fa-home',
                name:'首页'
            }];
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
    token,
    theme,
    collapsed,
    activeUrl,
    menuList,
    tabList,
    userInfo,
});
