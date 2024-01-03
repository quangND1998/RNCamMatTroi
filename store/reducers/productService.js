const initialState = {
    productOwners: null,
    productOwnersId: null,
    productnotOwners: null,
    productnotOwnersDetail: null,

    productService: null,
    productDetail: null,
    time_remaining: null,
    extendDetail: null,
}

const productServiceReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'getProductDetail':
            console.log('action.payload', action.payload.time_remaining)
            return {
                ...state,
                time_remaining: action.payload.time_remaining,
                productDetail: action.payload.product_detail,
            }

        default:
            return state;
    }
};

export default productServiceReducer;