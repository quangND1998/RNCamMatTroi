//import liraries
import React, { Component, useState, useRef } from 'react';
import { View, StyleSheet, ToastAndroid, Keyboard, TextInput, KeyboardAvoidingView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Icon, ZStack, FormControl, Image, Input, Link, HStack, VStack, Pressable, useToast, AspectRatio, Flex } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction, logoutAction } from '../../store/actions/auth';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { getToken } from '../../common/asynStorage'
import { useLogin } from '../../context/LoginProvider';
import Spinner from 'react-native-loading-spinner-overlay';
import { Eye, EyeSlash, VideoSlash } from 'iconsax-react-native';
import Toast from 'react-native-toast-message';
import { PressableOpacity } from 'react-native-pressable-opacity';
// create a component
// import PhoneInput from "react-native-phone-number-input";

import { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import PhoneInput from 'react-phone-number-input/input'
import PhoneTextInput from './PhoneTextInput'
const LoginOtp = ({ navigation }) => {
    const { setIsLoggedIn, profile } = useLogin();
    const toast = useToast();

    const [spinner, setSpinner] = useState(false)
    const [value, setValue] = useState("")
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);



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
                        <Flex direction='column' className="flex-col w-full">

                        </Flex>
                    </Flex>
                    {isValidPhoneNumber(value) ? <Text className="text-red-500 ml-12 mt-2 text-xs" >Số điện thoại không đúng
                    </Text> : null}

                    {/* <Box class="text-red-500" v-if="otp_flash"> { otp_flash }</Box> */}
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
export default LoginOtp;
