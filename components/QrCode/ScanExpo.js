
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Linking, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ApiService from '../../common/apiService';
import { Box } from 'native-base'
import { ArrowLeft2, Flash, FlashSlash, LampOn, LampSlash, Image } from 'iconsax-react-native';
import { PressableOpacity } from 'react-native-pressable-opacity'
import { Camera, CameraType, Constants, FlashMode } from 'expo-camera';
import { CONTENT_SPACING, CONTROL_BUTTON_SIZE, SAFE_AREA_PADDING } from './Constants'
import * as RNImagePicker from 'expo-image-picker'
export default function ScanExpo({ navigation }) {
    const [type, setType] = useState(CameraType.back);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [flashMode, setFlashMode] = React.useState(FlashMode.off)
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            // do something - for example: reset states, ask for camera permission
            setScanned(false);
            setHasPermission(false);
            (async () => {
                const { status } = await BarCodeScanner.requestPermissionsAsync();
                setHasPermission(status === "granted");
            })();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    const handleBackButtonClick = () => {
        navigation.goBack();
        console.log('aaaaaaaaaaaa')
    }



    const __handleFlashMode = () => {
        if (flashMode === 'torch') {
            setFlashMode(FlashMode.off)
        } else if (flashMode === 'off') {
            setFlashMode(FlashMode.torch)
        } else {
            setFlashMode(FlashMode.torch)
        }

    }
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        const pieces = data.split("/");
        const barcodescheck = parseInt(pieces[pieces.length - 1]);

        if (data && data.includes('tree')) {
            console.log(data)
            ApiService.query(`api/v1/customer/checkProduct/${barcodescheck}`).then(res => {
                console.log('getOrderRetail', res.data.data)

                if (res.data?.success == true) {
                    navigation.navigate('PackageBenefits', { name: `Quyền lợi ${res.data.data.name}`, product_id: barcodescheck, })
                    // router.push({ name: 'productservice.benefits', params: { id: barcodescheck.value } })
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
                console.log(err.response)
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

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const decode = async () => {
        try {
            const { status } = await RNImagePicker.requestMediaLibraryPermissionsAsync()
            if (status === 'granted') {
                const result = await RNImagePicker.launchImageLibraryAsync({
                    options: {
                        allowsMultipleSelection: true
                    }
                })
                // console.log('result', result.assets);
                if (result && result.assets.length > 0 && result.assets[0].uri) {
                    // console.log('pickimage', result.assets[0].uri)
                    const results = await BarCodeScanner.scanFromURLAsync(result.assets[0].uri)

                    if (results.length > 0) {
                        const data = results[0].data
                        const pieces = results[0].data.split("/");
                        const barcodescheck = parseInt(pieces[pieces.length - 1]);
                        if (data.includes('tree')) {

                            ApiService.query(`api/v1/customer/checkProduct/${barcodescheck}`).then(res => {

                                if (res.data?.success == true) {
                                    navigation.navigate('PackageBenefits', { name: `Quyền lợi ${res.data.data.name}`, product_id: barcodescheck, })
                                    // router.push({ name: 'productservice.benefits', params: { id: barcodescheck.value } })
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

        <View style={styles.container}>
           
            <Camera
                style={styles.camera}
                type={type}
                barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                }}
                flashMode={flashMode}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}>

                <View style={styles.rightButtonRow}>
                    <PressableOpacity style={styles.button} onPress={() => __handleFlashMode()} disabledOpacity={0.4}>
                        {/* <IonIcon name={torch ? 'flash' : 'flash-off'} color="white" size={24} /> */}
                        {flashMode === 'torch' ? <LampOn
                            size="28"
                            color="#FF8A65"
                        /> : <LampSlash
                            size="28"
                            color="#FF8A65"
                        />}

                    </PressableOpacity>
                </View>
                <View style={styles.leftButtonRow}>
                    <PressableOpacity style={styles.button} disabledOpacity={0.4} onPress={decode} >
                        <Box className="w-[25px] h-[25px] button_radious  rounded-full" expand="block" >

                            <Image
                                size="28"
                                color="#FF8A65"
                                variant="Outline"
                            />
                        </Box>

                    </PressableOpacity>
                </View>
            </Camera>
        </View >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000000' // the rock-solid workaround
    },
    cameraContainer: {
        marginHorizontal: 0, marginLeft: 0, marginStart: 0,
        paddingHorizontal: 0, paddingLeft: 0, paddingStart: 0,
        height: '115%',
        padding: 0
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    button: {
        marginBottom: CONTENT_SPACING,
        width: CONTROL_BUTTON_SIZE,
        height: CONTROL_BUTTON_SIZE,
        borderRadius: CONTROL_BUTTON_SIZE / 2,
        backgroundColor: 'rgba(140, 140, 140, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightButtonRow: {
        position: 'absolute',
        right: SAFE_AREA_PADDING.paddingRight,
        bottom: SAFE_AREA_PADDING.paddingTop,
    },
    leftButtonRow: {
        position: 'absolute',
        left: SAFE_AREA_PADDING.paddingLeft,
        bottom: SAFE_AREA_PADDING.paddingBottom,
    },

}); 