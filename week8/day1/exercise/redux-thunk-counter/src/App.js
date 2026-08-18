// Main component. Functional component with useState for the "change count
// to" form field; the actual counter value comes from the store via props.

import React, { useState } from 'react'
import { connect } from 'react-redux'
import { increment, decrement, reset, changeCountTo } from './actions/actionCreators.js'

export function Count(props) {
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

export default connect(mapStateToProps, { increment, decrement, reset, changeCountTo })(Count)
