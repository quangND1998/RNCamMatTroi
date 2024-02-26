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
const Status = ({ order_transport }) => {

    const text_color = {
        not_shipping: 'font-semibold	 text-[#4F8D06]',
        not_delivered: 'font-semibold	text-[#F78F43]',
        delivered: 'font-semibold	text-[#4F8D06]',
        wait_refund: 'font-semibold	text-[#1D75FA]',
        refund: 'font-semibold	text-[#1D75FA]',
        wait_decline: 'font-semibold	text-[#FF0000]',
        decline: 'font-semibold	text-[#F00]',
        addition_document: 'font-semibold	text-[#f8c717]',
        wait_warehouse: "font-semibold	text-[#FF0000]",
    }
    const color = useMemo(() => {
        if (order_transport.order.state_document == 'not_push' && order_transport.status == 'delivered') {
            return text_color.addition_document
        }
        return text_color[order_transport.status]
    })

    const text = useMemo(() => {
        if (order_transport.order.state_document == 'not_push' && order_transport.status == 'delivered') {
            return SHIPPER_STATUS.addition_document
        }
        return SHIPPER_STATUS[order_transport.status]
    })

    return ( <
        SafeAreaView >
            <Text className = { `${color}` } > { text } </Text>
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


export default Status;