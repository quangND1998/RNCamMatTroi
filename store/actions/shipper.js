import { err } from "react-native-svg";
import ApiService from "../../common/apiService";
import { on } from "stream";
export const fetchOrders = (params) => (dispatch) => {
    console.log('fetchOrders', params)
    return ApiService.queryData('api/v1/fetchOrders', params).then(response => {

        dispatch({
            type: 'fetchOrders',
            payload: response.data,
        })
        console.log(response.data)

    }).catch(error => {

            console.log(error)
        }

    );
};
export const orderStatus = (params) => (dispatch) => {
    return ApiService.queryData('api/v1/orderStatus', params).then(response => {
        console.log(response.data)
        dispatch({
            type: 'orderStatus',
            payload: response.data,
        })


    }).catch(error => {

            console.log(error)
        }

    );
};


export const getOrderShipperDetail = (id) => (dispatch) => {
    return ApiService.query(`api/v1/shipper/${id}/orderDetail`).then(response => {
        console.log(response.data)
        dispatch({
            type: 'orderShipperDetail',
            payload: response.data,
        })


    }).catch(error => {

            console.log(error)
        }

    );
};


export const confirmShipping = (id, onSuccess = () => {}, onError = () => {}) => (dispatch) => {
    return ApiService.put(`api/v1/shipper/${id}/confirm-shipping`).then(response => {
        console.log('confirmShipping', response.data)
        dispatch({
            type: 'confirm-shipping',
            payload: response.data,
        })
        onSuccess()

    }).catch(error => {
            onError()
            console.log(error)
        }

    );
};



export const confirmCustomerRecive = (data, onSuccess = () => {}, onError = () => {}) => (dispatch) => {

    ApiService.postFormData(`api/v1/shipper/${data.id}/confirm-shipping`, data.formData, {
        accept: 'application/json',
        'content-type': 'multipart/form-data'
    }).then(response => {

        onSuccess(response.data)

    }).catch(error => {
        console.log(error)
        onError()
    });
};