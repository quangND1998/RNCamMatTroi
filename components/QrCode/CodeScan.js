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
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const CodeScan = ({ navigation, route }) => {
    const decode = async () => {
        
        try {
          const { status } = await RNImagePicker.requestMediaLibraryPermissionsAsync()
           if (status === 'granted') {
             const result = await RNImagePicker.launchImageLibraryAsync({
      
                   allowsMultipleSelection: false
                
             })
             console.log('aaaaaaaaaaa/',result.assets[0].uri)
             if (result && result.assets.length >0 && result.assets[0].uri) {
                const results = await BarCodeScanner.scanFromURLAsync(result.assets[0].uri)
                console.log(results) // many information
                console.log('data',results[0].data) // May be the one you are looking for
             }
           }
        } catch (error) {
          console.debug(error)
        }
      }
    function handleBackButtonClick() {
        navigation.goBack();
    }
    return (
        <SafeAreaView style={styles.container} className="bg-[#F78F43]" >
            <Box className=" bg-[#F78F43]" >

                <PressableOpacity onPress={navigation.goBack} className="absolute mt-10 ml-3">
                    <ArrowLeft2
                        size="32"
                        color="#FF8A65"
                    />
                </PressableOpacity >
            </Box>
            {/* <StatusBarBlurBackground /> */}
            <Box style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <ImageBackground source={require('../../assets/images/bg.jpg')} resizeMode="cover" className="bg-[#F78F43]  rounded-xl absolute bg-no-repeat  p-1" style={styles.scan_page}>

                    <Text className="mt-5 mx-12 text-center  text-white">Quét mã cây hoặc đơn hàng để xác nhận </Text>

                    <Box className="  absolute bottom-0  right-0 left-0 ion-no-margin rounded-b-xl" style={styles.action_bottom}>

                        <Box className="w-full flex justify-between">
                            <Box className="w-1/2 item">
                                <Box className="w-[25px] h-[25px] button_radious  rounded-full" expand="block" >
                                <PressableOpacity onPress={decode} >
                                    <Image
                                        size="32"
                                        color="#ffffff"
                                        variant="TwoTone"
                                    />
                                           </PressableOpacity>
                                </Box>
                                <Text>Chọn ảnh QR </Text>
                            </Box>
                            <Box className="w-1/2 " style={styles.item}>
                                <Box className="w-[25px] h-[25px] button_radious  rounded-full" expand="block" >
                                    <PressableOpacity onPress={() => {
                                        navigation.navigate('Scan');
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

    }

})


export default CodeScan;