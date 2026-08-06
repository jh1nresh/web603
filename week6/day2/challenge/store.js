// The real Redux store, built from the cart reducer in App.js.
// createStore is what turns a plain reducer function into something with
// getState() / dispatch() / subscribe().

import { createStore } from 'redux'
import cartReducer from './App.js'

const store = createStore(cartReducer)

export default store
