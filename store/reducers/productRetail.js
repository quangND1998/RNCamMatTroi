const initialState = {
    products: null,
    product_detail: null
}

const productRetailReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'fetchProductRetails':
            // console.log(action.payload)
            return {
                ...state,
                products: action.payload,
            }
        case 'fetchProductDetail':

            return {
                ...state,
                product_detail: action.payload,
            }
        default:
            return state;
    }
};

export default productRetailReducer;