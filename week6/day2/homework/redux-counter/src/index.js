import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import Counter from './Counter'

const initialState = { count: 0 }

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 }
    case 'DECREMENT':
      return { ...state, count: state.count - 1 }
    case 'RESET':
      return { ...state, count: 0 }
    default:
      return state
  }
}

export const store = createStore(counterReducer)

export function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = createRoot(rootElement)
  root.render(<App />)
}
