import React, { useState, useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, Animated, TouchableOpacity, Linking, Keyboard, View, TextInput, ScrollView, RefreshControl, ImageBackground, SectionList, Alert } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Flex, Stack, SearchBar, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import { SafeAreaView } from 'react-native-safe-area-context';
import HrTag from '../HrTag';
import { PressableOpacity } from 'react-native-pressable-opacity';
import { UploadOrder, confirmCustomerRecive, confirmNotShipping, confirmShipping, deleteImage, fetchOrders, orderStatus } from '../../store/actions/shipper';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderAddress from './OrderAddress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])
import { SHIPPER_STATUS } from './constants';
import { useHelper } from '../../helpers/helper';
import { getOrderShipperDetail } from '../../store/actions/shipper';
import Point from '../Svg/Point';
import CopyOutline from '../Svg/CopyOutline';
import * as RNImagePicker from 'expo-image-picker'
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import OrderItems from './OrderItems';
import OrderPrice from './OrderPrice';
import Pending from '../Pending';
import StatusDetail from '../Shipper/Components/StatusDetail'
import Clipboard from '@react-native-community/clipboard';

const OrderShipperDetail = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const { orderId } = route.params;
    const [refreshing, setRefreshing] = React.useState(false);
    const [spinner, setSpinner] = useState(false)
    const [text, setText] = useState()
    const order_transport_detail = useSelector(state => state.shipper.order_transport_detail)
    const isLoading = useSelector(state => state.shipper.isLoading)
    const { formatOnlyDate, formatPrice } = useHelper();
    const [images, setImages] = useState([]);
    const fetchOrderDetail = () => {
        dispatch(getOrderShipperDetail(orderId));
    }



    useEffect(() => {
        fetchOrderDetail();

    }, []);

    const copyToClipboard = (value) => {
        Clipboard.setString(value);
        Toast.show({
            type: 'info',
            text1: 'Đã lưu vào bộ nhớ tạm!',
            position: 'bottom',
         

        });
    };
    const pickImages = async () => {
        if (order_transport_detail.order.state_document == 'approved') {


            Toast.show({
                type: 'error',
                text1: 'Lỗi!',
                text2: 'Đơn hàng đã duyệt hồ sơ, vui lòng không upload thêm ảnh!',
                position: 'bottom',
                visibilityTime: 3000
            });
            return;
        }
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
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchOrderDetail();
            setRefreshing(false);
        }, 2000);

    }, []);
    const DeleteImage = (data) => {
        let newImages = images

        let index = newImages.indexOf(data);
        console.log(index)
        newImages.splice(index, 1)
        setImages([...newImages])

    }

    const alertShipping = () =>
        Alert.alert('Xác nhận đã lấy đơn hàng!', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    setSpinner(true)
                    if (order_transport_detail) {
                        dispatch(confirmShipping(order_transport_detail.id, () => {
                            Toast.show({
                                type: 'success',
                                text1: 'Đã xác nhận lấy hàng',
                                position: 'bottom'
                            });
                            setSpinner(false)
                        },
                            () => {
                                setSpinner(false)
                                Toast.show({
                                    type: 'error',
                                    text1: 'Lỗi!',
                                    position: 'bottom',
                                    visibilityTime: 3000
                                });

                            }))
                    }
                }

            },
        ]);
    const alertNotShipping = () =>
        Alert.alert('Xác nhận không nhận đơn hàng này!', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    setSpinner(true)
                    if (order_transport_detail) {
                        dispatch(confirmNotShipping(order_transport_detail.id, () => {
                            Toast.show({
                                type: 'success',
                                text1: 'Đã xác nhận không nhận đơn hàng',
                                position: 'bottom'
                            });
                            setSpinner(false)
                            navigation.navigate('HomeShipper')
                        },
                            () => {
                                setSpinner(false)
                                Toast.show({
                                    type: 'error',
                                    text1: 'Lỗi!',
                                    position: 'bottom',
                                    visibilityTime: 3000
                                });

                            }))
                    }
                }

            },
        ]);
    const alertCustomerRecive = () => {
        const formData = new FormData();

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

        Alert.alert('Xác nhận khách hàng đã lấy đơn!', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    setSpinner(true)


                    if (order_transport_detail) {
                        dispatch(confirmCustomerRecive({ id: order_transport_detail.id, formData: formData },
                            () => {
                                Toast.show({
                                    type: 'success',
                                    text1: 'Đã xác khách đã nhận đơn hàng',
                                    position: 'bottom'
                                });
                                setSpinner(false)
                                setImages([])
                            },
                            () => {
                                setSpinner(false)
                                Toast.show({
                                    type: 'error',
                                    text1: 'Lỗi!',
                                    position: 'bottom',
                                    visibilityTime: 3000
                                });

                            }))
                    }
                }

            },
        ]);
    }
    const alertUpload = () => {
        if (images.length == 0) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi!',
                text2: 'Chưa up ảnh hồ sơ',
                position: 'bottom',
                visibilityTime: 3000
            });
            return

        }
        const formData = new FormData();

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

        Alert.alert('Xác nhận Upload ảnh hồ sơ !', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    setSpinner(true)


                    if (order_transport_detail) {
                        dispatch(UploadOrder({ id: order_transport_detail.id, formData: formData },
                            () => {
                                Toast.show({
                                    type: 'success',
                                    text1: 'Đã tải hồ sơ',
                                    position: 'bottom'
                                });
                                setSpinner(false)
                                setImages([])
                            },
                            () => {
                                setSpinner(false)
                                Toast.show({
                                    type: 'error',
                                    text1: 'Lỗi!',
                                    position: 'bottom',
                                    visibilityTime: 3000
                                });

                            }))
                    }
                }

            },
        ]);
    }
    const alertDeleteImage = (media_id) => {
        if (order_transport_detail.order.state_document !== 'approved') {


            Alert.alert('Bạn muốn xóa ảnh khỏi hồ sơ!', '', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {



                        if (order_transport_detail
                        ) {
                            dispatch(deleteImage(order_transport_detail.id, media_id,
                                () => {
                                    Toast.show({
                                        type: 'success',
                                        text1: 'Đã xóa ảnh',
                                        position: 'bottom'
                                    });

                                },
                                (error) => {

                                    Toast.show({
                                        type: 'error',
                                        text1: 'Lỗi!',
                                        text2: error,
                                        position: 'bottom',
                                        visibilityTime: 3000
                                    });

                                }))
                        }
                    }

                },
            ]);
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Lỗi!',
                text2: 'Đơn hàng đã duyệt hồ sơ, vui lòng không xóa ảnh!',
                position: 'bottom',
                visibilityTime: 3000
            });
        }
    }
    return (
        <SafeAreaView style={styles.container}>
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

                {isLoading == true ?
                    <Pending /> : <Box className="">
                        {order_transport_detail ?
                            <Box className=" w-full bg-white px-5 py-4 rounded-sm">
                                <Flex direction='row' className=" justify-between">
                                    <Text bold className="font-inter">Mã đặt hàng</Text>

                                    <Flex direction='row' className=" items-center">
                                        <Text className=" font-inter mr-3 text-[13px] text-[#686868]">{order_transport_detail.order_transport_number}</Text>
                                        <PressableOpacity onPress={() => copyToClipboard(order_transport_detail.order_transport_number)}>
                                            <CopyOutline size={16} color="#686868" />
                                        </PressableOpacity>

                                        {/* <Icon name="copy-outline" size={16} color="#686868" /> */}
                                    </Flex>
                                </Flex>
                                <Flex direction='row' className=" w-full items-center mt-1 ml-2">
                                    <Box className="mt-2">
                                        {/* <Image src="/public/assets/images/goi1.png" class="w-12 h-12 " alt=""> */}
                                        <Image source={require('../../assets/images/goi1.png')} class="w-12 h-12 " alt=""></Image>
                                    </Box>
                                    <Box className="ml-4">
                                        {order_transport_detail.order?.type == 'retail' ? <Text bold className="font-inter">Đơn mua lẻ
                                        </Text> : null}
                                        {order_transport_detail.order?.type == 'gift_delivery' ? <Text bold className="font-inter">Giao
                                            quà
                                        </Text> : null}
                                        <StatusDetail order_transport={order_transport_detail} />

                                    </Box>

                                </Flex>
                                {(order_transport_detail.state == 'refunding' || order_transport_detail.state == 'refund' || order_transport_detail.state == 'decline') ? <Text className="font-inter ml-3 mt-1">Lý do: {order_transport_detail.reason}
                                </Text> : null}
                                <Flex direction='row' className="mt-5  items-center ">
                                    {/* {order_transport_detail?.status == 'not_shipping' ? <PressableOpacity onPress={alertShipping}>
                                        <Box className="bg-white rounded-md  px-8 py-2.5 border border-0.5 ml-2" >
                                            Y
                                        </Box>
                                    </PressableOpacity> : null} */}

                                    {order_transport_detail?.status == 'not_shipping' ?

                                        <TextInput className=" px-8 py-2.5 border-[1px] border-[#F2F2F2] mt-2 ml-2 rounded-md " value={text} maxLength={1} onChangeText={text => setText(text)} />

                                        : null}

                                    {order_transport_detail?.status == 'not_delivered' ?

                                        <TextInput className=" px-8 py-2 border-[1px] border-[#F2F2F2] ml-2 mt-2 rounded-md " value={text} maxLength={1} onChangeText={text => setText(text)} />

                                        : null}
                                    {order_transport_detail.status == 'not_shipping' ?
                                        <PressableOpacity onPress={alertShipping} disabled={(text && text.toUpperCase() == 'Y') ? false : true} 
                                        className="flex-grow px-8 py-3 bg-[#FF0000] rounded-[5px] ml-3  mt-2 mr-1 items-center text-white" >

                                            <Text className="text-white">Lấy hàng</Text>

                                        </PressableOpacity>
                                        : order_transport_detail.status == 'not_delivered' ?
                                            <PressableOpacity onPress={alertCustomerRecive} disabled={(text && text.toUpperCase() == 'Y') ? false : true} 
                                            className="flex-grow px-8 py-3 bg-[#4F8D06] rounded-[5px] ml-3  mt-2 mr-1 items-center text-white" >
                                                <Text className="text-white" >
                                                    Khách đã nhận
                                                </Text></PressableOpacity> : null}
                                </Flex>
                            </Box> : null}

                        <OrderAddress order_detail={order_transport_detail?.order} />
                        <OrderItems order_detail={order_transport_detail?.order} />
                        <OrderPrice order_detail={order_transport_detail?.order} />
                        {order_transport_detail ?
                            <Box className="mt-2 bg-white px-5 py-5">
                                <Flex direction='row'  >
                                    {
                                        order_transport_detail.status == 'not_shipping' ? <Text bold className="text-[16px] ">Tải ảnh</Text>
                                            : order_transport_detail.status == 'not_delivered' ? <Text bold className="text-[16px] ">Tải ảnh</Text>
                                                : <Text bold className="text-[16px]">Hồ sơ nhận hàng</Text>}

                                    {
                                        order_transport_detail.order.state_document == 'not_push' ? <Text bold className="text-[16px] text-[#F78F43] ml-4">Chưa up</Text>
                                            : order_transport_detail.order.state_document == 'not_approved' ? <Text bold className="text-[16px] text-[#F78F43] ml-4">Chưa duyệt</Text>
                                                : order_transport_detail.order.state_document == 'approved' ? <Text bold className="text-[16px] text-[#27AE60] ml-4">Đã duyệt</Text> : null}


                                </Flex>
                                {order_transport_detail ? <Flex className="flex-wrap ">
                                    <Flex direction='row' className="flex flex-wrap" >
                                        {order_transport_detail.order?.order_shipper_images?.length > 0 && order_transport_detail.order?.order_shipper_images.map((image, index) =>
                                            <Flex key={`image${index}`} direction='row' className=" flex flex-wrap mx-1 my-1" >
                                                <Box className="absolute right-0 top-0 z-10 ">
                                                    <PressableOpacity onPress={() => alertDeleteImage(image.id)}>
                                                        <MaterialCommunityIcons name='trash-can-outline' size={16} color='#fc5050' />
                                                    </PressableOpacity>
                                                </Box>
                                                <Box className="relative ">
                                                    <Image source={{ uri: image.original_url }} alt={`image${index}`} size="md" className="rounded-md" />
                                                </Box>
                                            </Flex>

                                        )}
                                    </Flex>
                                </Flex> : null}

                                <Flex className="flex-wrap my-3">
                                    <Flex direction='row' className="flex flex-wrap" >
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
                                        <PressableOpacity onPress={() => pickImages()}>
                                            <Box className="mx-1 w-20 h-20  items-center justify-center flex  rounded-lg" style={{
                                                borderRadius: 1,
                                                borderWidth: 1,
                                                borderStyle: 'dashed',
                                                borderColor: 'gray',
                                                borderTopColor: 'white'
                                            }}>
                                                {/* className="w-16 h-16 border items-center border-gray-500 mx-1 justify-center flex  rounded-lg"> */}
                                                <Icon name="add-outline" size={16} color="#686868" />
                                            </Box>
                                        </PressableOpacity>
                                    </Flex>




                                </Flex>
                                {
                                    (order_transport_detail.state == 'delivered' && order_transport_detail?.order?.state_document == 'not_push') ? <PressableOpacity onPress={alertUpload}>
                                        <Center className="text-white px-1 py-2  px-3s bg-[#FF0000] rounded-md ml-3  mt-2 mr-1 items-center">
                                            <Text className='text-white'> Up hồ sơ</Text>
                                        </Center>
                                    </PressableOpacity> : null
                                }

                            </Box>
                            : null}

                        <Box className="mt-2 bg-white px-5 py-5">
                            <Flex direction='row' className="justify-between" >
                                <Text bold className="text-[16px]">Tổng thu</Text>
                                <Text className="text-[13px] font-[400]">{formatPrice(order_transport_detail?.order?.last_price)} vnđ</Text>
                            </Flex>

                        </Box>
                        <Box className="mt-2 bg-white px-5 py-5">
                            <Flex direction='column'  >
                                <Text bold className="text-[16px]">Ghi chú </Text>
                                <Text className="text-[14px] font-[400]">{order_transport_detail?.order?.note}</Text>
                            </Flex>

                        </Box>
                    </Box>}

            </ScrollView >
        </SafeAreaView >
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


export default OrderShipperDetail;