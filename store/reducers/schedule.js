import { createSlice, createSelector } from "@reduxjs/toolkit";
const initialState = {
    schedule: null,
    success: false,
    msg: "",
    isOpen: false,
    errors: null,
    cheduleVisits: null,
    cheduleVisitsProduct: null,
}

const scheduleReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'createSchedule':
            state.schedule = action.payload
            return {
                ...state
            }
        case 'createScheduleFailValidate':
            state.errors = action.payload
            return {
                ...state
            }
        case 'createScheduleFail':
            state.errors = action.payload
            return {
                ...state
            }
        case 'clearError':
            state.errors = null;
            return {
                ...state
            }
        default:
            return state;
    }
};



export default scheduleReducer;