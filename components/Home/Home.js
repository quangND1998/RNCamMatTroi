import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, ScrollView, RefreshControl, ImageBackground } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
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
const HomeScreen = ({ navigation, route }) => {
    const envDevelopment = 0;
    const envProduction = 1;
    const langVietNam = 0;
    const langEnglish = 1;
    const cashAmount = 2020000;
    const dispatch = useDispatch();
    const news = useSelector(state => state.new.news);
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
    const _callPayment = () => {
        PaymentService.payment(30).then(res => {
            console.log(res.data.OrderInfo);

            var orderInfo = res.data.OrderInfo;
            var checkSum = res.data.CheckSum;

            let sdkConfig = {};
            sdkConfig.MerchantId = "11931";
            sdkConfig.MerchantShareKey = "OTE5YTgyYWU5MWYxMTJkM2RkMTlhOGRhZTZiYWQ2Mjc=";

            sdkConfig.Environment = envDevelopment;
            sdkConfig.Language = langVietNam;

            sdkConfig.PayooCashAmount = cashAmount;
            // sdkConfig.SupportedMethods = 2;
            // sdkConfig.BankCode = "ABB";
            sdkConfig.AppCode = "Payoo";

            // sdkConfig.CustomerEmail = "email@email.com";
            // sdkConfig.CustomerPhone = "0911223344";

            Payoo.pay(sdkConfig, orderInfo, checkSum, (data) => console.log('PayooResponse', data));
        }).catch(error => {
            console.log('error', error)
        });
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // var raw = JSON.stringify({ "CyberCash": cashAmount, "ShopID": merchantId, "Token": "", "UserID": "" });
        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };
        // fetch("https://sdk-sbb.payoo.vn/api/v2/Order", requestOptions)
        //     .then(response => response.text())
        //     .then(result => {

        //         var jsonResult = JSON.parse(result);
        //         var orderInfo = jsonResult.OrderInfo;
        //         var checkSum = jsonResult.CheckSum;

        //         let sdkConfig = {};
        //         sdkConfig.MerchantId = "11931";
        //         sdkConfig.MerchantShareKey = "OTE5YTgyYWU5MWYxMTJkM2RkMTlhOGRhZTZiYWQ2Mjc=";

        //         sdkConfig.Environment = envDevelopment;
        //         sdkConfig.Language = langVietNam;

        //         sdkConfig.PayooCashAmount = cashAmount;
        //         // sdkConfig.SupportedMethods = 2;
        //         // sdkConfig.BankCode = "ABB";
        //         sdkConfig.AppCode = "Payoo";

        //         // sdkConfig.CustomerEmail = "email@email.com";
        //         // sdkConfig.CustomerPhone = "0911223344";

        //         Payoo.pay(sdkConfig, orderInfo, checkSum, (data) => console.log('PayooResponse', data));
        //     })
        //     .catch(error => console.log('error', error));
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <Box className='relative'>
                    <Image source={require('../../assets/images/banner.png')} className="m-auto h-24 w-full object-cover" alt='banner'></Image>
                    <Box className="absolute left-0 bottom-5 w-full">
                        <Box className="flex flex-row justify-between">
                            <Text className="font-bold text-xl text-white">Xin chào Nguyen Thi Nga</Text>
                            <Box className="flex flex-row">
                                <PressableOpacity onPress={() => {
                                    navigation.navigate('CodeScan');

                                }} >
                                    <Image source={require('../../assets/icon/scan.png')} alt="scan"  ></Image>
                                </PressableOpacity>

                                <Image source={require('../../assets/icon/icon_bell.png')} className="ml-5" alt="icon_bell"></Image>
                            </Box>
                        </Box>
                        <Text className="text-white text-sm">CMT:</Text>
                    </Box>
                </Box>
                <Box className="p-2 bg-white w-full flex flex-row flex-wrap">
                    <Box className="w-1/2  py-1 px-2  hover:rounded-lg hover:shadow-lg hover:shadow-[#2f302f31]">
                        <Box to="/user" className="relative"  >
                            <Box className="relative">
                                <Image source={require('../../assets/images/banner_item.png')} className="m-auto w-full rounded-lg" alt="banner_item"></Image>
                                <Box className="absolute mx-auto w-full ">
                                    <Box className="p-[16px]">
                                        <Image source={require('../../assets/images/product.png')} className=" m-auto object-contain" alt="product"></Image>
                                    </Box>
                                    <Text className="text-center mt-3">Sản phẩm</Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box className="w-1/2  py-1 px-2  hover:rounded-lg hover:shadow-lg hover:shadow-[#2f302f31]">
                        <Box to="/user" className="relative"  >
                            <Box className="relative">
                                <Image source={require('../../assets/images/banner_item.png')} className="m-auto w-full rounded-lg" alt="banner_item"></Image>
                                <Box className="absolute mx-auto w-full ">
                                    <Box className="p-[16px]">
                                        <Image source={require('../../assets/images/icon_dv.png')} className=" m-auto object-contain" alt="icon_dv"></Image>
                                    </Box>
                                    <Text className="text-center mt-3">Dịch vụ</Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box className="w-1/2  py-1 px-2 hover:rounded-lg hover:shadow-lg hover:shadow-[#2f302f31]">
                        <Box to="/order" className="relative">
                            <Box className="relative">
                                <Image source={require('../../assets/images/banner_item.png')} className="m-auto w-full rounded-lg" alt="banner_item"></Image>
                                <Box className="absolute mx-auto w-full ">
                                    <Box className="p-[16px]">
                                        <Image source={require('../../assets/images/icon_dathang.png')} className=" m-auto object-contain" alt="icon_dathang"></Image>
                                    </Box>
                                    <Text className="text-center mt-3">Đơn hàng</Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="w-1/2  py-1 px-2 hover:rounded-lg hover:shadow-lg hover:shadow-[#2f302f31]">
                        <Box to="/farm" className="relative">
                            <Box className="relative">
                                <Image source={require('../../assets/images/banner_item.png')} className="m-auto w-full rounded-lg" alt="banner_item"></Image>
                                <Box className="absolute mx-auto w-full ">
                                    <Box className="p-[10px]">
                                        <Image source={require('../../assets/images/icon_trangtrai.png')} className=" m-auto object-contain" alt="icon_trangtrai"></Image>
                                    </Box>
                                    <Text className="text-center mt-3">Trang trại</Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="my-5 px-2">
                        <Text className="font-bold text-xl">Tin tức chung</Text>
                        <NewSwiper navigation={navigation} />
                    </Box>
                    <Box className="my-5 px-2">
                        <Text className="font-bold text-xl">Hoạt động trang trại</Text>
                        <NewActivity navigation={navigation} />
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


export default HomeScreen;