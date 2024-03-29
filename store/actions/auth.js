import { AuthService } from '../../common/auth/authService';
import { setToken, destroyToken, setUser, getToken, getUser, savePhone } from '../../common/asynStorage';
import ApiService from '../../common/apiService';

export const loginAction = (code, password, onSuccess = () => {}, onError = () => {}) => (dispatch) => {
    return AuthService.login({ code, password }).then(response => {
        // console.log(response.data)
        setToken(response.data.data.token);
        setUser(response.data.data.user)
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: response.data.data.user, token: response.data.data.token },
        });
        dispatch({
            type: 'GET_USER_SUCCESS',
            payload: { user: response.data.data.user }
        })

        onSuccess();
    }).catch(error => {
        // console.log('aaaaaaaaaa', error.response.data)
        dispatch({
            type: 'LOGIN_FAIL',
        });
        onError()
    });
};

export const logoutAction = (onSuccess = () => {}, onError = () => {}) => (dispatch) => {
    return AuthService.logout().then(
        (response) => {
            dispatch({
                type: 'LOGOUT'
            });
            onSuccess();
            destroyToken();
            // destroyRole();


        },
        (error) => {
            // console.log('error', error)
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            // console.log('message', message)
            dispatch({
                type: 'LOGIN_FAIL',
            });

            onError()
        }
    );
};

export const loadStorageToken = async(dispatch) => {
    const access_token = await getToken();
    console.log('loadStorageToken', access_token)
    const user = await getUser();

    dispatch({
        type: 'GET_USER_TOKEN',
        payload: { user: user, token: access_token },
    });
}

export const loginOtp = (phone, onSuccess = () => {}, onError = () => {}) => (dispatch) => {
    console.log(phone)
    return ApiService.post('api/v1/loginOtp', { phone_number: phone }).then(response => {
        console.log('loginOtp', response.data)
        dispatch({
            type: 'loginOTP',
            payload: phone
        })
        savePhone(phone);
        onSuccess(response.data);
    }).catch(error => {
        console.log(error.response.data.data)
        if (error.response.status == 422) {
            var errors = ''
            Object.keys(error.response.data.data).map(key =>
                errors += error.response.data.data[key]
            );
            onError(errors)
        }
        if (error.response.status == 404) {
            dispatch({
                type: 'loginOTPError',
                payload: error.response.data
            });
            onError(error.response.data)
        }
        if (error.response.status == 500) {
            onError('Lỗi xảy ra!')
        }

    });
};


export const verifyOtp = (data, onSuccess = () => {}, onError = () => {}) => (dispatch) => {
    console.log(data)
    return ApiService.post('api/v1/verify', { phone_number: data.phone_number, verification_code: data.verification_code }).then(response => {
        console.log('loginOtp', response.data)
        setToken(response.data.data.token);
        setUser(response.data.data.user)
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: response.data.data.user, token: response.data.data.token },
        });
        dispatch({
            type: 'GET_USER_SUCCESS',
            payload: { user: response.data.data.user }
        })
        onSuccess('Đăng nhập thành công');
    }).catch(error => {
        console.log(error.response.data.data)
        if (error.response.status == 422) {
            var errors = ''
            Object.keys(error.response.data.data).map(key =>
                errors += error.response.data.data[key]
            );
            onError(errors)
        }
        if (error.response.status == 404) {
            dispatch({
                type: 'loginOTPError',
                payload: error.response.data
            });
            onError(error.response.data)
        }


    });
};