const initialState = {
    news: null,
    activitys: null,
    newdetail: null
}

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'getNews':
            console.log(action.payload)
            return {
                ...state,
                news: action.payload,
            }
        default:
            return state;
    }
};

export default newsReducer;