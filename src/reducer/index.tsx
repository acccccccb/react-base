import { combineReducers } from 'redux'
import * as actionTypes from '../action/actionTypes'

let todos = (state = [{
    baseURL:'',
    token:'token',
    products:[
        {
            id:1,
            name:'手机壳'
        },
        {
            id:2,
            name:'手机'
        }
    ],
    menuList:[ // 1：分组   2：菜单
        {
            id:1,
            name:'分组',
            type:1,
            url:'/Home',
            children:[
                {
                    id:5,
                    name:'菜单2',
                    type:2,
                    url:'/Home',
                },
                {
                    id:6,
                    name:'菜单3',
                    type:2,
                    url:'/List',
                }
            ]
        },
        {
            id:2,
            name:'分组1',
            type:1,
            url:'/Home',
            children:[
                {
                    id:3,
                    name:'菜单2',
                    type:2,
                    url:'/Home',
                },
                {
                    id:4,
                    name:'菜单3',
                    type:2,
                    url:'/List',
                }
            ]
        }
    ]
}], action) => {
    console.log('todos');
    console.log(state);
    console.log(action);
    console.log('-----');
    switch (action.type) {
        case actionTypes.SET_TOKEN:
            console.log('SET_TOKEN');
            return [
                ...state,
                {
                    token:action.text
                }
            ];
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
        default:
            return state
    }
};
let rootReducer = combineReducers({
    todos,
});
export default combineReducers({
    rootReducer,
});
