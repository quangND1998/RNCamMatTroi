import { createSlice, createSelector } from "@reduxjs/toolkit";
const initialState = {
    orders_status: null,
    orders: null,
    errors: null,
    order_detail: null,
    date: 'now',
    day: null,
    search: null,
    shipper_status: null,
    isLoading: false


}

const shipperReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'orderStatus':
            return {
                ...state,
                orders_status: action.payload
            }
        case 'fetchOrders':
            return {
                ...state,
                orders: action.payload
            }
        case 'setDate':

            return {
                ...state,
                date: action.payload
            }
        case 'setDay':

            return {
                ...state,
                day: action.payload
            }
        case 'setSearch':

            return {
                ...state,
                search: action.payload
            }

        case 'changeShipperStatus':
            state.shipper_status = action.payload
            return {
                ...state,

            }
        case 'orderShipperDetail':
            state.order_detail = action.payload
            return {
                ...state,

            }
        case 'confirm-shipping':
            state.order_detail = action.payload
            return {
                ...state
            }
        case 'confirm-recive':
            state.order_detail = action.payload
            return {
                ...state
            }
        case 'confirm-not-shipping':
            state.order_detail = action.payload
            return {
                ...state
            }
        case 'changeLoading':
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state;
    }
};



export default shipperReducer;