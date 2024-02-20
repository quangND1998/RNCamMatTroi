import React, { useState, useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, Animated, TouchableOpacity, Linking, Keyboard, View, ScrollView, RefreshControl, ImageBackground, SectionList, Alert } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Flex, Stack, Input, SearchBar, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import HrTag from '../HrTag';
import { PressableOpacity } from 'react-native-pressable-opacity';
import Icon from 'react-native-vector-icons/Ionicons';
import { useHelper } from '../../helpers/helper';
LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

const OrderItems = ({ order_detail }) => {
    const { formatPrice } = useHelper();
    const [collapseProduct, setCollapseProduct] = React.useState(false);
    return (
        <Box className="">
            <Box className="mt-2 bg-white px-5 py-5">
                <Flex direction='row' >
                    <Text bold className="font-roboto">Tóm tắt đơn hàng</Text>
                </Flex>
                {order_detail?.order_items?.length > 0 ? order_detail?.order_items.slice(0, 3).map((item, index) =>


                    <Flex key={index} direction='row' className=" justify-between  py-2 w-full">
                        <Flex direction='row' className=" items-center">
                            <Text className="py-0.5 px-1 border border-0.5 rounded-lg text-[#FF6100]">{item.quantity}x</Text>
                            <Box className="ml-3">
                                <Text className="text-[12px] ">{item.product?.name}</Text>
                            </Box>
                        </Flex>
                        <Text className="text-[#FF6100] font-roboto font-bold text-[12px]">{formatPrice(item.total_price)} đ
                        </Text>
                    </Flex>


                ) : null}

                {(collapseProduct && order_detail?.order_items?.length > 0) ? order_detail?.order_items.slice(3, order_detail?.order_items.length).map((item, index) =>


                    <Flex key="index" direction='row' className=" justify-between  py-2 w-full">
                        <Flex direction='row' className=" items-center">
                            <Text className="py-0.5 px-1 border border-0.5 rounded-lg text-[#FF6100]">{item.quantity}x</Text>
                            <Box className="ml-3">
                                <Text className="text-[12px] ">{item.product?.name}</Text>
                            </Box>
                        </Flex>
                        <Text className="text-[#FF6100] font-roboto font-bold text-[12px]">{formatPrice(item.total_price)} đ
                        </Text>
                    </Flex>


                ) : null}
                <Center >
                    {order_detail?.order_items?.length >= 4 ? <PressableOpacity onPress={() => setCollapseProduct(!collapseProduct)}>
                        <Text class="text-[12px]  mt-3 flex items-center" >{collapseProduct ? 'Thu gọn'
                            : 'Xem thêm'} <Icon name={collapseProduct ? 'chevron-up-outline'
                                : 'chevron-down-outline'} size={16} color="#686868" /></Text>
                    </PressableOpacity> : null}



                </Center>
            </Box>



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


export default OrderItems;