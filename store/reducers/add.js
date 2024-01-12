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
    errors: null,
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
        default:
            return state;
    }
};



export default addReducer;