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

const OrderPrice = ({ order_detail }) => {
    const { formatPrice } = useHelper();
    const [collapseProduct, setCollapseProduct] = React.useState(false);
    return (
        <Box className="">
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


export default OrderPrice;