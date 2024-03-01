import React, { useState, useEffect } from 'react';
import { LogBox, SafeAreaView, ScrollView } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, Alert } from 'react-native';
import { Center, Container, Heading, Button, Text, Flex, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy, Logout } from 'iconsax-react-native';

import { useLogin } from '../../../context/LoginProvider';
import { logoutAction } from '../../../store/actions/auth';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import HrTag from '../../HrTag';
const SettingShipper = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { setIsLoggedIn } = useLogin();
    const toast = useToast();
    const handlerLogout = async () => {
        Alert.alert('Đăng xuất', 'Bạn muốn đăng xuất', [
            {
                text: 'Hủy',
                onPress: () => console.log('Hủy'),
                style: 'cancel',
            },
            {
                text: 'Đăng xuất', onPress: () => dispatch(logoutAction(
                    () => {
                        setIsLoggedIn(false)
                        toast.show({
                            title: "Đăng xuất thành công",
                        })

                        navigation.navigate('Login');


                    },
                    () => {
                        toast.show({
                            title: "Có lỗi xảy ra, vui lòng thử lại!",
                        })
                        setIsLoggedIn(false)
                    },
                ))
            },
        ]);


    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Box className="mb-4 mx-3 pb-4">
                    <Box className=" h-full px-3  bg-[#F0F0F0]">
                        <Flex className="w-full pt-3 pb-2 ">
                            <TouchableOpacity onPress={handlerLogout}  >
                                <Flex direction='row' className=" flex items-center">
                                    <Logout
                                        width={24}
                                        height={25}
                                        size={26}
                                        color="#000000"
                                        variant="Outline"
                                    />
                                    <Text className="  text-[#000000] ml-2 text-[20px] ">Đăng xuất</Text>
                                </Flex>
                            </TouchableOpacity>
                        </Flex>
                        <HrTag mr="1" ml="1" opacity={0.3}> </HrTag>
                    </Box>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1
    },
    container: {
        flex: 1,
    },
    scrollView: {

    },
})


export default SettingShipper;