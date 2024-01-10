import ApiService from "../../common/apiService";
export const fetchProductRetails = () => (dispatch) => {

    return ApiService.query(`api/v1/product-retail`).then(response => {

        dispatch({
            type: 'fetchProductRetails',
            payload: response.data,
        })
    }).catch(error => {

    });
};

export const fetchProductDetail = (id) => (dispatch) => {

    return ApiService.query(`api/v1/product-retail/${id}/detail`).then(response => {
        dispatch({
            type: 'getListProductService',
            payload: response.data,
        })
    }).catch(error => {

    });
};

export const queryProductRetails = (params) => (dispatch) => {

    return ApiService.queryData(`api/v1/product-retail`, params).then(response => {
        dispatch({
            type: 'fetchProductRetails',
            payload: response.data,
        })
    }).catch(error => {

    });
};