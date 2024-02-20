import React, { useState, useEffect } from 'react';
import { LogBox, SafeAreaView, ScrollView } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, Alert } from 'react-native';
import { Center, Container, Heading, Button, Text, Flex, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy, Logout } from 'iconsax-react-native';
import { logoutAction } from '../../store/actions/auth';
import { getToken } from '../../common/asynStorage';
import { useLogin } from '../../context/LoginProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import HrTag from '../HrTag';
const CustomerService = ({ navigation, route }) => {
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
                        toast.show({
                            title: "Đăng xuất thành công",
                        })
                        setIsLoggedIn(false)
                        // navigation.navigate('Login');
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
                <Box className="mb-5 pb-5">
                    <Box className=" h-full px-3 pt-5 bg-[#F0F0F0]">
                        <TouchableOpacity onPress={() => navigation.navigate('Schedule')}  >
                            <Flex className="w-full py-2 ">
                                <Flex direction='row' >
                                    <Image source={require('../../assets/icon/calender.png')} className="w-6 h-6" alt="calendar"></Image>
                                    {/* <MaterialCommunityIcons name='calendar-range-outline' size={24} className="text-[#070707]" color="#070707" /> */}
                                    <Text className=" text-[#000000] ml-3 text-[20px]  ">Đặt lịch thăm vườn</Text>
                                </Flex>
                            </Flex>
                        </TouchableOpacity>

                        <HrTag mr="1" ml="1" opacity={0.3}> </HrTag>
                        <TouchableOpacity onPress={() => navigation.navigate('Complaint')}  >
                            <Flex className="w-full py-2 ">
                                <Flex direction='row' className="mt-4">
                                    <Image source={require('../../assets/icon/message.png')} className="w-6 h-6" alt="message"></Image>

                                    <Text className="  text-[#000000] ml-3 text-[20px] ">Khiếu nại, phản hồi</Text>
                                </Flex>
                            </Flex>
                        </TouchableOpacity>
                        <HrTag mr="1" ml="1" opacity={0.3}> </HrTag>
                        <Flex className="w-full py-2  ">
                            <TouchableOpacity onPress={handlerLogout}  >
                                <Flex direction='row' className="mt-4">
                                    <Logout
                                        size="28"
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


export default CustomerService;