// Action creators: plain functions that return the action object a component
// will dispatch. Each one only asks for the data that action actually needs.

import { ADD_TO_CART, UPDATE_CART_ITEM, DELETE_CART_ITEM } from './actionTypes.js'

// Adding needs the whole product: itemId, itemName, itemPrice, itemDesc, qty
export const addToCart = ({ itemId, itemName, itemPrice, itemDesc, qty = 1 }) => ({
  type: ADD_TO_CART,
  payload: { itemId, itemName, itemPrice, itemDesc, qty },
})

// Updating only needs the id and the new quantity
export const updateCartItem = (itemId, qty) => ({
  type: UPDATE_CART_ITEM,
  payload: { itemId, qty },
})

// Deleting only needs the id
export const deleteCartItem = (itemId) => ({
  type: DELETE_CART_ITEM,
  payload: { itemId },
})
