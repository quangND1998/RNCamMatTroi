//import liraries
import React, { Component, useState, useRef } from 'react';
import { View, StyleSheet, ToastAndroid, Keyboard, TextInput, KeyboardAvoidingView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Icon, ZStack, FormControl, Image, Input, Link, HStack, VStack, Pressable, useToast, AspectRatio, Flex } from 'native-base'
import { loginAction, loginOtp, logoutAction } from '../../store/actions/auth';
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

const LoginOtp = ({ navigation }) => {
    const { setIsLoggedIn, profile } = useLogin();
    const [spinner, setSpinner] = useState(false)
    const [value, setValue] = useState("")
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);
    const dispatch = useDispatch();
    const loginWithOTP = () => {


        setSpinner(true);
        dispatch(loginOtp(

            parsePhoneNumber(value).formatNational(),
            (status) => {
                setSpinner(false);
                Toast.show({
                    type: 'success',
                    text1: status,
                    position: 'bottom'
                });
                Keyboard.dismiss();
                navigation.navigate('OTP')
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

        <Box className="relative h-full " >
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <Box className="bottom-0 h-full">
                <Image source={require('../../assets/images/banner3_login.png')} className="m-auto bottom-0 absolute " alt="banner3_login" />
            </Box>
            <Box className="ion-padding px-6 py-6 absolute top-0 left-0 w-full h-full">
                <Box className="ion-padding h-72">
                    <Text className="my-1 text-[#000]">Số điện thoại</Text>
                    <Flex direction='row' className="items-center mt-4">
                        <Text className="my-1 mr-4 text-[#000]">+84</Text>
                        <Flex direction='column' className="flex-col w-full px-4 py-4">
                            <PhoneInput

                                displayInitialValueAsLocalNumber={false}
                                placeholder='0123456977'
                                smartCaret={false}
                                inputComponent={PhoneTextInput}
                                defaultCountry="VN"
                                value={value}
                                onChange={setValue} />
                        </Flex>
                    </Flex>
                    {value == null ?
                        <Box>
                            < Text className="text-red-500 ml-12 mt-2 text-xs" >Vui lòng nhập số điện thoại</Text>


                        </Box>
                        : <Box>
                            {/* {parsePhoneNumber(value) && parsePhoneNumber(value).formatNational()} */}
                            {isValidPhoneNumber(value) ? null : <Text className="text-red-500 ml-12 mt-2 text-xs" >Số điện thoại không hợp lệ</Text>}
                        </Box>

                    }

                    {/* <Box class="text-red-500" v-if="otp_flash"> { otp_flash }</Box> */}
                </Box>

            </Box>
            {value && isValidPhoneNumber(value) ? <Button onPress={loginWithOTP}
                className="absolute bottom-0  w-[90%] ml-[5%] mr-[5%] mt-2 mb-2 px-4 py-4 text-white bg-[#FF6100] rounded-xl " style={styles.btn_button}>
                <Text className="text-white items-center text-center">Xác nhận</Text>
            </Button> : null
            }

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
export default LoginOtp;
