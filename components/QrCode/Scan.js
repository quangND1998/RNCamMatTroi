import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy } from 'iconsax-react-native';
import { Camera, useCameraDevice, useCodeScanner,useCameraPermission } from 'react-native-vision-camera';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const ScanScreen = ({ navigation, route }) => {
    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice('back')
    useEffect(()=>{
        requestPermission()
    }, [])
    if (device == null) return <View><Text>NoCameraDeviceError</Text></View>
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
          console.log(`Scanned ${codes.length} codes!`)
        }
      })

    return <Camera 
    device={device}
    isActive={true} codeScanner={codeScanner} />
}


const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1
    }
})


export default ScanScreen;