// Action creators, called on user request (button clicks / form submit).
// Instead of returning a plain action object, each one returns a function
// (dispatch, getState) => {...}. That's the redux-thunk contract: thunk
// middleware looks at every dispatched action and, if it's a function, calls
// it with `dispatch` (to send actions to the store) and `getState` (to read
// the current state) rather than passing it on to the reducers.

import { INCREMENT, DECREMENT, RESET, CHANGE_COUNT } from './actionTypes.js'

export const increment = () => (dispatch, getState) => {
  dispatch({ type: INCREMENT })
}

export const decrement = () => (dispatch, getState) => {
  dispatch({ type: DECREMENT })
}

export const reset = () => (dispatch, getState) => {
  dispatch({ type: RESET })
}

// Takes the value typed into the form and dispatches it as the payload.
export const changeCountTo = (newCount) => (dispatch, getState) => {
  dispatch({ type: CHANGE_COUNT, payload: newCount })
}
