import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import Payoo from '../../payoo';
import { PaymentService } from '../../common/payment/paymentService';
const merchantId = "11931"
const HomeScreen = ({ navigation, route }) => {
    const envDevelopment = 0;
    const envProduction = 1;
    const langVietNam = 0;
    const langEnglish = 1;
    const cashAmount = 2020000;



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
       
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={_callPayment} style={{ padding: 20, borderColor: "gray", borderWidth: 1 }}>
                <Text>Start PayooPaymentSDK</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1
    }
})


export default HomeScreen;