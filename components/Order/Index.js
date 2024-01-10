import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, ScrollView, SafeAreaView,RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy } from 'iconsax-react-native';
import { getListProductService } from '../../store/actions/productService';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const OrderScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const productService = useSelector(state => state.productService.productService);
    useEffect(() => {
        fetchProductService();
    }, []);
    const fetchProductService = async () => {
        dispatch(getListProductService())
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchProductService();
            setRefreshing(false);
        }, 2000);
        console.log("ngant",productService);
    }, []);
    const onPressLearnMore = () => {
        console.log('ngant');
    };
    return (
        <SafeAreaView style={styles.container} className="mb-[120px]">
            <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>

            <Box className="mx-3 mt-3 ">
            {productService.length > 0 ? productService.map((product,index) => 
                <Box key={index} className="mb-3">
                    <Box className=" flex flex-row ">
                        <Image source={require('../../assets/images/icon_package.png')} className="h-8 w-8 mr-3" ></Image> 
                        <Text className="font-bold text-xl text-[#FF6100]">{product.name}</Text>
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
                className="rounded-2xl bg-[#FF6100] text-white m-3 p-4 font-bold"
                onPress={onPressLearnMore}
                >
                     <Text className="font-base text-[18px] text-white ">Liên hệ đặt nông sản</Text>
            </Button>
            <Box className="bg-white rounded-2xl mt-3 p-3">
                <Text className="text-center font-bold text-[20px] text-[#FF6100] ">Lịch sử nhận quà nông sản</Text>
                <Box >

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


export default OrderScreen;