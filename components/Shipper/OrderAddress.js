import React, { useState, useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, Animated, TouchableOpacity, Linking, Keyboard, View, ScrollView, RefreshControl, ImageBackground, SectionList, Alert } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Flex, Stack, Input, SearchBar, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import { SafeAreaView } from 'react-native-safe-area-context';
import HrTag from '../HrTag';
import { PressableOpacity } from 'react-native-pressable-opacity';
import { confirmCustomerRecive, confirmNotShipping, confirmShipping, fetchOrders, orderStatus } from '../../store/actions/shipper';
import Icon from 'react-native-vector-icons/Ionicons';

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
const OrderAddress = ({ order_detail }) => {




    return (


        <Box className="">

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

            {/* <Box className="mt-2 bg-white px-5 py-5">
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
                </Box> */}



        </Box>


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


export default OrderAddress;