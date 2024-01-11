import ApiService from "../../common/apiService";
export const getListOrderGift = () => (dispatch) => {

    return ApiService.query(`api/v1/customer/orderGiftAll`).then(response => {
        console.log(response.data)
        dispatch({
            type: 'getListOrderGift',
            payload: response.data,
        })
    }).catch(error => {

    });
};
export const getOrderDetail = (order_id) => (dispatch) => {

    return ApiService.query(`api/v1/customer/orderDetail/${order_id}`).then(response => {
        console.log(response.data)
        dispatch({
            type: 'getOrderDetail',
            payload: response.data.data,
        })
    }).catch(error => {

    });
};