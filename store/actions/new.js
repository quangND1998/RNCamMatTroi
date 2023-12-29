import ApiService from "../../common/apiService";
export const getNews = () => (dispatch) => {
    return ApiService.query('api/landingpage/news/news').then(response => {
        dispatch({
            type: 'getNews',
            payload: response.data.data,
        })
    }).catch(error => {

    });
};
export const getActivity = () => (dispatch) => {
    return ApiService.query('api/landingpage/news/activity').then(response => {
        dispatch({
            type: 'getActivity',
            payload: response.data.data,
        })
    }).catch(error => {

    });
};
export const getNewDetail = (new_id) => (dispatch) => {
    return ApiService.query(`api/landingpage/news/${new_id}/detail`).then(response => {
        dispatch({
            type: 'getNewDetail',
            payload: response.data.data,
        })
    }).catch(error => {

    });
};