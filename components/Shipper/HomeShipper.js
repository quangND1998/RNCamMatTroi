import React, { useState, useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, Animated, TouchableOpacity, Linking, Keyboard, View, ScrollView, RefreshControl, ImageBackground, SectionList, Platform } from 'react-native';
import { Center, Skeleton, Container, Heading, Button, Text, Box, Flex, Stack, Input, SearchBar, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import { SafeAreaView } from 'react-native-safe-area-context';
import HrTag from '../HrTag';
import { PressableOpacity } from 'react-native-pressable-opacity';
import { fetchOrders, orderStatus } from '../../store/actions/shipper';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])
import { SHIPPER_STATUS } from './constants';
import { useHelper } from '../../helpers/helper';
import PaginationMuti from '../PaginationMuti';
import Pending from '../Pending';
const merchantId = "11931"
const HomeShipper = ({ navigation, route }) => {

    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = React.useState(false);
    const orders_status = useSelector(state => state.shipper.orders_status)
    const orders = useSelector(state => state.shipper.orders)
    const date = useSelector(state => state.shipper.date)
    const day = useSelector(state => state.shipper.day)
    const shipper_status = useSelector(state => state.shipper.shipper_status)
    const isLoading = useSelector(state => state.shipper.isLoading)
    const { formatOnlyDate, formatUpdatedAt } = useHelper();
    useEffect(() => {
        fetchOrderStatus()

    }, [date, day]);

    useEffect(() => {
        getOrders()

    }, [shipper_status]);
    const fetchOrderStatus = async () => {
        let params = {
            date: date,
            day: day,

        }
        dispatch(orderStatus(params))

    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchOrderStatus()
            setRefreshing(false);
        }, 2000);

    }, []);
    const getOrders = () => {

        let params = {
            date: date,
            day: day,
            shipper_status: shipper_status,

        }
        console.log('getOrders', params)
        dispatch(fetchOrders(params))
    }
    const changePageURL = (page) => {

        let params = {
            date: date,
            day: day,
            shipper_status: shipper_status,
            page: page
        }
        console.log(params)
        dispatch(fetchOrders(params))

    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <Box className=" mx-3 my-3 ">
                    <Box className={`  bg-white  rounded-md  `} >
                        {orders_status ? orders_status.map((order_status, index) =>
                            <Box key={index} className={`${order_status.shipper_status == shipper_status ? 'bg-[#F78F43]' : ''}`}>
                                <TouchableOpacity onPress={() =>
                                    dispatch({
                                        type: 'changeShipperStatus',
                                        payload: order_status.shipper_status
                                    }
                                    )
                                } >
                                    <Flex className=" px-2 py-2">
                                        <Flex direction='row' className="justify-between">
                                            <Text className=" text-[#686868] ml-3 text-[12px]">

                                                {order_status.shipper_status == 'pending' ? SHIPPER_STATUS.pending :
                                                    order_status.shipper_status == 'shipping' ? SHIPPER_STATUS.shipping :
                                                        order_status.shipper_status == 'delivered' ? SHIPPER_STATUS.delivered :
                                                            order_status.shipper_status == 'refund' ? SHIPPER_STATUS.refund :
                                                                order_status.shipper_status == 'decline' ? SHIPPER_STATUS.decline :
                                                                    order_status.shipper_status == 'addition_document' ? SHIPPER_STATUS.addition_document : null}
                                            </Text>


                                            {/* <MaterialCommunityIcons name='calendar-range-outline' size={24} className="text-[#070707]" color="#070707" /> */}
                                            <Flex direction='row' className=" text-[#686868] ml-3 text-[12px] items-center">{order_status.total}
                                                <Icon name="chevron-forward" size={16} color="#AEAEAE" className="items-center" />
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </TouchableOpacity>
                                <HrTag mr="1" ml="1" opacity={0.3}> </HrTag>
                            </Box>

                        ) : null}
                    </Box>
                    <Box className="mt-2">

                        {orders && orders?.data.length > 0 ? <Box class="ion-padding mb-5" >
                            <PaginationMuti data={orders} changePage={changePageURL} />
                        </Box> : ''}
                        {isLoading == true ?
                            < Pending />
                            : null}
                        {(orders && isLoading == false) ? orders.data.map((order, index) =>
                            <PressableOpacity key={index} onPress={() => navigation.navigate('OrderShipperDetail', { title: formatUpdatedAt(order.updated_at), orderId: order.id, })}>
                                <Box className=" bg-white  rounded-md px-1 mt-1 py-2">
                                    <Flex direction='row' className="justify-between px-2">
                                        <Text className="text-[14px]  font-bold">{index + 1}.{order.type == 'retail' ? 'Đơn lẻ' : 'Đơn quà'}<Text className="font-inter">({order.order_number})</Text></Text>
                                        <Text className={`${order.shipper_status == 'pending' ? 'text-[#4F8D06]' : order.shipper_status == 'shipping' ? 'text-[#FF6100]' : order.shipper_status == 'delivered' ? 'text-[#4F8D06]' : order.shipper_status == 'refund' ? 'text-[#1D75FA]' : order.shipper_status == 'decline' ? 'text-[#F00]' : order.shipper_status == 'addition_document' ? 'text-[#4F8D06]' : null}`}>
                                            {order.shipper_status == 'pending' ? SHIPPER_STATUS.pending :
                                                order.shipper_status == 'shipping' ? SHIPPER_STATUS.shipping :
                                                    order.shipper_status == 'delivered' ? SHIPPER_STATUS.delivered :
                                                        order.shipper_status == 'refund' ? SHIPPER_STATUS.refund :
                                                            order.shipper_status == 'decline' ? SHIPPER_STATUS.decline :
                                                                order.state_document == 'not_push' ? SHIPPER_STATUS.addition_document : null}
                                        </Text>
                                    </Flex>
                                    <Flex direction='row' className="px-4">
                                        <Text className="mr-2 font-[650]">{order.customer.name}</Text>
                                        <PressableOpacity onPress={() => {
                                            let phoneNumber = order.customer.phone_number;
                                            if (Platform.OS !== 'android') {
                                                phoneNumber = `telprompt:${order.customer.phone_number}`;
                                            }
                                            else {
                                                phoneNumber = `tel:${order.customer.phone_number}`;
                                            }
                                            Linking.canOpenURL(phoneNumber)
                                                .then(supported => {
                                                    if (!supported) {
                                                        Alert.alert('Phone number is not available');
                                                    } else {
                                                        return Linking.openURL(phoneNumber);
                                                    }
                                                })
                                                .catch(err => console.log(err));
                                        }
                                        }>
                                            <FontAwesome5 name={'phone-alt'} solid size={16} color="#4F8D06" />
                                        </PressableOpacity>

                                    </Flex>
                                    <Flex direction='row' className="px-4 ">
                                        <Text className="mr-2 text-[#686868]">Hẹn giao:</Text>
                                        <Text className="mr-2 text-[#686868]">{formatOnlyDate(order.delivery_appointment)}</Text>
                                    </Flex>
                                    <Flex direction='row' className="px-4 flex-wrap">
                                        <Text className="mr-2 text-[#686868]">Địa chỉ: {order.customer?.address}({order.customer?.wards}, {order.customer?.district} , {order.customer?.city})</Text>
                                    </Flex>
                                    {order.state_document !== null ? <Flex direction='row' className="px-4 flex-wrap">
                                        <Text className="mr-2 text-[#fd6459]">Trạng thái hồ sơ: {order.state_document == 'not_push' ? 'Chưa up' : order.state_document == 'not_approved' ? 'Chưa duyệt' : order.state_document == 'approved' ? 'Đã duyệt' : null}</Text>
                                    </Flex> : null}

                                </Box></PressableOpacity>) : null}

                    </Box>
                </Box>


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


export default HomeShipper;