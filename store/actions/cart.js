import { getCart } from "../../common/asynStorage";
import ApiService from "../../common/apiService";
export const addToCart = (product) => (dispatch) => {

    dispatch({
        type: 'addToCart',
        payload: product,
    })

};
export const fetchCart = async(dispatch) => {
    const cart = await getCart();
    if (cart) {

        dispatch({
            type: 'saveCartToStore',
            payload: cart
        })
        if (cart.items.length > 0) {
            cart.items.forEach(item => {
                dispatch(updateCart(item.id))
            })
        }
    }

};
export const updateCart = (id) => (dispatch) => {
    return ApiService.query(`api/v1/product-retail/${id}/detail`).then(res => {
        dispatch({
            type: 'updateItemInCart',
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: 'notFoundProduct',
            payload: id
        })
    })
}

export const changeQuantity = (data) => (dispatch) => {

    dispatch({
        type: 'changeQuantity',
        payload: data,
    })

};
export const getVouchers = (params) => (dispatch) => {

    ApiService.queryData(`api/v1/voucher/listVoucher`, params).then(res => {
        console.log(res.data)
        dispatch({
            type: 'getVouchers',
            payload: res.data
        })
    }).catch(err => {
        console.log(err)
    })

};

export const saveOrder = (data, onSuccess = () => {}, onError = () => {}) => (dispatch) => {
    console.log(data);
    return ApiService.post('api/v1/order/saveOrder', { items: data.items, voucher: data.voucher, payment_method: data.payment_method }).then(response => {
        console.log(response.data)
        dispatch({
            type: 'deleteCart'
        })
        dispatch({
            type: 'saveOrderSuccess'
        })
        onSuccess();
    }).catch(error => {
        console.log(error.response.data.data)
        if (error.response.status == 422) {
            dispatch({
                type: 'saveOrderValidate',
                payload: error.response.data.data
            });

            var errors = ''
            Object.keys(error.response.data.data).map(key =>
                errors += error.response.data.data[key]
            );


            onError(errors)
                // store.commit('stores/cart/saveOrderValidate', error.response.data.data)
        }
        if (error.response.status == 404) {
            dispatch({
                type: 'saveOrderErrorVoucher',
            });
            // store.commit('stores/cart/saveOrderErrorVoucher')
            onError(error.response.data)
        }

    });
};