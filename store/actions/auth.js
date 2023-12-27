import { AuthService } from '../../common/auth/authService';
import { setToken, destroyToken, setUser, getToken, getUser } from '../../common/asynStorage';

export const loginAction = (code, password, onSuccess = () => {}, onError = () => {}) => (dispatch) => {
    return AuthService.login({ code, password }).then(response => {
        console.log(response.data)
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
        console.log('aaaaaaaaaa', error.response.data)
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
            console.log('error', error)
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log('message', message)
            dispatch({
                type: 'LOGIN_FAIL',
            });

            onError()
        }
    );
};

export const loadStorageToken = async(dispatch) => {
    const access_token = await getToken();

    const user = await getUser();

    dispatch({
        type: 'GET_USER_TOKEN',
        payload: { user: user, token: access_token },
    });
}