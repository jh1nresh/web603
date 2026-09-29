// Not required by the challenge — a small runner that dispatches each action
// through the reducer so we can prove the state transitions are correct.
//
//   node demo.js

import cartReducer from './App.js'
import { addToCart, updateCartItem, deleteCartItem } from './actionCreators.js'

const PRODUCTS = [
  {
    itemId: 1,
    itemName: 'Mechanical Keyboard',
    itemPrice: 89.99,
    itemDesc: '65% hot-swappable, brown switches',
    qty: 1,
  },
  {
    itemId: 2,
    itemName: 'USB-C Hub',
    itemPrice: 39.5,
    itemDesc: '7-in-1, 100W passthrough',
    qty: 2,
  },
]

const show = (label, state) => {
  console.log(`\n${label}`)
  console.table(state.cart)
}

let state = cartReducer(undefined, {})
show('initial state', state)

state = cartReducer(state, addToCart(PRODUCTS[0]))
state = cartReducer(state, addToCart(PRODUCTS[1]))
show('after adding both products', state)

state = cartReducer(state, addToCart({ ...PRODUCTS[0], qty: 2 }))
show('after adding the keyboard again (quantities merge, no duplicate row)', state)

state = cartReducer(state, updateCartItem(2, 5))
show('after updating the hub quantity to 5', state)

state = cartReducer(state, deleteCartItem(1))
show('after deleting the keyboard', state)

state = cartReducer(state, updateCartItem(2, 0))
show('after setting the hub quantity to 0 (removed)', state)

// Immutability check: the reducer must return new references, never mutate.
const before = cartReducer(undefined, {})
const after = cartReducer(before, addToCart(PRODUCTS[0]))
console.log('\nnew state object?', before !== after)
console.log('new cart array? ', before.cart !== after.cart)
console.log('original cart untouched?', before.cart.length === 0)
