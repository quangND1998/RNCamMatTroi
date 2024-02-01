import ApiService from '../../common/apiService';

export const appReview = (formData, onSuccess = () => {}, onError = () => {}) => (dispatch) => {
    console.log('appReview', formData)
    ApiService.postFormData('api/v1/customer/complaint/save', formData, {
        accept: 'application/json',
        'content-type': 'multipart/form-data'
    }).then(response => {
        console.log('appReview', response)
        onSuccess(response.data)

    }).catch(error => {

        if (error.response.status == 422) {
            var errors = ''
            Object.keys(error.response.data.data).map(key =>
                errors += error.response.data.data[key]
            );
            onError(errors)

            dispatch({
                type: 'saveReviewValidate',
                payload: error.response.data.data,
            })

        }
        if (error.response.status == 400) {

            onError(error.response.data)


        }
    });
};

export const saveOrderCompleted = (id, onSuccess = () => {}, onError = () => {}) => (dispatch) => {

    return ApiService.put(`api/v1/order/${id}/orderCompeleted`).then(response => {

        onSuccess()

    }).catch(error => {
        console.log(error)

    });
};


export const saveReViewOrder = (data, onSuccess = () => {}, onError = () => {}) => (dispatch) => {

    ApiService.postFormData(`api/v1/customer/review/saveOrder/${data.id}`, data.formData, {
        accept: 'application/json',
        'content-type': 'multipart/form-data'
    }).then(response => {

        onSuccess(response.data.data)

    }).catch(error => {
        console.log(error)
        if (error.response.status == 422) {
            var errors = ''
            Object.keys(error.response.data.data).map(key =>
                errors += error.response.data.data[key]
            );
            onError(errors)

            dispatch({
                type: 'saveReviewOrderError',
                payload: error.response.data.data,
            })

        }
    });
};