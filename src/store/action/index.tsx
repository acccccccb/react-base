import * as types from './actionTypes'
export const setToken = token => ({
    type: types.SET_TOKEN,
    token
});
export const setMenuList = menuList => ({
    type: types.SET_MENULIST,
    menuList
});
