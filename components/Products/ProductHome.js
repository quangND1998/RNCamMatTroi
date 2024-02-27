import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy, AddCircle } from 'iconsax-react-native';
import { PressableOpacity } from 'react-native-pressable-opacity';
import { getListProductService, getProductDetail } from '../../store/actions/productService';
import { fetchProductRetails, queryProductRetails } from '../../store/actions/productRetail';
import PaginationMuti from '../PaginationMuti';
import {
    selectTotalPrice, selectTotalQuantity, selectTotal
} from '../../store/reducers/cartReducer';
import { addToCart } from '../../store/actions/cart';
import { useHelper } from '../../helpers/helper';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const ProductHome = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const productService = useSelector(state => state.productService.productService);
    const products = useSelector(state => state.productRetails.products);
    const [refreshing, setRefreshing] = React.useState(false);
    const totalPrice = useSelector(selectTotalPrice);
    const totalQuantity = useSelector(selectTotalQuantity)
    const total = useSelector(selectTotal)
    const { formatPrice } = useHelper();
    useEffect(() => {
        fetchListProductService();
        fetchProducts();
    }, [])
    const fetchListProductService = () => {
        dispatch(getListProductService())
    }
    const fetchProducts = () => {
        dispatch(fetchProductRetails())
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchListProductService();
            fetchProducts();
            setRefreshing(false);
        }, 2000);
    }, []);
    const changePageURL = (page) => {
        console.log(page)
        let params = {
            page: page
        }

        dispatch(queryProductRetails(params))

    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <Box className='relative'>
                    <Image source={require('../../assets/images/banner.png')} className="m-auto h-24 w-full object-cover" alt='banner'></Image>
                    <Box className="absolute left-0 bottom-5 w-full">
                        <Box className="flex flex-row justify-between">
                            <Text className="font-bold text-xl text-white">Xin chào {user?.name}</Text>
                            <Box className="flex flex-row">
                                <PressableOpacity onPress={() => {
                                    navigation.navigate('CodeScan');

                                }} >
                                    <Image source={require('../../assets/icon/scan.png')} alt="scan"  ></Image>
                                </PressableOpacity>

                                <Image source={require('../../assets/icon/icon_bell.png')} className="ml-5" alt="icon_bell"></Image>
                            </Box>
                        </Box>
                        <Text className="text-white text-sm">CMT: </Text>
                    </Box>
                </Box>
                <Box className="p-2 bg-white w-full flex flex-row flex-wrap" >
                    {productService ? productService.map((product, key) =>
                        // Wrong! The key should have been specified here:
                        <Box key={product.id} className="w-1/2 px-1 py-2 hover:rounded-lg hover:shadow-lg hover:shadow-[#2f302f31]"
                        >
                            <Box className=" text-center">
                                <Box className="relative">

                                    <Image source={require('../../assets/images/banner_item.png')} className="m-auto w-full" alt="icon_bell"></Image>
                                    <Box className="absolute top-3/2 left-3/2 -translate-x-3/2 -translate-y-3/2 w-full">
                                        <Box className="pt-[16px] pb-[14px]">
                                            <Image source={require('../../assets/images/goi1.png')} className="w-8 h-8 m-auto" alt="goi1"></Image>
                                            <Text className="text-[#F78F43] " style={styles.icon_state}>{product?.life_time}</Text>
                                        </Box>
                                        <Text className="text-center text-[14px]">Sở hữu {product?.life_time} năm</Text>
                                        <Text className="text-center font-bold mt-2 text-[12px]">(Thu hoạch {product?.amount_products_received} kg/năm)</Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ) : ''}
                </Box>
                <Box className="h-2 bg-[#F0F0F0]">
                </Box>
                {/* <Heading className="font-bold text-xl">I'm a Heading</Heading>; */}
                <Box className="p-2 bg-white">
                    <Heading className="font-bold text-xl" size="xl">Danh mục nông sản</Heading>
                    {products && products.data?.data.length > 0 ? <Box class="ion-padding mb-5" >
                        <PaginationMuti data={products?.meta} changePage={changePageURL} />
                    </Box> : ''}

                    {products ? products.data.data.map((product, key) =>
                        <Box key={product.id}>
                            <HStack space={1} justifyContent="center" className="my-4">
                                <Box alignItems="center">
                                    <Image
                                        source={{ uri: product?.images.length > 0 ? product?.images[0].original_url : null }}
                                        className=" w-20 h-20 rounded-xl  object-cover" alt="" />

                                </Box>
                                <Box>

                                    <Box className="w-full flex flex-row items-center ">
                                        <Text className="font-semibold text-[17px]">{product?.name}</Text>
                                        <PressableOpacity className="ml-10" onPress={() => {
                                            dispatch(addToCart(product))

                                        }} >
                                            <AddCircle
                                                size="25"
                                                color="#FF8A65"
                                                variant="Bold"
                                            />
                                        </PressableOpacity>
                                    </Box>
                                    <Text className="text-xs my-3   hover:bg-gray-800">Giao hàng tận nơi  </Text>

                                </Box>
                            </HStack>
                        </Box>
                    ) : ''}

                    {/* <Text>
                        {products[0].name}
                    </Text> */}
                </Box>

            </ScrollView >

            {total > 0 ? <PressableOpacity onPress={() => navigation.navigate('CartConfirmation')} className="bg-white"  ><Box
                className="fixed bottom-0  w-[90%] ml-[5%] mr-[5%] mt-2 mb-2 px-4 py-4 text-white bg-[#F78F43] rounded-xl " style={styles.btn_button}>
                <Box className="w-full flex flex-row  justify-between" >
                    <Text className="mr-0 text-white ">Giỏ hàng {total} sản phẩm</Text>
                    <Text className=" text-white "> {formatPrice(totalPrice)}đ</Text>

                </Box>
            </Box></PressableOpacity> : null
            }

        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {

    },
    icon_state: {
        position: 'absolute',
        top: 30,
        width: 35,
        fontWeight: 600,
    },
    image_thumb: {
        objectFit: 'cover',
        height: '100 %',
        width: '100 %',
    },
    btn_button: {
        bottom: '-10px'
    },
    spinnerTextStyle: {
        color: '#F78F43'
    },

})


export default ProductHome;