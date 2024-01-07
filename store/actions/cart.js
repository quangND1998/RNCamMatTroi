export const addToCart = (product) => (dispatch) => {

    dispatch({
        type: 'addToCart',
        payload: product,
    })

};