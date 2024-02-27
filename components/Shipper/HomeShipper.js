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
import Status from '../Shipper/Components/Status'
const merchantId = "11931"
const HomeShipper = ({ navigation, route }) => {

    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = React.useState(false);
    const orders_transport_status = useSelector(state => state.shipper.orders_transport_status)
    const order_transports = useSelector(state => state.shipper.order_transports)
    const date = useSelector(state => state.shipper.date)
    const day = useSelector(state => state.shipper.day)
    const status = useSelector(state => state.shipper.status)
    const isLoading = useSelector(state => state.shipper.isLoading)
    const { formatOnlyDate, formatUpdatedAt } = useHelper();
    useEffect(() => {
        fetchOrderStatus()

    }, [date, day]);

    useEffect(() => {
        getOrders()

    }, [status]);
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
            status: status,

        }
        console.log('getOrders', params)
        dispatch(fetchOrders(params))
    }
    const changePageURL = (page) => {

        let params = {
            date: date,
            day: day,
            status: status,
            page: page
        }
        console.log(params)
        dispatch(fetchOrders(params))

    }
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            (async () => {
                let params = {
                    date: date,
                    day: day,

                }
                dispatch(orderStatus(params))
            })();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <Box className=" mx-3 my-3 mb-[80px]">
                    <Box className={`  bg-white  rounded-md  `} >
                        {orders_transport_status ? orders_transport_status.map((order_transport_status, index) =>
                            <Box key={index} >
                                <TouchableOpacity onPress={() =>
                                    dispatch({
                                        type: 'changeShipperStatus',
                                        payload: order_transport_status.status
                                    }
                                    )
                                } >
                                    <Flex className=" px-2 py-2 ">
                                        <Flex direction='row' className={index == orders_transport_status.length - 1 ? 'justify-between' : 'justify-between border-b border-[#AEAEAE] '}>
                                            <Text className={` ${order_transport_status.status == status ? 'ml-3 text-[#F78F43] rounded-[5px]' : 'text-[#000000] ml-3 text-[12px]'}`} >

                                                {order_transport_status.status == 'not_shipping' ? SHIPPER_STATUS.not_shipping :
                                                    order_transport_status.status == 'not_delivered' ? SHIPPER_STATUS.not_delivered :
                                                        order_transport_status.status == 'delivered' ? SHIPPER_STATUS.delivered :
                                                            order_transport_status.status == 'wait_refund' ? SHIPPER_STATUS.wait_refund :
                                                                order_transport_status.status == 'refund' ? SHIPPER_STATUS.refund :
                                                                    order_transport_status.status == 'wait_decline' ? SHIPPER_STATUS.wait_decline :
                                                                        order_transport_status.status == 'wait_warehouse' ? SHIPPER_STATUS.wait_warehouse :
                                                                            order_transport_status.status == 'decline' ? SHIPPER_STATUS.decline :
                                                                                order_transport_status.status == 'addition_document' ? SHIPPER_STATUS.addition_document : null}
                                            </Text>
                                            <Flex direction='row' className=" text-[#000000] ml-3 text-[12px] items-center">{order_transport_status.total}
                                                <Icon name="chevron-forward" size={16} color="#AEAEAE" className="items-center" />
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </TouchableOpacity>
                                {/* {index !== orders_transport_status.length - 1 ? <HrTag opacity={0.3} mr={8} ml={8}> </HrTag> : null} */}

                            </Box>

                        ) : null}
                    </Box>


                    <Box className="mt-2">

                        {order_transports && order_transports?.data.length > 0 ? <Box class="ion-padding mb-5" >
                            <PaginationMuti data={order_transports} changePage={changePageURL} />
                        </Box> : ''}
                        {isLoading == true ?
                            < Pending />
                            : null}
                        {(order_transports && isLoading == false) ? order_transports.data.map((order_transport, index) =>
                            <PressableOpacity key={index} onPress={() => navigation.navigate('OrderShipperDetail', { title: formatUpdatedAt(order_transport.updated_at), orderId: order_transport.id, })}>
                                <Box className=" bg-white  rounded-[10px] px-1 mt-1 py-2">
                                    <Flex direction='row' className="justify-between px-2">
                                        <Text className="text-[14px]  font-bold">{index + 1}. {order_transport.order.type == 'retail' ? 'Đơn mua lẻ' : 'Đơn quà'}<Text className="font-inter"> ({order_transport.order_transport_number})</Text></Text>

                                        <Box className="absolute w-[80px] right-0 text-right ">
                                            {order_transport ? <Status  order_transport={order_transport} /> : null}
                                        </Box>



                                    </Flex>
                                    <Flex direction='row' className="px-4">
                                        <Text className="mr-2 font-[650]">{order_transport.order.customer.name}</Text>
                                        <PressableOpacity onPress={() => {
                                            let phoneNumber = order_transport.order.customer.phone_number;
                                            if (Platform.OS !== 'android') {
                                                phoneNumber = `telprompt:${order_transport.order.customer.phone_number}`;
                                            }
                                            else {
                                                phoneNumber = `tel:${order_transport.order.customer.phone_number}`;
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
                                        <Text className="mr-2 text-[#686868]">{formatOnlyDate(order_transport.order.delivery_appointment)}</Text>
                                    </Flex>
                                    <Flex direction='row' className="px-4 flex-wrap">
                                        <Text className="mr-2 text-[#686868] mt-[2px]">Địa chỉ: {order_transport.order.customer?.address}({order_transport.order.customer?.wards}, {order_transport.order.customer?.district} , {order_transport.order.customer?.city})</Text>
                                    </Flex>
                                    {order_transport.order.state_document ? <Flex direction='row' className="px-4 flex-wrap">
                                        <Text className="mr-2 text-[#fd6459]">Trạng thái hồ sơ: {order_transport.order.state_document == 'not_push' ? 'Chưa up' : order_transport.order.state_document == 'not_approved' ? 'Chưa duyệt' : order_transport.order.state_document == 'approved' ? 'Đã duyệt' : null}</Text>
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