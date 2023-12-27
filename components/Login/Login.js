//import liraries
import React, { Component, useState } from 'react';
import { View, StyleSheet, ToastAndroid, Keyboard, TextInput, KeyboardAvoidingView } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Icon, ZStack, FormControl, Image, Link, Input, HStack, VStack, Pressable, useToast, AspectRatio, Flex } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { loginAction, logoutAction } from '../../store/actions/auth';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { getToken } from '../../common/asynStorage'
import { useLogin } from '../../context/LoginProvider';
import Spinner from 'react-native-loading-spinner-overlay';
import { Eye, EyeSlash, VideoSlash } from 'iconsax-react-native';
import Toast from 'react-native-toast-message';
// create a component
const Login = ({ navigation }) => {
    const { setIsLoggedIn, profile } = useLogin();
    const toast = useToast();
    const [show, setShow] = useState(true)
    const [spinner, setSpinner] = useState(false)
    const [state, setSate] = React.useState({ code: '', password: '' });
    const login = useSelector(state => state.login);
    const dispatch = useDispatch();

    const changeCode = (value) => {
        setSate(prevState => {
            return { ...prevState, code: value }
        })
    }
    const changePassword = (value) => {
        setSate(prevState => {
            return { ...prevState, password: value }
        })
    }
    const submitHandler = () => {
        console.log(state)
        setSpinner(true);
        dispatch(loginAction(
            state.code, state.password,
            () => {


                Toast.show({
                    type: 'success',
                    text1: 'Đăng nhập thành công!',
                    text2: 'Thanks for signing up with us 👋',
                    position: 'bottom'
                });
                // console.log(navigation)
                setIsLoggedIn(true)
                Keyboard.dismiss();
                setSpinner(false);

            },
            () => {

                Toast.show({
                    type: 'error',
                    text1: 'Lỗi!',
                    text2: 'Tài khoản đăng nhập không chính xác',
                    position: 'bottom',
                    visibilityTime: 2000
                });
                setIsLoggedIn(false)
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
            <Box className="bottom-0 h-full ">
                <Image source={require('../../assets/images/banner3_login.png')} className="m-auto bottom-0 absolute " alt="" />
            </Box>


            <Box className=" mt-[60px] absolute top-0 left-0 w-full h-full px-4 py-4 ">
                <Box className="mb-5 pb-5"  >
                    <Image source={require('../../assets/images/logo2.png')} className="m-auto h-[35px] w-[251px]" alt="" />
                </Box>

                <TextInput onChangeText={changeCode} className="bg-gray-50 border border-[#F78F43] text-gray-900 text-sm rounded-lg p-2.5" placeholder="Mã HĐ/SĐT" />

                {/* <View className="my-3 relative flex items-center" >
                    <TextInput secureTextEntry={show} className="bg-gray-50 border border-[#F78F43] text-gray-900 text-sm rounded-lg p-2.5  " onChangeText={changePassword} placeholder="Password" />
                    <View className="absolute bottom-0 right-2 px-2.5 py-1.5">
                        {show == false ? <Eye color="#F78F43" className="text-lg" variant="Outline" size={25} onPress={() => setShow(true)} /> : <EyeSlash color="#F78F43" variant="Outline" className="text-lg" size={25} onPress={() => setShow(false)} />}
                        <Text className="text-[#F78F43] ">{show}</Text>
                    </View>
                </View> */}
                <FormControl className="my-3 relative flex ">

                    <TextInput secureTextEntry={show} className="bg-gray-50 border  border-[#F78F43] text-gray-900 text-sm rounded-lg p-2.5  " onChangeText={changePassword} placeholder="Password" />
                    <Box className="absolute bottom-0 right-0 px-2.5 py-0 items-center">
                        {show == false ? <Eye color="#F78F43" className="text-xs items-center" variant="Outline" size={20} onPress={() => setShow(true)} /> : <EyeSlash color="#F78F43" variant="Outline" className="text-xs" size={20} onPress={() => setShow(false)} />}
                        <Text className="text-[#F78F43] ">{show}</Text>
                    </Box>
                </FormControl>



                <Button className="w-full mt-6 text-white bg-[#F78F43] focus:text-[#F78F43] rounded-xl" size='md' text="submit" onPress={submitHandler}>Login</Button>
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
    }
});

//make this component available to the app
export default Login;
