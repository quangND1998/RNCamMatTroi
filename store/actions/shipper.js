import { err } from "react-native-svg";
import ApiService from "../../common/apiService";
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