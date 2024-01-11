const initialState = {
    orderGilfs : null
}
const historyReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'getListOrderGift':
            // console.log(action.payload)
            return {
                ...state,
                orderGilfs: action.payload.orders,
            }
        default:
            return state;
    }
};

export default historyReducer;