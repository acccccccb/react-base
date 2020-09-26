import { createStore, applyMiddleware  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer/index'
// import logger from 'redux-logger'

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const store = createStore(
    reducer,
    composeEnhancers(
        // applyMiddleware(logger),
        // other store enhancers if any
    )
);
store.subscribe(()=>{
    console.log('state状态改变了，新状态如下');
    console.log(store.getState());
});
export default store
