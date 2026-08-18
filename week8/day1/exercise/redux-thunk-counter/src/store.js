// We use the middleware spread syntax so each middleware receives the
// store's dispatch and getState as named arguments and returns a function
// (this is how redux-thunk plugs into the dispatch pipeline).
// Finally, we create the store by calling createStore and passing the root
// reducer plus the middleware.

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import counterReducer from './reducers/counterReducer.js'

const rootReducer = combineReducers({
  counter: counterReducer,
})

const middleware = [thunk]

const store = createStore(rootReducer, applyMiddleware(...middleware))

export default store
