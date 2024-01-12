import ApiService from '../../common/apiService';

export const appReview = (formData, onSuccess = () => {}, onError = () => {}) => (dispatch) => {

    ApiService.postFormData('api/v1/customer/review/saveApp', formData, {
        accept: 'application/json',
        'content-type': 'multipart/form-data'
    }).then(response => {

        onSuccess(response.data.data)

    }).catch(error => {
        console.log(error)
            // if (error.response.status == 422) {
            //     var errors = ''
            //     Object.keys(error.response.data.data).map(key =>
            //         errors += error.response.data.data[key]
            //     );
            //     onError(errors)

        //     dispatch({
        //         type: 'saveReviewValidate',
        //         payload: error.response.data,
        //     })

        // }
    });
};