import ApiService from "../../common/apiService";
export const createSchedule = (form, onSuccess = () => {}, onError = () => {}) => (dispatch) => {
    return ApiService.post('api/v1/customer/visit/save', {
        date_time: form.date_time,
        number_adult: form.number_adult,
        number_children: form.number_children,
        code: form.code,
        product_service_owner_id: form.product_service_owner_id
    }).then(response => {

        dispatch({
            type: 'createSchedule',
            payload: response,
        })
        console.log(response.data.message)
        onSuccess(response.data.message)
    }).catch(error => {
            console.log(error.response.data)
            if (error.response.status == 422) {
                dispatch({
                    type: 'createScheduleFailValidate',
                    payload: error.response.data,
                })
                onError("Có lỗi xảy ra")
            }
            if (error.response.status == 400) {
                dispatch({
                    type: 'createScheduleFail',
                    payload: error.response.data,
                })
                onError(error.response.data)
            }

        }

    );
};