import ApiService from "../../common/apiService";
export const getProductDetail = (product_id, onSuccess = () => {}, onError = () => {}) => (dispatch) => {
    console.log('getProductDetail', product_id)
    return ApiService.query(`api/v1/customer/productWithID/${product_id}`).then(response => {

        dispatch({
            type: 'getProductDetail',
            payload: response.data.data,
        })
        onSuccess(response.data.data)
    }).catch(error => {

        onError()
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

export const fetchProductOwners = () => (dispatch) => {
    console.log('fetchProductOwners')
    ApiService.query('api/v1/customer/product_service').then(res => {

        dispatch({
            type: 'fetchProductOwners',
            payload: res.data.data
        })
    }).catch(err => {
        console.log(err)
    })
}
export const getProductOwner = () => (dispatch) => {

    return ApiService.query(`api/v1/customer/product_service`).then(response => {

        dispatch({
            type: 'getProductOwner',
            payload: response.data.data,
        })
    }).catch(error => {
        console.log(error)
    });
};
export const getProductnotOwnersDetail = (product_id) => (dispatch) => {

    return ApiService.query(`api/v1/customer/productService/${product_id}`).then(response => {

        dispatch({
            type: 'getProductnotOwnersDetail',
            payload: response.data.data,
        })
    }).catch(error => {
        console.log(error)
    });
};


export const getTreeDetail = (tree_id) => (dispatch) => {

    return ApiService.query(`api/v1/tree/${tree_id}/detail`).then(response => {

        dispatch({
            type: 'fetchTreeDetail',
            payload: response.data
        })

    }).catch(error => {
        console.log(error)
    });
};