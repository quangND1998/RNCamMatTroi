import React, { useState, useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, Animated, TouchableOpacity, Linking, Keyboard, View, TextInput, ScrollView, RefreshControl, ImageBackground, SectionList, YellowBox } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Flex, Stack, SearchBar, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import { SafeAreaView } from 'react-native-safe-area-context';
import HrTag from '../../HrTag';
import { PressableOpacity } from 'react-native-pressable-opacity';
import { fetchOrders, orderStatus } from '../../../store/actions/shipper';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { findOrderTransport } from '../../../store/actions/shipper';
LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])
import { SHIPPER_STATUS } from '../constants';
import { useHelper } from '../../../helpers/helper';
import PaginationMuti from '../../PaginationMuti';
import Pending from '../../Pending';
import Status from '../Components/Status'
const merchantId = "11931"
const CheckOrder = ({ navigation, route }) => {

    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = React.useState(false);
    const find_order_transports = useSelector(state => state.shipper.find_order_transports)
    const isLoading = useSelector(state => state.shipper.isLoading)
    const [search, setSearch] = useState(null)
    const { formatOnlyDate, formatUpdatedAt } = useHelper();




    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {

            setRefreshing(false);
        }, 2000);

    }, []);

    const CheckOrder = React.useCallback(() => {
        let params = {
            search: search,

        }
        console.log(params)
        dispatch(findOrderTransport(params))
    }, [search]);
    const changePageURL = (page) => {

        let params = {
            search: search,
            page: page
        }
        dispatch(findOrderTransport(params))

    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <Box className=" mx-3 my-3 mt-12 ">
                    <Box className={`  bg-white  rounded-md  `} >
                        <Box className=" mx-3 my-3 ">
                            <Text>Nhập đơn hàng</Text>
                            <Flex direction='row' className="mt-3 items-center justify-between">
                                <TextInput className="py-1.5 border border-0.5 ml-2 rounded-md  w-2/3  border-0.5" value={search} onChangeText={value => setSearch(value)} ></TextInput>
                                <PressableOpacity onPress={CheckOrder}>
                                    <Box className="  px-5 py-2.5 bg-[#FF6100] rounded-md items-center">
                                        <Text className="text-white">Check </Text>
                                    </Box>
                                </PressableOpacity>
                            </Flex>


                        </Box>

                    </Box>

                    <Box className="mt-2">

                        {find_order_transports && find_order_transports?.data.length > 0 ? <Box class="ion-padding mb-5" >
                            <PaginationMuti data={find_order_transports} changePage={changePageURL} />
                        </Box> : ''}
                        {isLoading == true ?
                            < Pending />
                            : null}
                        {(find_order_transports && isLoading == false) ? find_order_transports.data.map((order_transport, index) =>
                            <PressableOpacity key={index} onPress={() => navigation.navigate('OrderShipperDetail', { title: formatUpdatedAt(order_transport.updated_at), orderId: order_transport.id, })}>
                                <Box className=" bg-white  rounded-md px-1 mt-1 py-2">
                                    <Flex direction='row' className="justify-between px-2">
                                        <Text className="text-[14px]  font-bold">{index + 1}.{order_transport.order.type == 'retail' ? 'Đơn lẻ' : 'Đơn quà'}<Text className="font-inter">({order_transport.order_transport_number})</Text></Text>

                                        {order_transport ? <Status order_transport={order_transport} /> : null}

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
                                        <Text className="mr-2 text-[#686868]">Địa chỉ: {order_transport.order.customer?.address}({order_transport.order.customer?.wards}, {order_transport.order.customer?.district} , {order_transport.order.customer?.city})</Text>
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


export default CheckOrder;