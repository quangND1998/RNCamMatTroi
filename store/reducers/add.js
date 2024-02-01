import { createSlice, createSelector } from "@reduxjs/toolkit";
const initialState = {
    complain: null,
    success: false,
    msg: "",
    isOpen: false,
    errors: null,
    // app review
    appreview: null,
    star: 5,
    order_review: null
}

const addReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'chooseStar':
            state.star = action.payload;
            return {
                ...state
            }
        case 'saveReviewValidate':
            state.errors = action.payload
            return {
                ...state
            }
        case 'saveReviewOrderError':
            state.errors = action.payload
            return {
                ...state
            }
        case 'clearErrorReview':
            state.errors = null
            return {
                ...state
            }
        default:
            return state;
    }
};



export default addReducer;