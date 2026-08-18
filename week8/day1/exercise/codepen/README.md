# CodePen version — Week 8 Day 1 Redux Thunk Counter

The same app as [`../redux-thunk-counter`](../redux-thunk-counter), flattened
into CodePen's three panes. CodePen has no module system or `npm install`, so
the libraries load as UMD globals from a CDN and the `import` / `export` lines
are gone. The redux-thunk logic itself is unchanged.

| File       | CodePen pane |
| ---------- | ------------ |
| `pen.html` | HTML         |
| `pen.css`  | CSS          |
| `pen.js`   | JS           |

## Setup on CodePen

1. Create a new Pen.
2. Paste each file above into its matching pane.
3. Open **Settings → JS**:
   - Set **JavaScript Preprocessor** to **Babel** (required — the code uses JSX).
   - Add these five **external scripts**, in this order:

     ```text
     https://unpkg.com/react@18.3.1/umd/react.production.min.js
     https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js
     https://unpkg.com/redux@4.2.1/dist/redux.min.js
     https://unpkg.com/redux-thunk@2.4.2/dist/redux-thunk.min.js
     https://unpkg.com/react-redux@8.1.3/dist/react-redux.min.js
     ```

4. Save. The counter should render, and `+` / `−` / `Reset` / `Submit` all
   dispatch through the thunk middleware.

Order matters: `react` and `react-dom` have to load before `react-redux`.

## Why redux 4 here, but redux 5 in the CRA app

CodePen needs UMD builds, and redux 5 / react-redux 9 no longer ship them.
Redux 4.2.1 + redux-thunk 2.4.2 do — and that pair happens to match the
versions in the lecture slides exactly, including the `import thunk from
'redux-thunk'` default export (here it's simply the `ReduxThunk` global).

## Preview locally before pasting

`preview.html` loads the very same `pen.css` / `pen.js` and CDN scripts, so it
renders what CodePen will render. Babel fetches `pen.js` over HTTP, so serve
the folder rather than double-clicking the file:

```bash
python3 -m http.server 3001
```

Then open <http://localhost:3001/preview.html>.
