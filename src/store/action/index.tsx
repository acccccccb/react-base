import * as types from './actionTypes'
export const setToken = token => ({
    type: types.SET_TOKEN,
    token
});
export const setMenuList = menuList => ({
    type: types.SET_MENULIST,
    menuList
});

export const setTabList = tabList => ({
    type: types.SET_TABLIST,
    tabList
});
export const addTabList = tabList => ({
    type: types.ADD_TABLIST,
    tabList
});
export const removeTabList = tabIndex => ({
    type: types.REMOVE_TABLIST,
    tabIndex
});
