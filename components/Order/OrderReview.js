import React, { useState, useEffect } from 'react';
import { LogBox, Dimensions } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, Alert, SafeAreaView, ScrollView, Platform, RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Text, Flex, Box, TextArea, Stack, Input, SearchBar, Image, Icon, Spacer, ZStack, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy, Logout } from 'iconsax-react-native';
import { logoutAction } from '../../store/actions/auth';
import { getToken } from '../../common/asynStorage';
import { useLogin } from '../../context/LoginProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import _ from "lodash";
import { PressableOpacity } from 'react-native-pressable-opacity';
import * as RNImagePicker from 'expo-image-picker'
import { appReview, saveReViewOrder } from '../../store/actions/add';
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';
import HrTag from '../HrTag';
import { getOrderDetail } from '../../store/actions/history';
const OrderReview = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { itemId } = route.params;
    var { width, height } = Dimensions.get("window");
    const star = useSelector(state => state.add.star)
    const [spinner, setSpinner] = useState(false)
    const [refreshing, setRefreshing] = React.useState(false);
    const orderDetail = useSelector(state => state.history.orderDetail);
    const [form, setForm] = useState({
        star: null,
        evaluate: null,
        data: [],
        description: null
    })
    const [images, setImages] = useState([]);

    useEffect(() => {
        console.log('item', route.params);
        fetchOrderDetail();
    }, []);
    const fetchOrderDetail = async () => {
        console.log(itemId);
        dispatch(getOrderDetail(itemId))
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchOrderDetail();

            setRefreshing(false);
        }, 2000);


    }, []);
    const isInclued = (data) => {
        return form.data.includes(data);
    }
    const Add = (value) => {
        let newArray = form.data
        if (newArray.includes(value)) {
            let index = newArray.indexOf(value);
            newArray.splice(index, 1)
            setForm(prevState => {
                return { ...prevState, data: newArray }
            })
        }
        else {
            newArray.push(value)
            setForm(prevState => {
                return { ...prevState, data: newArray }
            })

        }
        console.log(form.data)
    }

    const pickImages = async () => {



        try {
            const { status } = await RNImagePicker.requestMediaLibraryPermissionsAsync()
            if (status === 'granted') {
                const result = await RNImagePicker.launchImageLibraryAsync({
                    options: {
                        allowsMultipleSelection: true,
                        mediaType: 'photo',
                        allowsEditing: true,
                        base64: true,
                        selectionLimit: 4
                    }
                })
                if (images.length < 4) {

                    console.log('result', result.assets);
                    if (result && result.assets.length == 1) {
                        setImages([
                            ...images,
                            result.assets[0]
                        ])
                        // setImages(result.assets[0])
                        // console.log(images)
                    }

                    if (result && result.assets.length > 1) {
                        let newImages = images;
                        result.assets.forEach(image => {
                            newImages.push(image)
                        })
                        setImages(newImages)

                    }
                }
            }

        } catch (error) {
            console.debug(error)
        }

    }

    const saveComplaint = () => {
        const formData = new FormData();
        console.log(star)
        let evaluate = null;
        if (star) {
            if (star <= 2) {
                evaluate = 'Quá tệ'
            }
            if (star == 3) {
                evaluate = 'Trung Bình'

            }
            if (star == 4) {

                evaluate = 'Tốt'
            }
            if (star > 4) {
                evaluate = 'Tuyệt vời'

            }
        }
        for (var i = 0; i < images.length; i++) {
            let localUri = images[i].uri;
            let filename = localUri.split('/').pop();
            console.log(localUri)
            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            console.log(match[1])
            let type = match ? `image/${match[1]}` : `image`;
            formData.append('images[' + i + ']', { uri: localUri, name: filename, type });
        }
        formData.append('star', star);
        formData.append('data', form.data);
        formData.append('description', form.description);
        formData.append('evaluate', evaluate);
        setSpinner(true)
        if (orderDetail) {
            dispatch(saveReViewOrder({ formData: formData, id: orderDetail.id },
                (message) => {
                    Toast.show({
                        type: 'success',
                        text1: message,
                        position: 'bottom'
                    });
                    setSpinner(false)
                    navigation.navigate('Home')
                },
                (error) => {
                    // console.log(error)
                    setSpinner(false)
                    Toast.show({
                        type: 'error',
                        text1: 'Lỗi!',
                        text2: error,
                        position: 'bottom',
                        visibilityTime: 3000
                    });

                },
            ));
        }
    }
    const DeleteImage = (data) => {
        let newImages = images
        let index = newImages.indexOf(data);
        console.log(index)
        newImages.splice(index, 1)
        setImages([...newImages])

    }

    const alertsaveComplaint = () =>
        Alert.alert('Bạn muốn đặt sản phẩm!', 'Cam Mặt Trời sẽ liên hệ với quý khách và gửi nông sản đến tay bạn', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {

                    saveComplaint()
                }

            },
        ]);
    return (
        <SafeAreaView style={styles.container} >
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>

                <Box>
                    <Flex direction='row' className="justify-between items-center w-full mb-3  my-4  px-5 ">
                        {star && star <= 2 ? <Text className="font-bold text-[17px] text-[#F78F43]" > Quá tệ</Text> : null}
                        {star && star == 3 ? <Text className="font-bold text-[17px] text-[#F78F43]" >Trung Bình</Text> : null}
                        {star && star == 4 ? <Text className="font-bold text-[17px] text-[#F78F43]" >Tốt</Text> : null}
                        {star && star == 5 ? <Text className="font-bold text-[17px] text-[#F78F43]" >Tuyệt vời</Text> : null}


                        <Flex direction='row' className=" items-center ">
                            {_.range(1, 6).map(i =>
                                <PressableOpacity key={i} onPress={() => {
                                    dispatch({ type: 'chooseStar', payload: i });
                                    if (star !== i) {
                                        setForm(prevState => {
                                            return { ...prevState, data: [] }
                                        })
                                    }

                                }}>
                                    <Box className="text-3xl mx-1 text-[#AEAEAE]" >
                                        <MaterialCommunityIcons name='star' size={32} color={i <= star ? '#F78F43' : '#AEAEAE'} />
                                    </Box>
                                </PressableOpacity>

                            )}

                        </Flex>
                    </Flex>
                    <HrTag mr={20} ml={20} opacity={0.3}></HrTag>


                </Box>
                <Box>
                    <Box className="text-[#AEAEAE] text-[13px]   mx-5  my-5 w-full">
                        <Text className="text-gray-800/50">Bạn hài lòng về dịch vụ chứ? Hãy cho chúng tôi biết ý kiến của bạn? </Text>
                    </Box>
                    <Box className="my-5 mx-5">


                        {star && star <= 2 ? <Flex direction='row' className="flex flex-wrap" >
                            <PressableOpacity onPress={() => Add('Sản phẩm lỗi')}>
                                <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Sản phẩm lỗi') ? 'border border-amber-600' : ''}`}
                                >Sản phẩm lỗi</Box>
                            </PressableOpacity>

                            <PressableOpacity onPress={() => Add('Đội Giá')}>
                                <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Đội Giá') ? 'border border-amber-600' : ''}`}
                                >Đội Giá</Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Thái độ nhận viên')}>
                                <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Thái độ nhận viên') ? 'border border-amber-600' : ''}`}
                                >Thái độ nhận viên</Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Giao hàng lâu')}>
                                <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Giao hàng lâu') ? 'border border-amber-600' : ''}`}
                                >Giao hàng lâu</Box>
                            </PressableOpacity>


                        </Flex >
                            : null}

                        {star && star == 3 ? <Flex direction='row' className="flex flex-wrap" >

                            <PressableOpacity onPress={() => Add('Sản phẩm lỗi')}>
                                <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Sản phẩm lỗi') ? 'border border-amber-600' : ''}`}
                                >Sản phẩm lỗi</Box>
                            </PressableOpacity>

                            <PressableOpacity onPress={() => Add('Đội Giá')}>
                                <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Đội Giá') ? 'border border-amber-600' : ''}`}
                                >Đội Giá</Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Thái độ nhận viên')}>
                                <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Thái độ nhận viên') ? 'border border-amber-600' : ''}`}
                                >Thái độ nhận viên</Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Giao hàng lâu')}>
                                <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Giao hàng lâu') ? 'border border-amber-600' : ''}`}
                                >Giao hàng lâu</Box>
                            </PressableOpacity>



                        </Flex >
                            : null}

                        {star && star >= 4 ? <Flex direction='row' className="flex flex-wrap" >
                            <PressableOpacity onPress={() => Add('Chất lượng')}>
                                <Box className={` px-2 py-1 rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Chất lượng') ? 'border border-amber-600' : ''}`}
                                >Chất
                                    lượng</Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Tuyệt vời')}>
                                <Box className={` px-2 py-1 rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Tuyệt vời') ? ' border border-amber-600' : ''}`}
                                >Tuyệt vời</Box>
                            </PressableOpacity>

                            <PressableOpacity onPress={() => Add('Sạch sẽ')}>
                                <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Sạch sẽ') ? 'border border-amber-600' : ''}`}
                                >Sạch sẽ</Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Đóng gói cẩn thận')}>
                                <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Đóng gói cẩn thận') ? 'border border-amber-600' : ''}`}
                                >Đóng gói cẩn thận</Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Thái độ thân thiện')}>
                                <Box className={`px-2 py-1 bỏ rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Thái độ thân thiện') ? 'border border-amber-600' : ''}`}
                                >Thái độ thân thiện</Box>
                            </PressableOpacity>



                        </Flex >
                            : null}

                        <Box className="my-5 bg-[#F0F0F0] rounded-lg">

                            <TextArea value={form.description} maxH="500" placeholder="Nhận xét thêm" className="bg-white"
                                maxW="1000"
                                onChangeText={text => setForm(prevState => {
                                    return { ...prevState, description: text }
                                })} // for android and ios
                            />
                        </Box>

                        <Flex direction='row' className="mt-1 items-center">
                            <PressableOpacity onPress={() => pickImages()}>
                                <MaterialCommunityIcons name='file-image-plus-outline' size={32} color='#AEAEAE' />
                            </PressableOpacity>
                            <Text className=" text-[#686868] ml-2 text-[12px]">Đính kèm hình ảnh</Text>
                        </Flex>

                        <Flex direction='row' className="flex flex-wrap" >
                            {images.length > 0 && images.map((image, index) =>
                                <Flex key={`image${index}`} direction='row' className="flex flex-wrap mx-1 my-1 mt-5" >
                                    <Flex direction='row' className="flex flex-wrap relative ">
                                        <MaterialCommunityIcons onPress={() => DeleteImage(image)} name='trash-can-outline' size={16} color='#fc5050' className="absolute bottom-auto left-auto right-0 top-0" />
                                        <Image source={{ uri: image.uri }} alt={`image${index}`} size="md" className="rounded-md" />

                                    </Flex>

                                </Flex>

                            )}
                        </Flex>
                        <Button onPress={() => saveComplaint()} className=" bottom-0 w-full  text-white bg-[#F78F43] rounded-xl btn_button"
                        >Gửi</Button>
                    </Box >

                </Box>





            </ScrollView >


        </SafeAreaView >
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
    }
})


export default OrderReview;