const initialState = {
    orderGilfs : null,
    orderDetail: null
}
const historyReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'getListOrderGift':
            // console.log(action.payload)
            return {
                ...state,
                orderGilfs: action.payload.orders.data,
            }
        case 'getOrderDetail':
            return {
                ...state,
                orderDetail: action.payload,
            }
        default:
            return state;
    }
};

export default historyReducer;