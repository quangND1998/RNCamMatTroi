import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, ScrollView, RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import Payoo from '../../payoo';
import { PaymentService } from '../../common/payment/paymentService';
import { getNews } from '../../store/actions/new';
import { SafeAreaView } from 'react-native-safe-area-context';
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
        PaymentService.payment(31).then(res => {
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
                    <Image source={require('../../assets/images/banner.png')} className="m-auto h-36 w-full object-cover"></Image>
                </Box>
                <TouchableOpacity onPress={_callPayment} style={{ padding: 20, borderColor: "gray", borderWidth: 1 }}>
         <Text>Start PayooPaymentSDK</Text>
       </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,

    },
})


export default HomeScreen;