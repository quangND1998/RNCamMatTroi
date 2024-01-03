import { createSlice, createSelector } from "@reduxjs/toolkit";
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

            const index = state.cart.items.findIndex(e => e.id === action.payload.id)

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

            return {
                ...state,

            }

        default:
            return state;
    }
};

const selectCart = state => state.cart

export const selectTotalPrice = createSelector([selectCart], (cart) => {
    return cart.cart.items.reduce((sum, i) => {


        return sum + (i.price * i.quantity)
    }, 0)
})

const selectTotal = createSelector(
    selectCart, (cart) => {
        return cart.items.length
    }
);
const totalQuantity = createSelector(
    selectCart, (cart) => {
        return cart.items.reduce((sum, i) => {
            return sum + (i.quantity)
        }, 0)
    }
);
// const lastPrice = createSelector(

// )


export default cartReducer;