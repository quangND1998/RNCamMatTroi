//import liraries
import React, { Component, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid, Keyboard, TextInput, KeyboardAvoidingView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Icon, ZStack, FormControl, Image, Input, Link, HStack, VStack, Pressable, useToast, AspectRatio, Flex } from 'native-base'
import { loginAction, loginOtp, logoutAction, verifyOtp } from '../../store/actions/auth';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { getPhone, getToken } from '../../common/asynStorage'
import { useLogin } from '../../context/LoginProvider';
import Spinner from 'react-native-loading-spinner-overlay';
import { Eye, EyeSlash, VideoSlash } from 'iconsax-react-native';
import Toast from 'react-native-toast-message';
import { PressableOpacity } from 'react-native-pressable-opacity';
// create a component
// import PhoneInput from "react-native-phone-number-input";
import { useDispatch, useSelector } from 'react-redux'
import { formatPhoneNumberIntl, isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input'
import PhoneInput from 'react-phone-number-input/input'
import PhoneTextInput from './PhoneTextInput'

const OTP = ({ navigation }) => {
    const { setIsLoggedIn, profile } = useLogin();
    const [sms, setSMS] = useState('');
    const [spinner, setSpinner] = useState(false)
    const [otpValue, setOtpValue] = useState('');
    const [phone_number, setPhoneNumber] = useState('')
    const dispatch = useDispatch('');

    const [time, setTime] = React.useState(30);
    const timerRef = React.useRef(time);

    const [counter, setCounter] = React.useState(10);
    const [startCountdown, setStartCountdown] = React.useState(true);


    React.useEffect(() => {
        if (startCountdown) {
            const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

            if (counter === 0) {
                // countdown is finished
                setStartCountdown(false);
                // update your redux state here
                // updateReduxCounter(0);
            }

            return () => clearInterval(timer);
        }
    }, [counter, startCountdown]);


    useEffect(() => {
        fetchPhoneNumber()

    }, [])

    useEffect(() => {
        fetchPhoneNumber()
        const timerId = setInterval(() => {
            timerRef.current -= 1;
            if (timerRef.current < 0) {
                clearInterval(timerId);
            } else {
                setTime(timerRef.current);
            }
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, [timerRef])

    const countDownTimer = () => {

    }
    const fetchPhoneNumber = async () => {
        const phone = await getPhone()
        setPhoneNumber(phone)
    }
    const onChangeText = (value) => {
        console.log(value)
        setOtpValue(value)
    }

    const handelOnComplete = (value) => {

        setOtpValue(value)
        if (value && value.split('').length == 6) {
            setSpinner(true);
            dispatch(verifyOtp({ phone_number: phone_number, verification_code: value },
                (status) => {
                    setSpinner(false);
                    Toast.show({
                        type: 'success',
                        text1: status,
                        position: 'bottom'
                    });
                    setIsLoggedIn(true)
                },
                (error) => {
                    Toast.show({
                        type: 'error',
                        text1: 'Lỗi!',
                        text2: error,
                        position: 'bottom',
                        visibilityTime: 3000
                    });
                    setSpinner(false);
                },
            ));
        }
    }
    const setOpenAlert = (status) => {
        dispatch({
            type: 'changeIsError',
            payload: status
        })
    }

    const loginWithOTP = async () => {
        const phone_number = await getPhone()

        setSpinner(true);
        dispatch(loginOtp(
            phone_number,
            (status) => {
                setSpinner(false);
                Toast.show({
                    type: 'success',
                    text1: status,
                    position: 'bottom'
                });
                Keyboard.dismiss();
                setCounter(30); setStartCountdown(true)

            },
            (error) => {
                Toast.show({
                    type: 'error',
                    text1: 'Lỗi!',
                    text2: error,
                    position: 'bottom',
                    visibilityTime: 3000
                });
                setSpinner(false);
            },
        ));
    }
    return (

        <Box className="relative h-full mt-9" >
            <Spinner
                visible={spinner}
                textContent={'Vui lòng đợi...'}
                textStyle={styles.spinnerTextStyle}
            />
            <Box className="bottom-0 h-full">
                <Image source={require('../../assets/images/banner3_login.png')} className="m-auto bottom-0 absolute " alt="banner3_login" />
            </Box>
            <Box className="ion-padding px-6 py-6 absolute top-0 left-0 w-full h-full">
                <Box className="ion-padding h-72">
                    {phone_number ? <Text>Nhập mã gồm 6 chữ số được gửi tới số <Text className="font-bold">{phone_number}</Text> thông qua tin nhắn 
                        <Text className="font-bold"> SMS</Text>
                    </Text> : null}

                    <Box className="mt-12">
                        <TextInput className=" border border-white py-3 text-[16px]  text-gray-900 text-sm rounded-lg px-4" autoFocus={true}
                            value={otpValue}
                            autoCompleteType={true}
                            caretHidden={false}
                            textContentType="oneTimeCode"
                            onChangeText={handelOnComplete}
                            keyboardType="number-pad" maxLength={6}></TextInput>


                    </Box>
                    {counter > 0 ? <Text>
                        Gửi lại mã sau：  {counter} s.
                    </Text> : null}
                    {counter == 0 ? <Box className="mt-20 flex flex-row">

                        <Text>Bạn chưa nhận được mã?</Text>
                        <Text className="ml-1 text-[#FF6100] border-b-2 border-[#FF6100]" onPress={loginWithOTP}>Gửi lại mã</Text>

                    </Box> : null}
                    {/* <Box>
                        <Text>Countdown:<Text>{counter}</Text></Text>
                        <Button onPress={() => { setCounter(30); setStartCountdown(true) }}>Start Countdown</Button>
                    </Box> */}

                </Box>

            </Box>

        </Box >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    logo: {
        margin: '35px 15%'
    },
    labelStyle: {
        fontFamily: 'calibri',
        color: '#FFF',
        fontSize: 12
    },
    textInputStyle: {
        color: '#FFF',
        fontFamily: 'calibri',
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
        marginBottom: 20,
    },
});

//make this component available to the app
export default OTP;
