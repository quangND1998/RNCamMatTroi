import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, Alert, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy } from 'iconsax-react-native';
import { getOrderDetail } from '../../store/actions/history';
import { useHelper } from '../../helpers/helper';
import { saveOrderCompleted } from '../../store/actions/add';
import Spinner from 'react-native-loading-spinner-overlay';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const OrderDetail = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { itemId } = route.params;
    const [refreshing, setRefreshing] = React.useState(false);
    const orderDetail = useSelector(state => state.history.orderDetail);
    const [spinner, setSpinner] = useState(false)
    const { formatDate, formatDateUse } = useHelper();
    useEffect(() => {
        console.log('item', route.params);
        fetchOrderDetail();
    }, []);
    const fetchOrderDetail = async () => {
        console.log(itemId);
        dispatch(getOrderDetail(itemId))
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchOrderDetail();
            console.log('orderDetail', orderDetail);
            setRefreshing(false);
        }, 2000);


    }, []);
    const onPressConfirm = () => {
        if (orderDetail) {
            setSpinner(true);
            dispatch(saveOrderCompleted(orderDetail.id,
                () => {
                    navigation.navigate('OrderReview', {
                        itemId: orderDetail.id,
                        name: orderDetail.order_number
                    })
                    setSpinner(false);
                },
                () => {
                    setSpinner(false);
                },
            ));
        }

    };

    const alertOrderCofirm = () =>
        Alert.alert('Bạn đã nhận được hàng chưa!', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {

                    onPressConfirm()
                }

            },
        ]);
    return (
        <SafeAreaView style={styles.container}>
            <Spinner
                visible={spinner}
                textContent={'Vui lòng đợi..'}
                textStyle={styles.spinnerTextStyle}
            />
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>

                <Box style={styles.container} className="mx-3 mt-3 ">
                    {orderDetail ?
                        <Box style={styles.container} className="ml-1">
                            {orderDetail.order_items ? orderDetail.order_items.map((item, index) =>
                                <Box key={index} className="flex flex-row items-center">
                                    <Image source={{ uri: item.product?.images[0].original_url }} className="h-20 w-20 " alt={`ordergift${index}`} ></Image>
                                    <Text className="font-bold text-[16px] text-[#FF6100] px-3">{item.product?.name}</Text>
                                </Box>
                            ) : null}
                            <Box className="my-6 ">
                                <Box className="flex flex-row items-center my-1">
                                    <Image source={require('../../assets/icon/start.png')} className="h-4 w-4 " alt="start" ></Image>
                                    <Text className="font-base text-[12px] text-[#080808] px-3">{orderDetail.address}, {orderDetail.wards}, {orderDetail.district}, {orderDetail.city}  </Text>
                                </Box>
                                <Box className="mx-1 ">
                                    <Image source={require('../../assets/icon/location.png')} className="h-2 w-2 " alt="location1" ></Image>
                                </Box>
                                <Box className="mx-1 mt-1">
                                    <Image source={require('../../assets/icon/location.png')} className="h-2 w-2 " alt="location2"></Image>
                                </Box>
                                <Box className="mx-1 mt-1">
                                    <Image source={require('../../assets/icon/location.png')} className="h-2 w-2 " alt="location3"></Image>
                                </Box>
                                <Box className="flex flex-row items-center my-1">
                                    <Image source={require('../../assets/icon/end.png')} className="h-4 w-4 " alt="end"></Image>
                                    <Text className="font-base text-[12px] text-[#080808] px-3">{orderDetail.address}, {orderDetail.wards}, {orderDetail.district}, {orderDetail.city}  </Text>
                                </Box>
                            </Box>
                            <Box className="flex flex-row my-3">
                                <Text className="font-base text-[16px] text-[#080808]">Ngày giao hàng:</Text>
                                <Text className="font-bold text-[16px] text-[#184E17] px-2">15/12/2024</Text>
                            </Box>
                            <Box className="flex flex-row my-3">
                                <Text className="font-base text-[16px] text-[#080808]">Trạng thái:</Text>
                                <Text className="font-bold text-[16px] text-[#FF6100] px-2">{orderDetail.status == "pending" ? "Đang giao hàng" : "Hoàn thành"}</Text>
                            </Box>
                            <Box className="flex flex-row my-3">
                                <Text className="font-base text-[16px] text-[#080808]">Giá trị đơn hàng:</Text>
                                <Text className="font-bold text-[16px] text-[#184E17] px-2">{orderDetail.grand_total} VNĐ</Text>
                            </Box>
                            <Button
                                className="fixed bottom-[0px] rounded-2xl bg-[#FF6100] text-white my-8 mx-3 mb-0 p-3 font-bold"
                                onPress={alertOrderCofirm}
                            >
                                <Text className="font-base text-[18px] text-white ">Xác nhận đã nhận hàng</Text>
                            </Button>
                        </Box>
                        : null}
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    image_bg: {
        flex: 1,
        justifyContent: 'center',
    },
    containt_service: {
        margin: 20
    },
    spinnerTextStyle: {
        color: 'white'
    }
})


export default OrderDetail;