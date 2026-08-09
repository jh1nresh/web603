import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const COUNTRIES = [
  { country: 'Italy', id: 0, visited: 'Yes', year: '2012' },
  { country: 'Japan', id: 1, visited: 'No', year: '2023' },
  { country: 'Chile', id: 2, visited: 'No', year: '2025' },
]

let nextCountryId = COUNTRIES.length

class Main extends Component {
  render() {
    return (
      <main className="travel-app container py-5">
        <section className="travel-panel mx-auto" aria-labelledby="page-title">
          <h1 id="page-title">My Travel Plans</h1>
          <AddCountry addCountry={this.props.addCountry} />

          <div className="country-table" aria-label="Travel plans">
            <div className="country-row country-heading" role="row">
              <strong role="columnheader">Country</strong>
              <strong role="columnheader">Visited?</strong>
              <strong role="columnheader">Year</strong>
            </div>
            <CountriesList countries={this.props.countries} />
          </div>
        </section>
      </main>
    )
  }
}

const CountriesList = ({ countries }) => (
  <div role="rowgroup">
    {countries.map((country) => (
      <Country country={country} key={country.id} />
    ))}
  </div>
)

class AddCountry extends Component {
  constructor(props) {
    super(props)
    this.inputCountry = React.createRef()
    this.inputVisited = React.createRef()
    this.inputYear = React.createRef()
    this.state = { error: '' }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const country = this.inputCountry.current.value.trim()
    const visited = this.inputVisited.current.value.trim()
    const year = this.inputYear.current.value.trim()

    if (!country || !visited || !year) {
      this.setState({ error: 'Please complete all three fields.' })
      return
    }

    this.props.addCountry(country, visited, year)
    event.currentTarget.reset()
    this.setState({ error: '' })
    this.inputCountry.current.focus()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="travel-form" noValidate>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            id="country"
            ref={this.inputCountry}
            className="form-control"
            type="text"
            autoComplete="country-name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="visited" className="form-label">
            Visited?
          </label>
          <input
            id="visited"
            ref={this.inputVisited}
            className="form-control"
            type="text"
            placeholder="Yes or No"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year Visited/To Visit
          </label>
          <input
            id="year"
            ref={this.inputYear}
            className="form-control"
            type="text"
            inputMode="numeric"
          />
        </div>

        {this.state.error && (
          <p className="form-error" role="alert">
            {this.state.error}
          </p>
        )}

        <button type="submit" className="btn btn-primary">
          Add Country
        </button>
      </form>
    )
  }
}

const Country = ({ country }) => (
  <div className="country-row" role="row">
    <span role="cell">{country.country}</span>
    <span role="cell">{country.visited}</span>
    <span role="cell">{country.year}</span>
  </div>
)

const addCountry = (country, visited, year) => ({
  type: 'ADD_COUNTRY',
  payload: {
    country,
    id: nextCountryId++,
    visited,
    year,
  },
})

const reducer = (state = COUNTRIES, action) => {
  switch (action.type) {
    case 'ADD_COUNTRY':
      return state.concat(action.payload)
    default:
      return state
  }
}

const store = createStore(reducer)

const mapStateToProps = (state) => ({ countries: state })

const mapDispatchToProps = (dispatch) => ({
  addCountry: (country, visited, year) =>
    dispatch(addCountry(country, visited, year)),
})

const ConnectedMain = connect(mapStateToProps, mapDispatchToProps)(Main)

function App() {
  return (
    <Provider store={store}>
      <ConnectedMain />
    </Provider>
  )
}

export default App
