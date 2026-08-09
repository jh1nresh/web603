import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Counter extends Component {
  increment = () => this.props.dispatch({ type: 'INCREMENT' })

  decrement = () => this.props.dispatch({ type: 'DECREMENT' })

  reset = () => this.props.dispatch({ type: 'RESET' })

  render() {
    return (
      <main className="counter-page">
        <section className="counter-card" aria-labelledby="counter-heading">
          <h1 id="counter-heading">Counter</h1>
          <div className="counter-controls">
            <output className="counter-value" aria-live="polite">
              {this.props.count}
            </output>
            <button
              type="button"
              className="btn btn-light counter-button"
              onClick={this.decrement}
              aria-label="Decrement"
            >
              −
            </button>
            <button
              type="button"
              className="btn btn-light counter-button"
              onClick={this.increment}
              aria-label="Increment"
            >
              +
            </button>
            <button
              type="button"
              className="btn btn-light reset-button"
              onClick={this.reset}
            >
              Reset
            </button>
          </div>
        </section>
      </main>
    )
  }
}

const mapStateToProps = (state) => ({ count: state.count })

export default connect(mapStateToProps)(Counter)
