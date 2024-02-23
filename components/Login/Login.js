//import liraries
import React, { Component, useState } from 'react';
import { View, StyleSheet, Linking, ToastAndroid, Keyboard, TextInput, KeyboardAvoidingView } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Icon, ZStack, FormControl, Image, Link, Input, HStack, VStack, Pressable, useToast, AspectRatio, Flex } from 'native-base'
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
                textContent={'Vui lòng đợi...'}
                textStyle={styles.spinnerTextStyle}
            />
            <Box className="bottom-0 h-full absolute ">
                <Image source={require('../../assets/images/banner3_login.png')} className="h-[100%] w-[100%] bottom-0 absolute " alt="" />
            </Box>


            <Box className=" mt-[120px] w-full lg:w-2/3 mx-auto    h-full px-4 py-4 ">
                <Box className="mb-5 pb-4 w-full"  >
                    <Image source={require('../../assets/images/logo2.png')} className="m-auto  h-[29px] w-auto" resizeMode="contain" alt="logo2" />
                </Box>

                <TextInput onChangeText={changeCode} className=" h-[44px] border border-white text-gray-900 text-sm rounded-[10px] px-4 justify-center " placeholder="Mã HĐ/SĐT" />

                {/* <View className="my-3 relative flex items-center" >
                    <TextInput secureTextEntry={show} className="bg-gray-50 border border-[#FF6100] text-gray-900 text-sm rounded-lg p-2.5  " onChangeText={changePassword} placeholder="Password" />
                    <View className="absolute bottom-0 right-2 px-2.5 py-1.5">
                        {show == false ? <Eye color="#FF6100" className="text-lg" variant="Outline" size={25} onPress={() => setShow(true)} /> : <EyeSlash color="#FF6100" variant="Outline" className="text-lg" size={25} onPress={() => setShow(false)} />}
                        <Text className="text-[#FF6100] ">{show}</Text>
                    </View>
                </View> */}
                <FormControl className="my-3 relative flex  ">
                    <Box className="flex items-center justify-center h-[44px]">
                        <TextInput secureTextEntry={show} className=" h-full w-full border border-white text-gray-900 text-sm rounded-[10px] px-4 justify-center  " onChangeText={changePassword} placeholder="******" />
                        <Box className="absolute py-6  right-0 px-2.5  items-center h-full justify-center">
                            {show == false ? <Eye color="gray" className="text-xs items-center" variant="Outline" size={16} onPress={() => setShow(true)} /> : <EyeSlash color="gray" variant="Outline" className="text-xs" size={16} onPress={() => setShow(false)} />}
                            <Text className="text-[#FF6100] ">{show}</Text>
                        </Box>
                    </Box>
                    
                </FormControl>
                {/* <TextInput secureTextEntry={show} className="my-2 border border-white text-gray-900 text-sm rounded-[10px] px-4 justify-center  " onChangeText={changePassword} placeholder="******" /> */}
                <Flex direction='row' className=" justify-end mt-1">
                    <PressableOpacity onPress={() => navigation.navigate('LoginOtp')}>
                        <Text className="text-[#FF6100] text-[13px]" style={{ fontFamily: 'Inter-Regular', fontWeight: 400 }}>Đăng nhập bằng OTP</Text>
                    </PressableOpacity>
                    {/* <router-link to='/otp-phone' class="text-[#FF6100]  ">Đăng nhập bằng OTP</router-link> */}
                </Flex>


                <Button className="w-full mt-3 text-[14px] text-white bg-[#FF6100] focus:text-[#FF6100] rounded-[10px]"  text="submit" onPress={submitHandler}>Đăng nhập</Button>

                <Box className="mt-7 text-center flex items-center flex-row justify-center">
                    <Text className="text-[#080808] text-[13px] ">Bạn chưa có tài khoản?</Text>

                    <PressableOpacity onPress={() => {
                        let phoneNumber = null;
                        if (Platform.OS !== 'android') {
                            phoneNumber = `telprompt:0825105999`;
                        }
                        else {
                            phoneNumber = `tel:0825105999`;
                        }
                        Linking.canOpenURL(phoneNumber)
                            .then(supported => {
                                if (!supported) {
                                    Alert.alert('Phone number is not available');
                                } else {
                                    return Linking.openURL(phoneNumber);
                                }
                            })
                            .catch(err => console.log(err));
                    }
                    }>
                        <Text className="text-[#FF6100] "> Hotline</Text>
                    </PressableOpacity>
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
    }
});

//make this component available to the app
export default Login;
