// CodePen JS pane — set the JavaScript preprocessor to "Babel" and add the
// five external scripts listed in README.md.
//
// Same app as the CRA version in ../redux-thunk-counter, flattened into one
// file because CodePen has no module system. The libraries arrive as UMD
// globals instead of imports:
//   Redux, ReduxThunk, ReactRedux, React, ReactDOM

const { createStore, combineReducers, applyMiddleware } = Redux
const { Provider, connect } = ReactRedux
const { useState } = React

// The UMD build exposes the middleware directly; some versions nest it
// under .default, so accept either.
const thunk = ReduxThunk.default || ReduxThunk

// --- actionTypes -----------------------------------------------------------
// All action types live in one place, so the action creators and the reducer
// can never disagree on a string literal.

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const RESET = 'RESET'
const CHANGE_COUNT = 'CHANGE_COUNT'

// --- actionCreators --------------------------------------------------------
// Each creator returns a function (dispatch, getState) => {...} instead of a
// plain action object. That's the redux-thunk contract: the middleware looks
// at every dispatched action and, if it's a function, calls it with dispatch
// and getState rather than passing it on to the reducers.

const increment = () => (dispatch, getState) => {
  dispatch({ type: INCREMENT })
}

const decrement = () => (dispatch, getState) => {
  dispatch({ type: DECREMENT })
}

const reset = () => (dispatch, getState) => {
  dispatch({ type: RESET })
}

// Takes the value typed into the form and dispatches it as the payload.
const changeCountTo = (newCount) => (dispatch, getState) => {
  dispatch({ type: CHANGE_COUNT, payload: newCount })
}

// --- counterReducer --------------------------------------------------------
// Sets up the initial state and handles every action type dispatched by the
// thunk action creators, producing a brand new state object each time.

const initialState = {
  count: 0,
}

function counterReducer(state = initialState, action = {}) {
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

// --- store -----------------------------------------------------------------
// The ...middleware spread lets each middleware receive the store's dispatch
// and getState as named arguments and return a function. Then createStore
// builds the store from the root reducer plus that middleware.

const rootReducer = combineReducers({
  counter: counterReducer,
})

const middleware = [thunk]

const store = createStore(rootReducer, applyMiddleware(...middleware))

// --- App -------------------------------------------------------------------
// Functional component with useState for the "change count to" form field;
// the actual counter value comes from the store via props.

function Count(props) {
  const [changeCount, setChangeCount] = useState(0)

  const handleSubmit = () => {
    props.changeCountTo(changeCount)
    setChangeCount(0)
  }

  return (
    <main className="counter-page">
      <section className="counter-card" aria-labelledby="counter-heading">
        <h1 id="counter-heading">Redux Thunk Counter</h1>

        <p>Current Count: {props.count}</p>

        <div className="counter-controls">
          <button type="button" className="counter-button" onClick={props.increment} aria-label="Increment">
            +
          </button>
          <button type="button" className="counter-button" onClick={props.decrement} aria-label="Decrement">
            −
          </button>
          <button type="button" className="reset-button" onClick={props.reset}>
            Reset
          </button>
        </div>

        <div className="change-count-form">
          <label htmlFor="changeCount">Change count to:</label>
          <input
            id="changeCount"
            type="number"
            value={changeCount}
            onChange={(e) => setChangeCount(Number(e.target.value))}
          />
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </section>
    </main>
  )
}

// Sends data from the state in the store to this component as props.
const mapStateToProps = (state) => ({
  count: state.counter.count,
})

const ConnectedCount = connect(mapStateToProps, {
  increment,
  decrement,
  reset,
  changeCountTo,
})(Count)

// --- index -----------------------------------------------------------------
// Renders the main component wrapped in Provider so the whole app has access
// to the state in the store.

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <ConnectedCount />
  </Provider>
)
