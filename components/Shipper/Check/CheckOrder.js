import React, { useState, useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, Animated, TouchableOpacity, Linking, Keyboard, View, ScrollView, RefreshControl, ImageBackground, SectionList, YellowBox } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Flex, Stack, Input, SearchBar, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import { SafeAreaView } from 'react-native-safe-area-context';
import HrTag from '../../HrTag';
import { PressableOpacity } from 'react-native-pressable-opacity';
import { fetchOrders, orderStatus } from '../../../store/actions/shipper';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])
import { SHIPPER_STATUS } from '../constants';
import { useHelper } from '../../../helpers/helper';
import PaginationMuti from '../../PaginationMuti';
const merchantId = "11931"
const CheckOrder = ({ navigation, route }) => {

    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = React.useState(false);
    const orders_status = useSelector(state => state.shipper.orders_status)
    const orders = useSelector(state => state.shipper.orders)
    const date = useSelector(state => state.shipper.date)
    const day = useSelector(state => state.shipper.day)
    const shipper_status = useSelector(state => state.shipper.shipper_status)

    const { formatOnlyDate } = useHelper();
 

   

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          
            setRefreshing(false);
        }, 2000);

    }, []);



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
      


            </ScrollView>
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


export default CheckOrder;