// Sets up the initial state and handles every action type dispatched by the
// thunk action creators, producing a brand new state object each time.

import { INCREMENT, DECREMENT, RESET, CHANGE_COUNT } from '../actions/actionTypes.js'

const initialState = {
  count: 0,
}

export default function counterReducer(state = initialState, action = {}) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 }

    case DECREMENT:
      return { ...state, count: state.count - 1 }

    case RESET:
      return { ...state, count: 0 }

    case CHANGE_COUNT:
      return { ...state, count: action.payload }

    default:
      return state
  }
}
