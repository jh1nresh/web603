# Week 8 Day 1 Exercise — Redux Thunk Counter

In-class demo/exercise (Module6-Week4-Day1) practicing the `redux-thunk`
middleware on a React counter app. Each action creator in
`src/actions/actionCreators.js` returns a function `(dispatch, getState) => {}`
instead of a plain action object; the thunk middleware wired up in
`src/store.js` intercepts those functions and calls them with `dispatch` and
`getState`.

- `src/actions/actionTypes.js` — action type constants
- `src/actions/actionCreators.js` — thunk action creators (`increment`,
  `decrement`, `reset`, `changeCountTo`)
- `src/reducers/counterReducer.js` — counter state + reducer logic
- `src/store.js` — `createStore` + `applyMiddleware(thunk)`
- `src/App.js` — `Count` component (functional, `useState` for the "change
  count to" field), connected to the store with `react-redux`'s `connect`
- `src/index.js` — renders `Count` wrapped in `<Provider store={store}>`

## Run

```bash
npm install
npm start
```

## Verify

```bash
npm run build
```
