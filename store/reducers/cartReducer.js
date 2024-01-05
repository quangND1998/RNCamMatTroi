import { createSlice, createSelector } from "@reduxjs/toolkit";
import { create } from "react-test-renderer";
import { setCart, destroyCart, getCart } from "../../common/asynStorage";
const initialState = {
    cart: {
        items: [],
        totalQuantity: 0
    },
    totalPrice: 0,
    TotalQuantity: 0,
    shippingfee: 0,
    vouchers: null,
    voucher: null,
    errors: null,
    isVoucherError: false,
    messageErrorVoucher: null,
    packageItem: null
};


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'addToCart':

            var index = state.cart.items.findIndex(e => e.id === action.payload.id)

            let item = {
                id: action.payload.id,
                price: action.payload.price,
                name: action.payload.name,
                quantity: 1
            }
            if (index !== -1) {
                state.cart.items[index].quantity++
            } else {
                state.cart.items.push(item)
            }
            setCart(state.cart);
            return {
                ...state,

            };
        case 'deleteCart':
            state.cart.items = [];
            setCart(state.cart)
            return {
                ...state,

            };
        case 'updateItemInCart':
            var index = state.cart.items.findIndex(e => e.id === action.payload.id)
            if (index !== -1) {
                state.cart.items[index].price = action.payload.price
                state.cart.items[index].name = action.payload.name
            }
            setCart(state.cart)
            return {
                ...state,

            };
        case 'saveCartToStore':
            state.cart = action.payload
            return {
                ...state

            }
        case 'notFoundProduct':
            var index = state.cart.items.findIndex(e => e.id === action.payload)
            state.cart.items.splice(index, 1)

            setCart(state.cart);
            return {
                ...state

            }
        case 'changeQuantity':

            var index = state.cart.items.findIndex(e => e.id === action.payload.product.id)
            if (index !== -1) {
                state.cart.items[index].quantity = action.payload.quantity
            } else {
                state.cart.items.push({
                    id: action.payload.product.id,
                    price: action.payload.product.price,
                    name: action.payload.product.name,
                    quantity: action.payload.quantity
                })
            }
            setCart(state.cart);
            return {
                ...state
            }
        case 'removeItemOnCart':
            var index = state.cart.items.findIndex(e => e.id === action.payload.id)
            state.cart.items.splice(index, 1)

            setCart(state.cart);
            return {
                ...state
            }
        case 'getVouchers':
            state.vouchers = action.payload
            return {
                ...state
            }
        case 'addVoucher':
            state.voucher = action.payload
            return {
                ...state
            }
        case 'saveOrderValidate':
            state.errors = action.payload
            return {
                ...state
            }
        case 'saveOrderErrorVoucher':
            state.voucher = null
            return {
                ...state
            }
        case 'saveOrderSuccess':
            state.errors = null
            state.voucher = null
            return {
                ...state
            }
        case 'deleteCart':

            state.cart.items = [];
            setCart(state.cart)
            return {
                ...state
            }
        default:
            return state;
    }
};

const selectCart = state => state.cart
const selectVoucher = state => state.cart.voucher
export const selectTotalPrice = createSelector([selectCart], (cart) => {
    return cart.cart.items.reduce((sum, i) => {


        return sum + (i.price * i.quantity)
    }, 0)
})

export const selectTotal = createSelector(
    [selectCart], (cart) => {
        return cart.cart.items.length
    })
export const selectTotalQuantity = createSelector(
    [selectCart], (cart) => {
        return cart.cart.items.reduce((sum, i) => {
            return sum + (i.quantity)
        }, 0)
    })
export const selectLastPrice = createSelector(
    [selectCart, selectVoucher], (cart, voucher) => {
        let discount_mount = 0
        if (voucher !== null) {
            discount_mount = voucher.discount_mount
        } else {
            discount_mount = 0
        }
        return cart.cart.items.reduce((sum, i) => {
            return sum + (i.price * i.quantity)
        }, 0) - discount_mount
    }
)


export default cartReducer;