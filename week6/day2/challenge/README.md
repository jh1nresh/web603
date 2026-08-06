# Module 6 / Week 2 / Day 2 — Group Challenge

Redux scripts for a shopping cart feature. Products carry `itemId`, `itemName`,
`itemPrice`, `itemDesc`, `qty`, and shoppers can add, update, or delete cart items.

## Files

| File | What it holds |
|---|---|
| `actionTypes.js` | The three action type constants |
| `actionCreators.js` | One action creator per type, each taking only the data that action needs |
| `App.js` | The reducer — a `switch` that returns a new state with spread syntax |
| `store.js` | Extra: the real Redux store, `createStore(cartReducer)` |
| `demo.js` | Extra: calls the reducer directly, so each state transition is visible |
| `storeDemo.js` | Extra: same scenario driven through `store.dispatch()` + `store.subscribe()` |

## State shape

```js
{
  cart: [
    { itemId, itemName, itemPrice, itemDesc, qty },
  ]
}
```

## Actions

| Type | Creator | Payload |
|---|---|---|
| `ADD_TO_CART` | `addToCart(product)` | the full product (`qty` defaults to 1) |
| `UPDATE_CART_ITEM` | `updateCartItem(itemId, qty)` | `{ itemId, qty }` |
| `DELETE_CART_ITEM` | `deleteCartItem(itemId)` | `{ itemId }` |

## Reducer behavior

- **Add** — new item is appended; adding a product already in the cart merges the
  quantities instead of creating a duplicate row.
- **Update** — replaces `qty` on the matching item; a quantity of `0` or less
  removes the item rather than leaving a zero-quantity row.
- **Delete** — filters the item out by id.
- **Default** — returns the existing state untouched.

Every case spreads: `{ ...state, cart: [...] }` and `{ ...item, qty }`. Nothing is
mutated in place, so React re-renders correctly on reference change.

## Run the demos

The challenge only asks for the scripts, so the reducer works standalone:

```bash
node demo.js
```

Prints the cart after each action and asserts that the reducer returned new
object/array references with the previous state left untouched.

To see the same actions go through an actual Redux store:

```bash
npm install
node storeDemo.js
```

`store.subscribe()` logs the line count, item count, and cart total after every
`dispatch` — that callback is exactly the hook `react-redux` uses to decide when
to re-render.
