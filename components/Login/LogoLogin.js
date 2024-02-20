//import liraries
import React, { Component, useState } from 'react';
import { View, StyleSheet, ToastAndroid, Keyboard, TextInput, KeyboardAvoidingView, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Icon, ZStack, FormControl, Image, Link, Input, HStack, VStack, Pressable, useToast, AspectRatio, Flex } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction, logoutAction } from '../../store/actions/auth';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Eye, EyeSlash, VideoSlash } from 'iconsax-react-native';
import Toast from 'react-native-toast-message';
import { PressableOpacity } from 'react-native-pressable-opacity';
// create a component
const LogoLogin = ({ navigation }) => {

    return (

        <ImageBackground source={require('../../assets/images/banner_login.png')} resizeMode="cover" style={styles.image}>

            <Flex direction='row' className="justify-center w-full h-full relative items-center p-0 ">
                <Box className="relative  p-0 w-[90%]">

                    {/* <!-- <img src="/public/assets/images/banner_login.png" class="m-auto" alt=""> --> */}
                    <Box className="m-auto  w-full p-0">
                        <Box className="w-[36%] h-[120px] m-auto">
                            <Image source={require('../../assets/images/logo_qcam.png')} resizeMode="contain" className="m-auto" alt="logo_qcam"></Image>
                        </Box>
                        <Box className="mt-5">
                            <Image source={require('../../assets/images/cammattroi.png')} className="m-auto" alt="cammattroi"></Image>
                        </Box>
                        {/* <PressableOpacity className="hover:bg-[#FF6100]  "> */}
                        <Button onPress={() => navigation.navigate('Login')} className="w-full px-3 py-2.5 items-center bg-white  mt-16 text-[#080808] ion-padding rounded-xl active:bg-[#FF6100] "><Text className="text-black">
                            Đăng nhập
                        </Text>
                        </Button>
                        {/* </PressableOpacity> */}
                    </Box>
                </Box>
            </Flex>
        </ImageBackground>

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
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    logo: {
        margin: '35px 15%'
    },
    scrollView: {


    },
});

//make this component available to the app
export default LogoLogin;
