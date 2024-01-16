import { createSlice, createSelector } from "@reduxjs/toolkit";
const initialState = {
    notifications: null,
    unReadNotifications: null,
    totalUnRead: 0
}

const notificationReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'getAllNotifications':
            return {
                ...state,
                notifications: action.payload
            }
        case 'getUnReadNotifications':
            return {
                ...state,
                unReadNotifications: action.payload.data,
                totalUnRead: action.payload.count

            }
        case 'readNotification':
            return {
                ...state,
                notifications: action.payload,
                unReadNotifications: null
            }
        case 'deleteAllNotification':
            return {
                ...state,
                notifications: action.payload,
                unReadNotifications: null
            }
        default:
            return state;
    }
};

export default notificationReducer;

const selectNotification = state => state.notification.notifications
const selectUnReadNotifications = state => state.notification.unReadNotifications
export const totalNotification = createSelector(
    [selectNotification], (notifications) => {
        if (notifications) {
            return notifications.length
        } else {
            return 0
        }
    })

export const totalUnreadNotification = createSelector(
    [selectUnReadNotifications], (notifications) => {
        if (notifications) {
            return notifications.length
        } else {
            return 0
        }
    })