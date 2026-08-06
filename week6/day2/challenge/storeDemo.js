// Same scenario as demo.js, but driven through a real Redux store:
// store.dispatch(actionCreator(...)) instead of calling the reducer by hand.
//
//   node storeDemo.js

import store from './store.js'
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

// subscribe() fires after every dispatch — this is the hook react-redux uses
// to know it should re-render.
const unsubscribe = store.subscribe(() => {
  const { cart } = store.getState()
  const total = cart.reduce((sum, i) => sum + i.itemPrice * i.qty, 0)
  console.log(
    `  cart: ${cart.length} line(s), ${cart.reduce((n, i) => n + i.qty, 0)} item(s), $${total.toFixed(2)}`
  )
})

const dispatch = (label, action) => {
  console.log(`\ndispatch ${action.type} — ${label}`)
  store.dispatch(action)
}

console.log('initial state:', store.getState())

dispatch('add the keyboard', addToCart(PRODUCTS[0]))
dispatch('add the hub (qty 2)', addToCart(PRODUCTS[1]))
dispatch('add the keyboard again (merges to qty 3)', addToCart({ ...PRODUCTS[0], qty: 2 }))
dispatch('update the hub to qty 5', updateCartItem(2, 5))
dispatch('delete the keyboard', deleteCartItem(1))
dispatch('update the hub to qty 0 (removed)', updateCartItem(2, 0))

unsubscribe()
console.log('\nfinal state:', store.getState())
