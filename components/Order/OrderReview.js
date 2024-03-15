import React, { useState, useEffect } from 'react';
import { LogBox, Dimensions, TextInput } from 'react-native';
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
import Star from '../Svg/Star';
import FileUpload from '../Svg/FileUpload';
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
            if (star < 2) {
                evaluate = 'Rất tệ'
            }
            if (star == 2) {
                evaluate = 'Kém'
            }
            if (star == 3) {
                evaluate = 'Trung Bình'

            }
            if (star == 4) {

                evaluate = 'Tốt'
            }
            if (star > 4) {
                evaluate = 'Hoàn hảo'

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
                textContent={'Vui lòng đợi...'}
                textStyle={styles.spinnerTextStyle}
            />
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>

                <Box>
                    <Flex direction='row' className="justify-between items-center w-full  mt-5 mb-2 px-5 ">
                        {star && star < 2 ? <Text className="font-bold text-[17px] text-[#FF6100]" > Rất tệ</Text> : null}
                        {star && star == 2 ? <Text className="font-bold text-[17px] text-[#FF6100]" > Kém</Text> : null}
                        {star && star == 3 ? <Text className="font-bold text-[17px] text-[#FF6100]" >Trung Bình</Text> : null}
                        {star && star == 4 ? <Text className="font-bold text-[17px] text-[#FF6100]" >Tốt</Text> : null}
                        {star && star == 5 ? <Text className="font-bold text-[17px] text-[#FF6100]" >Hoàn hảo</Text> : null}


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
                                        <Star width={28} height={28} color={i <= star ? '#FF6100' : '#AEAEAE'} />
                                    </Box>
                                </PressableOpacity>

                            )}

                        </Flex>
                    </Flex>
                    <HrTag mr={20} ml={20} opacity={0.3}></HrTag>


                </Box>
                <Box className="mb-[277px]">
                    <Box className="text-[#AEAEAE] text-[13px] mx-5 my-2 ">
                        <Text className="text-[#AEAEAE] pr-3">Bạn hài lòng về dịch vụ chứ? Hãy cho chúng tôi biết ý kiến của bạn? </Text>
                    </Box>
                    <Box className="my-2 mx-4">

                        {star && star < 2 ? <Flex direction='row' className="flex flex-wrap" >
                            <PressableOpacity onPress={() => Add('Sản phẩm lỗi')}>
                                <Box className={`px-2 py-1 text-[8px] rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Sản phẩm lỗi') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Sản phẩm lỗi</Text></Box>
                            </PressableOpacity>

                            <PressableOpacity onPress={() => Add('Đội giá')}>
                                <Box className={`px-2 py-1 text-[8px] rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Đội giá') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Đội giá</Text></Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Thái độ nhân viên')}>
                                <Box className={`px-2 py-1 text-[8px] rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Thái độ nhân viên') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Thái độ nhân viên</Text></Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Giao hàng lâu')}>
                                <Box className={`px-2 py-1 text-[8px] rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Giao hàng lâu') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Giao hàng lâu</Text></Box>
                            </PressableOpacity>


                        </Flex >
                            : null}
                        {star && star == 2 ? <Flex direction='row' className="flex flex-wrap" >
                            <PressableOpacity onPress={() => Add('Sản phẩm lỗi')}>
                                <Box className={`px-2 py-1 text-[8px] rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Sản phẩm lỗi') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Sản phẩm lỗi</Text></Box>
                            </PressableOpacity>

                            <PressableOpacity onPress={() => Add('Đội giá')}>
                                <Box className={`px-2 py-1 text-[8px] rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Đội giá') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Đội giá</Text></Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Thái độ nhân viên')}>
                                <Box className={`px-2 py-1 text-[8px]  rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Thái độ nhân viên') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Thái độ nhân viên</Text></Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Giao hàng lâu')}>
                                <Box className={`px-2 py-1 text-[8px] rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Giao hàng lâu') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Giao hàng lâu</Text></Box>
                            </PressableOpacity>


                        </Flex >
                            : null}


                        {star && star == 3 ? <Flex direction='row' className="flex flex-wrap" >

                            <PressableOpacity onPress={() => Add('Sản phẩm lỗi')}>
                                <Box className={`px-2 py-1 text-[8px] rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Sản phẩm lỗi') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Sản phẩm lỗi</Text></Box>
                            </PressableOpacity>

                            <PressableOpacity onPress={() => Add('Đội giá')}>
                                <Box className={`px-2 py-1 text-[8px] rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Đội giá') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Đội giá</Text></Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Thái độ nhân viên')}>
                                <Box className={`px-2 py-1 text-[8px] rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Thái độ nhân viên') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Thái độ nhân viên</Text></Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Giao hàng lâu')}>
                                <Box className={`px-2 py-1 text-[8px]  rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Giao hàng lâu') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Giao hàng lâu</Text></Box>
                            </PressableOpacity>



                        </Flex >
                            : null}

                        {star && star >= 4 ? <Flex direction='row' className="flex flex-wrap text-[10px]" >
                            <PressableOpacity onPress={() => Add('Chất lượng')}>
                                <Box className={` px-2 py-1 text-[8px]  rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Chất lượng') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Chất lượng</Text></Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Tuyệt vời')}>
                                <Box className={` px-2 py-1 text-[8px] rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Tuyệt vời') ? ' border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Tuyệt vời</Text></Box>
                            </PressableOpacity>

                            <PressableOpacity onPress={() => Add('Sạch sẽ')}>
                                <Box className={`px-2 py-1 text-[8px] rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Sạch sẽ') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Sạch sẽ</Text></Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Đóng gói cẩn thận')}>
                                <Box className={`px-2 py-1 text-[8px] rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Đóng gói cẩn thận') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Đóng gói cẩn thận</Text></Box>
                            </PressableOpacity>
                            <PressableOpacity onPress={() => Add('Thái độ thân thiện')}>
                                <Box className={`px-2 py-1 text-[8px] bỏ rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Thái độ thân thiện') ? 'border border-amber-600' : ''}`}
                                ><Text className="text-[10px]">Thái độ thân thiện</Text></Box>
                            </PressableOpacity>



                        </Flex >
                            : null}

                        <Box className="my-5 bg-[#F0F0F0] rounded-lg">

                            <TextInput underlineColorAndroid="transparent"

                                placeholderTextColor="grey"
                                numberOfLines={10}
                                multiline={true} style={{
                                    flex: 1,
                                    textAlignVertical: 'top',
                                    padding: 10,
                                    paddingLeft: 15,
                                    height: 150, justifyContent: "flex-start"
                                }} value={form.description} placeholder="Nhận xét thêm" className="rounded-md bg-white  border-white text-[11px]"

                                onChangeText={text => setForm(prevState => {
                                    return { ...prevState, description: text }
                                })} // for android and ios
                            />
                        </Box>

                        <Flex direction='row' className="mt-1 mb-3 items-center">
                            <PressableOpacity onPress={() => pickImages()}>
                                {/* <MaterialCommunityIcons name='file-image-plus-outline' size={32} color='#AEAEAE' /> */}
                                <FileUpload />
                            </PressableOpacity>
                            <Text className=" text-[#AEAEAE]  ml-2 text-[12px]">Đính kèm hình ảnh</Text>
                        </Flex>

                        <Flex direction='row' className="flex flex-wrap mb-[30px]" >
                            {images.length > 0 && images.map((image, index) =>
                                <Flex key={`image${index}`} direction='row' className=" flex flex-wrap mx-1 my-1" >
                                    <Box className="relative ">
                                        <Box className="absolute right-0 top-0 z-10 ">
                                            <PressableOpacity onPress={() => DeleteImage(image)}>
                                                <MaterialCommunityIcons name='trash-can-outline' size={16} color='#fc5050' />
                                            </PressableOpacity>

                                        </Box>
                                        <Image source={{ uri: image.uri }} alt={`image${index}`} size="md" className="rounded-md" />

                                    </Box>

                                </Flex>

                            )}
                        </Flex>

                    </Box >

                </Box>
            </ScrollView >
            <Box className="absolute mx-5 w-[90%] my-[87px] bottom-0 px-2 py-3 lg:w-[70%] lg:mx-[15%] text-white  bg-[#FF6100] rounded-[10px] btn_button">
                <Button onPress={() => saveComplaint()} className=" w-full  text-white bg-[#FF6100] rounded-[10px] btn_button"
                >Gửi</Button>
            </Box>

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