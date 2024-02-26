import React, { useState, useEffect, useMemo, useRef } from 'react';
import { LogBox, Dimensions } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, Alert, SafeAreaView, ScrollView, Platform, RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Text, Flex, Box, Radio, TextArea, Stack, Select, CheckIcon, Input, SearchBar, Image, Icon, Spacer, ZStack, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData, logoutAction, saveInforChange } from '../../store/actions/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import _ from "lodash";
import { PressableOpacity } from 'react-native-pressable-opacity';
import * as RNImagePicker from 'expo-image-picker'
import { Camera, CameraType, Constants, FlashMode, } from 'expo-camera';
import { CONTENT_SPACING, CONTROL_BUTTON_SIZE, SAFE_AREA_PADDING } from '../QrCode/Constants'
import { LampOn, LampSlash, Image as ImageIcon, ArrowLeft2, Camera as CameraIcon } from 'iconsax-react-native';
const UploadAvatar = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [type, setType] = useState(CameraType.front);
    const user = useSelector(state => state.auth.user)

    const [flashMode, setFlashMode] = React.useState(FlashMode.off)
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [photo, setPhoto] = useState(null);
    const cameraRef = useRef(null);

    const __handleFlashMode = () => {
        if (flashMode === 'torch') {
            setFlashMode(FlashMode.off)
        } else if (flashMode === 'off') {
            setFlashMode(FlashMode.torch)
        } else {
            setFlashMode(FlashMode.torch)
        }
        console.log(flashMode)

    }

    const __handleCameraType = () => {
        if (type === 'front') {
            setType(CameraType.back)
        } else if (type === 'back') {
            setType(CameraType.front)
        }
        console.log(type)
    }


    if (!permission) {

        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
    const takePhoto = async () => {
        if (cameraRef.current) {
            let photo = await cameraRef.current.takePictureAsync();
            dispatch({ type: 'setPhoto', payload: photo.uri })
            dispatch({ type: 'openCamera', payload: false })

        }
    }

    const pickImage = async () => {
        try {
            const { status } = await RNImagePicker.requestMediaLibraryPermissionsAsync()
            if (status === 'granted') {
                const result = await RNImagePicker.launchImageLibraryAsync({
                    options: {
                        allowsMultipleSelection: false,
                        mediaType: 'photo',
                    }
                })


                if (result && result.assets.length == 1) {
                    // setPhoto([
                    //     ...images,
                    //     result.assets[0].uri
                    // ])
                    dispatch({
                        type: 'setPhoto',
                        payload: result.assets[0].uri
                    })
                    dispatch({ type: 'openCamera', payload: false })
                    // setImages(result.assets[0])
                    // console.log(images)
                }


            }


        } catch (error) {
            console.debug(error)
        }

    }
    return (
        <View style={styles.container} >
            <Camera
                ref={cameraRef}
                style={styles.camera}
                type={type}
                flashMode={flashMode}
            >
                <View style={styles.topButtonRow}>
                    <PressableOpacity style={styles.button} onPress={() => {
                        dispatch({ type: 'openCamera', payload: false });
                        dispatch({ type: 'setPhoto', payload: null });
                    }} disabledOpacity={0.4}>

                        <ArrowLeft2
                            size="28"
                            color="#FF8A65"
                        />

                    </PressableOpacity>
                </View>
                <View style={styles.rightTopButtonRow}>
                    <PressableOpacity style={styles.button} onPress={() => __handleFlashMode()} disabledOpacity={0.4}>
                        {flashMode === 'torch' ? <LampOn
                            size="28"
                            color="#FF8A65"
                        /> : <LampSlash
                            size="28"
                            color="#FF8A65"
                        />}

                    </PressableOpacity>
                    <PressableOpacity style={styles.button} onPress={() => __handleCameraType()} disabledOpacity={0.4}>
                        <MaterialCommunityIcons name='rotate-3d-variant' size={28} color="#FF8A65" />

                    </PressableOpacity>

                    <PressableOpacity style={styles.button} disabledOpacity={0.4} onPress={() => pickImage()}  >
                        <Box className="w-[25px] h-[25px] button_radious  rounded-full" expand="block" >
                            <ImageIcon
                                size="28"
                                color="#FF8A65"
                            />
                        </Box>
                    </PressableOpacity>
                </View>


                <View style={styles.leftButtonRow}>
                    <PressableOpacity style={styles.button} disabledOpacity={0.4} onPress={takePhoto}>

                        <CameraIcon
                            size="28"
                            color="#FF8A65"
                        />

                    </PressableOpacity>
                </View>
            </Camera>
        </View >



    );
}


const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        margin: 10,
    },
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
    topButtonRow: {
        position: 'absolute',
        top: SAFE_AREA_PADDING.paddingTop,
        left: SAFE_AREA_PADDING.paddingLeft,
    },
    rightTopButtonRow: {
        position: 'absolute',
        top: SAFE_AREA_PADDING.paddingTop,
        right: SAFE_AREA_PADDING.paddingRight,
    },
    centerButtonRow: {
        position: 'absolute',
        right: SAFE_AREA_PADDING.paddingRight,
        bottom: SAFE_AREA_PADDING.paddingTop,
    },
    leftButtonRow: {
        position: 'absolute',
        left: SAFE_AREA_PADDING.paddingLeft,
        bottom: 77
    },
})


export default UploadAvatar;