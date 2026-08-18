// Gateway to the view. Renders the main component while wrapping it with
// react-redux's Provider so the entire app has access to the state in the
// store.

import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store.js'
import Count from './App.js'
import './index.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <Provider store={store}>
    <Count />
  </Provider>
)
