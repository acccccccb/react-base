import * as types from './actionTypes'
export const setToken = token => ({
    type: types.SET_TOKEN,
    token
});
export const setActiveUrl = activeUrl => ({
    type: types.SET_ACTIVE_URL,
    activeUrl
});
export const setTheme = theme => ({
    type: types.SET_THEME,
    theme
});
export const setCollapsed = collapsed => ({
    type: types.SET_COLLAPSED,
    collapsed
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
export const setUserInfo = userInfo => ({
    type: types.SET_USER_INFO,
    userInfo
});
