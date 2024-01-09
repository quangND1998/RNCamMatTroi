import ApiService from "../../common/apiService";
export const getProductDetail = (product_id) => (dispatch) => {

    return ApiService.query(`api/v1/customer/productWithID/${product_id}`).then(response => {
        console.log(response.data.data)
        dispatch({
            type: 'getProductDetail',
            payload: response.data.data,
        })
    }).catch(error => {

    });
};

export const getListProductService = () => (dispatch) => {

    return ApiService.query(`api/v1/product_service`).then(response => {

        dispatch({
            type: 'getListProductService',
            payload: response.data.data,
        })
    }).catch(error => {
        console.log(error)
    });
};