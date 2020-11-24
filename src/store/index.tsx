import {
    createStore,
    // applyMiddleware,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import reducer from '../store/reducer/index'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';
// import logger from 'redux-logger'

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const persistedReducer = persistReducer({
    key: 'root',
    storage
}, reducer);
const store = createStore(
    persistedReducer,
    composeEnhancers(
        // applyMiddleware(logger),
        // other store enhancers if any
    )
);
const persistor = persistStore(store);

store.subscribe(()=>{
    // state 更新事件
    // console.log('state状态改变了，新状态如下');
    // console.log(store.getState());
});

export {store, persistor}
export default store
