import React, { useState, useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, Animated, TouchableOpacity, Linking, Keyboard, View, ScrollView, RefreshControl, ImageBackground, SectionList, Alert } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Flex, Stack, Input, SearchBar, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import { SafeAreaView } from 'react-native-safe-area-context';
import HrTag from '../HrTag';
import { PressableOpacity } from 'react-native-pressable-opacity';
import { confirmShipping, fetchOrders, orderStatus } from '../../store/actions/shipper';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])
import { SHIPPER_STATUS } from './constants';
import { useHelper } from '../../helpers/helper';
import PaginationMuti from '../PaginationMuti';
import { getOrderShipperDetail } from '../../store/actions/shipper';
import Point from '../Svg/Point';
import CopyOutline from '../Svg/CopyOutline';
import * as RNImagePicker from 'expo-image-picker'
import Spinner from 'react-native-loading-spinner-overlay';

const OrderShipperDetail = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const { orderId } = route.params;
    const [refreshing, setRefreshing] = React.useState(false);
    const [spinner, setSpinner] = useState(false)
    const order_detail = useSelector(state => state.shipper.order_detail)
    const [collapseProduct, setCollapseProduct] = React.useState(false);
    const { formatOnlyDate, formatPrice } = useHelper();
    const [images, setImages] = useState([]);
    const fetchOrderDetail = () => {
        dispatch(getOrderShipperDetail(orderId));
    }



    useEffect(() => {
        fetchOrderDetail();

    }, []);
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
                    if (order_detail) {
                        dispatch(confirmShipping(order_detail.id, () => {
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

    return (
        <SafeAreaView style={styles.container}>
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
                <Box className="">
                    {order_detail ? <Box className=" w-full bg-white px-5 py-5 rounded-sm">
                        <Flex direction='row' className=" justify-between">
                            <Text bold className="font-inter">Mã đặt hàng</Text>

                            <Flex direction='row' className=" items-center">
                                <Text className=" font-inter mr-3 text-[13px] text-[#686868]">{order_detail.order_number}</Text>
                                <CopyOutline size={16} color="#686868" />
                                {/* <Icon name="copy-outline" size={16} color="#686868" /> */}
                            </Flex>
                        </Flex>
                        <Flex direction='row' className=" w-full items-center mt-1 ml-2">
                            <Box className="mt-2">
                                {/* <Image src="/public/assets/images/goi1.png" class="w-12 h-12 " alt=""> */}
                                <Image source={require('../../assets/images/goi1.png')} class="w-12 h-12 " alt=""></Image>
                            </Box>

                            <Box className="ml-4">
                                {order_detail.type == 'retail' ? <Text bold className="font-inter">Đơn mua lẻ
                                </Text> : null}
                                {order_detail.type == 'gift_delivery' ? <Text bold className="font-inter">Giao
                                    quà
                                </Text> : null}

                                {order_detail.shipper_status == 'pending' ?
                                    <Text className="text-xs text-[#e94949] mt-1">Chưa lấy
                                    </Text>
                                    : order_detail.shipper_status == 'shipping' ?
                                        <Text className="text-xs text-[#FF6100] mt-1">Đang vận chuyển
                                        </Text>
                                        : (order_detail.shipper_status == 'delivered' && order_detail.shipper_status == null) ?
                                            <Text className="text-xs text-[#4F8D06] mt-1">Đã giao, chưa up hồ sơ
                                            </Text> : (order_detail.shipper_status == 'delivered' && order_detail.shipper_status == 'pending') ?
                                                <Text className="text-xs text-[#4F8D06] mt-1">Đã giao, đã up hồ sơ
                                                </Text> : (order_detail.shipper_status == 'delivered' && order_detail.shipper_status == 'approved') ?
                                                    <Text className="text-xs text-[#4F8D06] mt-1">Đã giao, đủ hồ sơ
                                                    </Text> : null
                                }


                            </Box>


                        </Flex>
                        <Flex direction='row' className="mt-5  ">
                            {order_detail?.shipper_status == 'pending' ? <PressableOpacity onPress={alertShipping}>
                                <Box className="bg-white rounded-md  px-8 py-2 border border-0.5 ml-2" variant={'unstyled'}>
                                    Y
                                </Box>
                            </PressableOpacity> : null}

                            {order_detail?.shipper_status == 'shipping' ? <PressableOpacity >
                                <Button className="bg-white rounded-md  px-8 py-2 border border-0.5 ml-2" variant={'unstyled'}>
                                    Y
                                </Button>
                            </PressableOpacity> : null}
                            {order_detail.shipper_status == 'pending' ?
                                <Button className=" text-white w-4/6 px-3s bg-[#FF0000] rounded-md ml-3  mr-1 items-center" >
                                    Lấy hàng
                                </Button>
                                : order_detail.shipper_status == 'shipping' ? <Button className=" text-white bg-[#4F8D06] rounded-md ml-3  mr-2 items-center" >
                                    Khách đã nhận
                                </Button> : null}
                        </Flex>
                    </Box> : null}
                    <Box className="w-full bg-white px-5 py-2 mt-2 rounded-sm">
                        <Flex direction='row' className=" items-center">
                            <Point size={24} />
                            <Text bold className="font-inter text-[12px] text-[#686868] ">Trang trại Cam Mặt Trời </Text>
                        </Flex>
                        <Box className="mx-1 ">
                            <Image source={require('../../assets/icon/location.png')} className="h-1 w-1 " alt="location1" ></Image>
                        </Box>
                        <Box className="mx-1 mt-1">
                            <Image source={require('../../assets/icon/location.png')} className="h-1 w-1 " alt="location2"></Image>
                        </Box>

                        <Flex direction='row' className="items-center ">
                            <Image source={require('../../assets/icon/end.png')} className="h-4 w-4 " alt="end"></Image>
                            <Text bold className="font-inter text-[12px] text-[#686868] ">{order_detail?.address}, {order_detail?.wards}, {order_detail?.district}, {order_detail?.city}  </Text>
                        </Flex>
                    </Box>

                    <Box className="mt-2 bg-white px-5 py-5">
                        <Flex direction='row' >
                            <Text bold className="font-roboto">Tóm tắt đơn hàng</Text>
                        </Flex>
                        {order_detail?.order_items.length > 0 ? order_detail?.order_items.slice(0, 3).map((item, index) =>


                            <Flex key={index} direction='row' className=" justify-between  py-2 w-full">
                                <Flex direction='row' className=" items-center">
                                    <Text className="py-0.5 px-1 border border-0.5 rounded-lg text-[#F78F43]">{item.quantity}x</Text>
                                    <Box className="ml-3">
                                        <Text className="text-[12px] ">{item.product?.name}</Text>
                                    </Box>
                                </Flex>
                                <Text className="text-[#FF6100] font-roboto font-bold text-[12px]">{formatPrice(item.total_price)} đ
                                </Text>
                            </Flex>


                        ) : null}

                        {(collapseProduct && order_detail?.order_items.length > 0) ? order_detail?.order_items.slice(3, order_detail?.order_items.length).map((item, index) =>


                            <Flex key="index" direction='row' className=" justify-between  py-2 w-full">
                                <Flex direction='row' className=" items-center">
                                    <Text className="py-0.5 px-1 border border-0.5 rounded-lg text-[#F78F43]">{item.quantity}x</Text>
                                    <Box className="ml-3">
                                        <Text className="text-[12px] ">{item.product?.name}</Text>
                                    </Box>
                                </Flex>
                                <Text className="text-[#FF6100] font-roboto font-bold text-[12px]">{formatPrice(item.total_price)} đ
                                </Text>
                            </Flex>


                        ) : null}
                        <Center >
                            {order_detail?.order_items.length >= 4 ? <PressableOpacity onPress={() => setCollapseProduct(!collapseProduct)}>
                                <Text class="text-[12px]  mt-3 flex items-center" >{collapseProduct ? 'Thu gọn'
                                    : 'Xem thêm'} <Icon name={collapseProduct ? 'chevron-up-outline'
                                        : 'chevron-down-outline'} size={16} color="#686868" /></Text>
                            </PressableOpacity> : null}



                        </Center>
                    </Box>
                    {order_detail ? <Box className="mt-2 bg-white px-5 py-5">
                        <Flex direction='row' className="justify-between" >
                            <Text className="text-[13px] font-[400]">Tổng tạm tính</Text>
                            <Text className="text-[13px] font-[400]">{formatPrice(order_detail.grand_total)} vnđ</Text>
                        </Flex>
                        <Flex direction='row' className="justify-between" >
                            <Text className="text-[13px] font-[400]">Phí áp dụng</Text>

                            <Text className="text-[13px] font-[400]">  {order_detail.shipping_fee > 0 ? formatPrice(order_detail.shipping_fee) : 'Miễn phí'}</Text>
                        </Flex>
                        <Flex direction='row' className="justify-between" >
                            <Text className="text-[13px] font-[400] text-[#686868]"><Icon name='pricetag-outline' className="mr-2" size={16} color="#F78F43" />Ưu đãi</Text>
                            {order_detail.discount ? <Text className="text-[13px] font-[400]">-{formatPrice(order_detail.discount.discount_mount)}</Text> : null}

                        </Flex>
                    </Box> : null}

                    <Box className="mt-2 bg-white px-5 py-5">
                        <Flex direction='row' className="justify-between" >
                            <Text bold className="text-[16px]">Tải ảnh</Text>

                        </Flex>
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
                            </Flex>
                            <PressableOpacity onPress={() => pickImages()}>
                                <Box className="w-16 h-16  items-center justify-center flex  rounded-lg" style={{
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

                    </Box>
                    <Box className="mt-2 bg-white px-5 py-5">
                        <Flex direction='row' className="justify-between" >
                            <Text bold className="text-[16px]">Tổng thu</Text>
                            <Text className="text-[13px] font-[400]">{formatPrice(order_detail?.last_price)} vnđ</Text>
                        </Flex>

                    </Box>
                    <Box className="mt-2 bg-white px-5 py-5">
                        <Flex direction='column'  >
                            <Text bold className="text-[16px]">Ghi chú </Text>
                            <Text className="text-[14px] font-[400]">{order_detail?.note}</Text>
                        </Flex>

                    </Box>
                </Box>


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