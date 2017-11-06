import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

const INITIAL_STORE = {};
const store = createStore(reducers, INITIAL_STORE, applyMiddleware(ReduxThunk));

export default store;