import ApiService from "../../common/apiService";
export const getAllNotification = () => (dispatch) => {

    ApiService.query('api/v1/notification/all').then(response => {
        // console.log(response.data)
        dispatch({
            type: "getAllNotifications",
            payload: response.data
        })


    }).catch(error => {
        console.log(error)
    });
};

export const readNotifcation = () => (dispatch) => {

    ApiService.post('api/v1/notification/readNotifications').then(response => {
        dispatch({
            type: "readNotification",
            payload: response.data
        })


    }).catch(error => {
        console.log(error)
    });
};

export const deleteAllNotification = () => (dispatch) => {

    ApiService.delete('api/v1/notification/deleteNotifications').then(response => {
        dispatch({
            type: "deleteAllNotification",
            payload: response.data
        })


    }).catch(error => {
        console.log(error)
    });
};

export const getUnReadNotification = () => (dispatch) => {

    ApiService.query('api/v1/notification/unreadNotifications').then(response => {
        console.log(response)
        dispatch({
            type: "getUnReadNotifications",
            payload: response.data
        })


    }).catch(error => {
        console.log(error)
    });
};