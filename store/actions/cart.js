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