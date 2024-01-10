import ApiService from "../../common/apiService";
export const getListOrderGift = () => (dispatch) => {

    return ApiService.query(`api/v1/customer/orderGift`).then(response => {
        console.log(response.data.data)
        dispatch({
            type: 'getProductDetail',
            payload: response.data.data,
        })
    }).catch(error => {

    });
};