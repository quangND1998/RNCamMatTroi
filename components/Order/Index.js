import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy } from 'iconsax-react-native';
import { getListProductService } from '../../store/actions/productService';
import { getListOrderGift } from '../../store/actions/history';
import { useHelper } from '../../helpers/helper';
import { PressableOpacity } from 'react-native-pressable-opacity';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const OrderItem = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const productService = useSelector(state => state.productService.productService);
    const orderGilfs = useSelector(state => state.history.orderGilfs);
    const { formatDate, formatDateUse } = useHelper();
    useEffect(() => {
        fetchProductService();
        fetchListOrderGift();
    }, []);
    const fetchProductService = async () => {
        dispatch(getListProductService())
    }
    const fetchListOrderGift = async () => {
        dispatch(getListOrderGift())
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchProductService();
            fetchListOrderGift();
            setRefreshing(false);
            console.log("ngant", productService);
            console.log('orderGilfs', orderGilfs);
        }, 2000);

    }, []);
    const onPressLearnMore = () => {
        console.log('ngant');
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>

                <Box style={styles.container} className="mx-3 mt-3 ">
                    {productService ? productService.map((product, index) =>
                        <Box key={product.id} className="mb-3 mx-1">
                            <Box className=" flex flex-row items-center">
                                <Image source={require('../../assets/images/icon_package.png')} alt={`anh${index}`} className="h-8 w-8 mr-3" ></Image>
                                <Text className="font-bold text-[20px] text-[#FF6100] flex flex-row flex-wrap ">{product.name}</Text>
                            </Box>
                            <Box className="ml-1 mt-2 flex flex-row items-center">
                                <Text className="font-bold text-[30px] text-[#000000] px-3">.</Text>
                                <Text className="font-base text-[16px] text-[#000000]">Thăm vườn: {product.free_visit} lần/năm</Text>
                            </Box>
                            <Box className="ml-1 flex flex-row items-center">
                                <Text className="font-bold text-[30px] text-[#000000] px-3">.</Text>
                                <Text className="font-base text-[16px] text-[#000000]">Thu hoạch: {product.amount_products_received} kg cam</Text>
                            </Box>
                            <Box className="ml-1 flex flex-row items-center">
                                <Text className="font-bold text-[30px] text-[#000000] px-3">.</Text>
                                <Text className="font-base text-[16px] text-[#000000]">Tặng thẻ membership Cam Mặt Trời</Text>
                            </Box>
                            <Box className="ml-1 flex flex-row items-center">
                                <Text className="font-bold text-[30px] text-[#000000] px-3">.</Text>
                                <Text className="font-base text-[16px] text-[#000000]">Nông sản sạch {product.number_deliveries} lần/năm</Text>
                            </Box>
                        </Box>
                    ) : null}
                </Box>
                <Button
                    className="rounded-2xl bg-[#FF6100] text-white mx-3 my-3 p-3 font-bold"
                    onPress={onPressLearnMore}
                >
                    <PressableOpacity onPress={() => {
                        let phoneNumber = null;
                        if (Platform.OS !== 'android') {
                            phoneNumber = `telprompt:0825105999`;
                        }
                        else {
                            phoneNumber = `tel:0825105999`;
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
                        <Text className="font-base text-[18px] text-white ">Liên hệ đặt nông sản</Text>
                    </PressableOpacity>
                </Button>
                <Box className="bg-white rounded-t-[30px] mt-3 mb-[77px] px-3">
                    <Text className="text-center font-bold my-6 p-2 text-[20px] text-[#FF6100] ">Lịch sử nhận quà nông sản</Text>
                    <Box >
                        {orderGilfs ? orderGilfs.map((order, index) =>
                            <TouchableOpacity key={index} className="mb-3 w-full " onPress={
                                () => navigation.navigate('OrderDetail', {
                                    itemId: order.id,
                                    name: order.order_number
                                })}
                            >
                                <Box className=" flex flex-row items-center justify-between mr-2 w-full">
                                    <Box className="flex flex-row w-1/2">
                                        <Image source={require('../../assets/images/cam.jpg')} className="h-12 w-12 my-2 " alt={`anh1${index}`} ></Image>
                                        <Box className="flex">
                                            {order?.order_items ? order?.order_items.map((item, index2) =>
                                                <Box key={index2} className="flex flex-row">
                                                    <Text className="font-bold text-base text-[#184E17] px-3 mt-1 truncate w-full">{item.product.name}</Text>
                                                </Box>
                                            ) : null}
                                            <Text className="text-[12px] text-[#AEAEAE] px-3">{formatDate(order.created_at)}</Text>
                                        </Box>
                                    </Box>
                                    <Text className="flex items-end text-left justify-end text-[12px]  font-bold text-[#080808]">#{order.order_number}</Text>
                                </Box>
                            </TouchableOpacity>
                        ) : null}
                    </Box>
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


    },
    image_bg: {
        flex: 1,
        justifyContent: 'center',
    },
    containt_service: {
        margin: 20
    }
})


export default OrderItem;