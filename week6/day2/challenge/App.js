// The cart reducer. It never mutates: every case builds a brand new state
// object (and a new cart array) with spread syntax.

import { ADD_TO_CART, UPDATE_CART_ITEM, DELETE_CART_ITEM } from './actionTypes.js'

const initialState = {
  cart: [],
}

export default function cartReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_TO_CART: {
      const item = action.payload
      const existing = state.cart.find((i) => i.itemId === item.itemId)

      // Already in the cart? Merge the quantities instead of duplicating the row.
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.itemId === item.itemId ? { ...i, qty: i.qty + item.qty } : i
          ),
        }
      }

      return {
        ...state,
        cart: [...state.cart, { ...item }],
      }
    }

    case UPDATE_CART_ITEM: {
      const { itemId, qty } = action.payload

      // Quantity dropped to zero (or below) — treat it as a removal.
      if (qty <= 0) {
        return {
          ...state,
          cart: state.cart.filter((i) => i.itemId !== itemId),
        }
      }

      return {
        ...state,
        cart: state.cart.map((i) => (i.itemId === itemId ? { ...i, qty } : i)),
      }
    }

    case DELETE_CART_ITEM: {
      const { itemId } = action.payload
      return {
        ...state,
        cart: state.cart.filter((i) => i.itemId !== itemId),
      }
    }

    default:
      return state
  }
}
