import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, ScrollView, RefreshControl, ImageBackground } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Flex, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import Payoo from '../../payoo';
import { PaymentService } from '../../common/payment/paymentService';
import { getNews } from '../../store/actions/new';
import { SafeAreaView } from 'react-native-safe-area-context';
import NewSwiper from '../News/NewSwiper';
import NewActivity from '../News/NewActivity';
import { PressableOpacity } from 'react-native-pressable-opacity'
const merchantId = "11931"
const Home = ({ navigation, route }) => {
    const envDevelopment = 0;
    const envProduction = 1;
    const langVietNam = 0;
    const langEnglish = 1;
    const cashAmount = 2020000;
    const dispatch = useDispatch();
    const news = useSelector(state => state.new.news);
    const user = useSelector(state => state.auth.user);
    const [refreshing, setRefreshing] = React.useState(false);
    useEffect(() => {
        fetchNews();
    }, []);
    const fetchNews = async () => {
        dispatch(getNews())
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchNews();
            setRefreshing(false);
        }, 2000);
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <Box className=' fixed shadow bg-white rounded-b-2xl'>
                    {/* <Image source={require('../../assets/images/banner.png')} className="m-auto h-24 w-full object-cover" alt='banner'></Image> */}
                    <Box className="px-2 py-6 w-full  ">
                        <Flex direction='row' className="flex items-center justify-between">
                            <Flex direction='row' className="">
                                <Avatar bg="green.500" source={{
                                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                }}>
                                </Avatar>
                                <Flex className="ml-2">
                                    <Text className="font-bold text-xl text-gray-800">Xin chào {user?.name}</Text>
                                    <Text className="text-gray-800 text-sm">CMT:</Text>
                                </Flex>

                            </Flex>



                            <Box className="flex flex-row">
                                <PressableOpacity onPress={() => {
                                    navigation.navigate('CodeScan');

                                }} >
                                    <Image source={require('../../assets/icon/scan.png')} alt="scan"  ></Image>
                                </PressableOpacity>

                                <Image source={require('../../assets/icon/icon_bell.png')} className="ml-5" alt="icon_bell"></Image>
                            </Box>
                        </Flex>

                    </Box>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {


    },
    image_bg: {
        flex: 1,
        justifyContent: 'center',
    },
    containt_service: {
        margin: 20


    }
})


export default Home;