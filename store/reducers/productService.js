import { createSlice, createSelector } from "@reduxjs/toolkit";
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
            // console.log('action.payload', action.payload.time_remaining)
            return {
                ...state,
                time_remaining: action.payload.time_remaining,
                productDetail: action.payload.product_detail,
            }
        case 'getListProductService':
            //  console.log('action.payload', action.payload.product_service)
            return {
                ...state,
                productService: action.payload.product_service,
            }
        case 'fetchProductOwners':
            return {

                ...state,
                productOwners: action.payload.product_owner,
                productnotOwners: action.payload.not_owner,
            }
        case 'getProductOwner':
            // console.log('action.payload', action.payload.product_service)
            return {
                ...state,
                productOwners: action.payload.product_owner,
                productnotOwners: action.payload.not_owner
            }
        case 'getProductnotOwnersDetail':
            // console.log('action.payload', action.payload.product_service)
            return {
                ...state,
                productnotOwnersDetail: action.payload.product_detail,
            }
        default:
            return state;
    }
};


const selectProductOwners = state => state.productService.productOwners

export const selectProductOwnersActive = createSelector(
    [selectProductOwners], (productOwners) => {
        if (productOwners) {
            return productOwners.filter(product => product.state == 'active')
        }
        return null
    })
export default productServiceReducer;