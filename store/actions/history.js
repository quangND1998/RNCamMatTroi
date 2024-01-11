import ApiService from "../../common/apiService";
export const getListOrderGift = () => (dispatch) => {

    return ApiService.query(`api/v1/customer/orderGiftAll`).then(response => {
        // console.log(response.data)
        dispatch({
            type: 'getListOrderGift',
            payload: response.data.data,
        })
    }).catch(error => {

    });
};