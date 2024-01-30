import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, Animated, TouchableOpacity, Linking, Keyboard, View, ScrollView, RefreshControl, ImageBackground, SectionList, Platform } from 'react-native';
import { Center, Skeleton, Container, Heading, Button, Text, Box, Flex, Stack, Input, SearchBar, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import { SafeAreaView } from 'react-native-safe-area-context';

LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])
import { SHIPPER_STATUS } from '../constants';
const StatusDetail = ({ order_transport }) => {

    const status_color = {
        not_shipping: ' text-[#4F8D06]',
        not_delivered: 'text-[#FF6100]',
        delivered: 'text-[#4F8D06]',
        wait_refund: 'text-[#1D75FA]',
        refund: 'text-[#1D75FA]',
        wait_decline: 'text-[#FF0000]',
        decline: 'text-[#FF0000]',


    }

    const status_text = {
        not_shipping: 'Chưa lấy',
        not_delivered: 'Đang vận chuyển',
        delivered: 'Đã giao',
        wait_refund: 'Yêu cầu chờ hoàn',
        refund: 'Đã hoàn',
        wait_decline: 'Yêu cầu chờ hủy',
        decline: 'Hủy giao',


    }

    const docuemnt_text = {
        not_push: 'chưa up hồ sơ',
        not_approved: 'đã up hồ sơ',
        approved: 'đủ hồ sơ',



    }
    const color = useMemo(() => {
        return status_color[order_transport.status]
    })

    const text = useMemo(() => {
        if (order_transport.order.state_document && order_transport.status == 'delivered') {
            return `${status_text[order_transport.status]}, ${docuemnt_text[order_transport.order.state_document]}`
        }
        return SHIPPER_STATUS[order_transport.status]
    })

    return (
        <SafeAreaView >

            <Text
                className={`${color}`}>
                {text}
            </Text>



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


export default StatusDetail;