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