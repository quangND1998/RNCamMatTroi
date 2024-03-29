import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, SafeAreaView, ImageBackground } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, HStack, VStack, Pressable, FlatList, Avatar, useToast } from "@gluestack-ui/themed"
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy, ArrowLeft2, Image, ScanBarcode } from 'iconsax-react-native';
import { PressableOpacity } from 'react-native-pressable-opacity'
import { StatusBarBlurBackground } from '../../views/StatusBarBlurBackgroundImpl'
import * as RNImagePicker from 'expo-image-picker'
import { BarCodeScanner } from 'expo-barcode-scanner'
import ApiService from '../../common/apiService';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const CodeScan = ({ navigation, route }) => {

    function handleBackButtonClick() {
        navigation.goBack();
    }

    const decode = async () => {
        try {
            const { status } = await RNImagePicker.requestMediaLibraryPermissionsAsync()
            if (status === 'granted') {
                const result = await RNImagePicker.launchImageLibraryAsync({
                    options: {
                        allowsMultipleSelection: false
                    }
                })
                // console.log('result', result.assets);
                if (result && result.assets.length > 0 && result.assets[0].uri) {
                    // console.log('pickimage', result.assets[0].uri)
                    const results = await BarCodeScanner.scanFromURLAsync(result.assets[0].uri)
                    console.log('aaaaaa', results[0].data)

                    if (results.length > 0) {
                        const data = results[0].data
                        const pieces = results[0].data.split("/");
                        const barcodescheck = parseInt(pieces[pieces.length - 1]);

                        if (data.includes('tree')) {

                            ApiService.query(`api/v1/customer/checkProduct/${barcodescheck}`).then(res => {
                                // console.log('getOrderRetail', res.data)
                                if (res.data?.success == true) {
                                    // router.push({ name: 'productservice.benefits', params: { id: barcodescheck.value } })
                                    navigation.navigate('PackageBenefits', { name: `Quyền lợi ${res.data.data.name}`, product_id: barcodescheck, })
                                } else {
                                    // window.location.href = barcode[0]?.displayValue;
                                    Linking.canOpenURL(barcodescheck).then(supported => {
                                        if (supported) {
                                            Linking.openURL(barcodescheck);
                                        } else {
                                            console.log("Don't know how to open URI: " + barcodescheck);
                                        }
                                    });
                                }
                            }).catch(err => {
                                console.log(err)
                            });
                        }

                        if (data.includes('order')) {
                            ApiService.query(`api/v1/customer/checkOrder/${barcodescheck}`).then(res => {
                                console.log('getOrderRetail', res.data)
                                keyCheckExist.value = res.data?.success;
                                if (res.data?.success == true) {
                                    // if (res.data?.data?.status == 'completed') {
                                    //     router.push({ name: 'order.evaluate.review-comment', params: { orderId: barcodescheck } })
                                    // } else {
                                    //     router.push({ name: 'order.evaluate.check', params: { orderId: barcodescheck } })
                                    // }
                                } else {
                                    Linking.canOpenURL(barcodescheck).then(supported => {
                                        if (supported) {
                                            Linking.openURL(barcodescheck);
                                        } else {
                                            console.log("Don't know how to open URI: " + barcodescheck);
                                        }
                                    });
                                }
                            }).catch(err => {
                                console.log(err)
                            });
                        }
                    }
                }

            }

        } catch (error) {
            console.debug(error)
        }
    }
    return (
        <SafeAreaView style={styles.container} className="bg-[#F78F43]" >
            <Box className=" bg-[#F78F43]" >

                <PressableOpacity onPress={navigation.goBack} className="absolute mt-10 ml-3 text-white">
                    <ArrowLeft2
                        size="32"
                        color="#d9e3f0"
                    />
                </PressableOpacity >
            </Box>
            {/* <StatusBarBlurBackground /> */}
            <Box style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >

                <ImageBackground source={require('../../assets/images/bg.jpg')} resizeMode="cover" className="bg-[#F78F43]  rounded-xl absolute bg-no-repeat  p-1" style={styles.scan_page}>

                    <Text className="mt-5 mx-12 text-center  text-[#ffffff] " style={styles.innerText}>Quét mã cây hoặc đơn hàng để xác nhận </Text>

                    <Box className="  absolute bottom-0  right-0 left-0 ion-no-margin rounded-b-xl" style={styles.action_bottom}>

                        <Box className="w-full flex-row justify-between">
                            <Box className="w-1/2 item">
                                <PressableOpacity onPress={decode} >
                                    <Box className="w-[25px] h-[25px] button_radious  rounded-full" expand="block" >

                                        <Image
                                            size="32"
                                            color="#ffffff"
                                            variant="TwoTone"
                                        />
                                    </Box>
                                    <Text style={styles.innerText} className="text-[#AEAEAE]" >Chọn ảnh QR </Text>
                                </PressableOpacity>
                            </Box>
                            <Box className="w-1/2 " style={styles.item}>
                                <Box className="w-[25px] h-[25px] button_radious  rounded-full" expand="block" >
                                    <PressableOpacity onPress={() => {
                                        navigation.navigate('ScanExpo');
                                        console.log('aaaaaaaa')
                                    }} >
                                        <ScanBarcode
                                            size="32"
                                            color="#ffffff"
                                            variant="TwoTone"
                                        />
                                    </PressableOpacity>
                                </Box>
                                <Text>Scan  </Text>
                            </Box>
                        </Box>

                    </Box>
                </ImageBackground>
            </Box>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F78F43'
    },
    cardcontainer: {
        flex: 1
    },
    action_bottom: {
        backgroundColor: 'rgb(0 0 0 / 45 %)',
        color: 'white'
    },
    scan_page: {
        position: 'absolute',
        width: '90%',
        margin: '5%',
        bottom: '0px',
        height: '86%',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'

    },
    innerText: {
        color: 'white',
    },

})


export default CodeScan;