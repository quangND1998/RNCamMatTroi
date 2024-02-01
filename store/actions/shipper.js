import { err } from "react-native-svg";
import ApiService from "../../common/apiService";
import { on } from "stream";
export const fetchOrders = (params) => (dispatch) => {
    console.log('fetchOrders', params);
    dispatch({
        type: 'changeLoading',
        payload: true,
    })
    return ApiService.queryData('api/v1/fetchOrders', params).then(response => {
        console.log('fetchOrders', response.data);
        dispatch({
            type: 'fetchOrders',
            payload: response.data,
        });
        dispatch({
            type: 'changeLoading',
            payload: false,
        })

    }).catch(error => {
            dispatch({
                type: 'changeLoading',
                payload: false,
            })
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
    dispatch({
        type: 'changeLoading',
        payload: true,
    })
    return ApiService.query(`api/v1/shipper/${id}/orderTransportDetail`).then(response => {
        console.log(response.data)
        dispatch({
            type: 'orderShipperDetail',
            payload: response.data,
        })
        dispatch({
            type: 'changeLoading',
            payload: false,
        })

    }).catch(error => {
            dispatch({
                type: 'changeLoading',
                payload: false,
            })
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

export const confirmNotShipping = (id, onSuccess = () => {}, onError = () => {}) => (dispatch) => {
    return ApiService.put(`api/v1/shipper/${id}/confirm-not-shipping`).then(response => {
        console.log('confirmShipping', response.data)
        dispatch({
            type: 'confirm-not-shipping',
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
    const formdata = data.formData._parts.length > 0 ? data.formData : null
    console.log(data.formData._parts.length)

    ApiService.postFormData(`api/v1/shipper/${data.id}/confirm-recive`, formdata, {
        accept: 'application/json',
        'content-type': 'multipart/form-data'

    }).then(response => {
        console.log('confirmCustomerRecive', response.data)
        dispatch({
            type: 'confirm-recive',
            payload: response.data,
        })
        onSuccess(response.data)

    }).catch(error => {
        console.log(error)
        onError()
    });
};


export const UploadOrder = (data, onSuccess = () => {}, onError = () => {}) => (dispatch) => {

    ApiService.postFormData(`api/v1/shipper/${data.id}/upload-order`, data.formData, {
        accept: 'application/json',
        'content-type': 'multipart/form-data',

    }).then(response => {
        dispatch({
            type: 'confirm-recive',
            payload: response.data,
        })
        onSuccess(response.data)

    }).catch(error => {
        console.log(error)
        onError()
    });
};


export const deleteImage = (id, media_id, onSuccess = () => {}, onError = () => {}) => (dispatch) => {

    ApiService.delete(`api/v1/shipper/${id}/order/${media_id}/deleteImage`).then(response => {
        dispatch({
            type: 'confirm-recive',
            payload: response.data,
        })
        onSuccess(response.data)

    }).catch(error => {
        console.log(error)
        onError(error.response.data)
    });
};


export const findOrderTransport = (params, onSuccess = () => {}, onError = () => {}) => (dispatch) => {
    console.log('findOrderTransport', params);
    dispatch({
        type: 'changeLoading',
        payload: true,
    });
    return ApiService.queryData('api/v1/fetchOrders', params).then(response => {
        console.log('findOrderTransport', response.data);
        dispatch({
            type: 'findOrderTransport',
            payload: response.data,
        });
        dispatch({
            type: 'changeLoading',
            payload: false,
        })

    }).catch(error => {
            dispatch({
                type: 'changeLoading',
                payload: false,
            })
            console.log(error)
        }

    );
};