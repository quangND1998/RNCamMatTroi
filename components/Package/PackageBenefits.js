import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Flex, Input, SearchBar, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy } from 'iconsax-react-native';
import { getProductDetail } from '../../store/actions/productService';
import { useHelper } from '../../helpers/helper.js'
import QRCode from 'react-native-qrcode-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

const PackageBenefits = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { product_id } = route.params;
    const [refreshing, setRefreshing] = React.useState(false);
    const productDetail = useSelector(state => state.productService.productDetail);
    const { formatUpdatedAt, formatOnlyDate } = useHelper();
    React.useEffect(() => {
        navigation.setOptions({

        });
    }, [navigation]);
    useEffect(() => {
        fetchProductDetail();

    }, []);

    const fetchProductDetail = async () => {
        dispatch(getProductDetail(product_id))
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchProductDetail(product_id);
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
                {/* <Text>{productDetail?.id}</Text> */}
                <Box className="mb-5 pb-5 mx-1 my-2">
                    <Box className="ion-padding bg-[#F0F0F0] rounded-lg">
                        <Box className=" pt-7 pb-3 bg-white rounded-lg ">
                            <Flex direction='row' className="px-4 justify-between">
                                <Flex direction='row' className=" items-center">

                                    <Image
                                        source={{ uri: productDetail?.tree?.thumb_image?.length > 0 ? productDetail?.tree?.thumb_image[0]?.original_url : null }}
                                        className=" w-20 h-20 rounded-xl  object-cover" alt="" />
                                    <Text bold className="text-[20px] font-semibold ml-3">
                                        {productDetail?.trees.length ? productDetail?.trees[0].name : null}

                                    </Text>
                                </Flex>
                                <Flex direction='column'>
                                    <Text className={`text-base font-semibold text-center ${productDetail?.state == "active" ? 'text-[#4F8D06]' : 'text-[#FF0909]'}`} >
                                        {
                                            productDetail?.state == "active"
                                                ? "Hoạt động"
                                                : "Tạm ngưng"
                                        }
                                    </Text>
                                    <Text className="text-xs text-[#F78F43]">
                                        đến {formatOnlyDate(productDetail?.time_end)}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Box className="px-4 mt-3">
                                <Flex direction='row' className=" justify-between w-full">
                                    <Text bold >Mã định danh</Text>
                                    <Text bold >
                                        {
                                            productDetail?.trees?.[0].address
                                        }
                                    </Text>
                                </Flex>
                            </Box>
                            <Box className="px-4 mt-3">
                                <Flex direction='row' className="flex justify-between w-full">
                                    <Text bold >Tham quan vườn</Text>
                                    <Text bold>
                                        {productDetail?.visit?.length}/{
                                            productDetail?.product?.free_visit
                                        } lần
                                    </Text>
                                </Flex>
                            </Box>

                            <Box className="px-4 mt-3">
                                <Flex direction='row' className="flex justify-between w-full">
                                    <Text bold>Thu hoạch</Text>
                                    <Text bold>
                                        {productDetail?.product?.amount_products_received} kg
                                    </Text>
                                </Flex>
                            </Box>
                            <Box className="px-4 mt-3">
                                <Flex direction='row' className="flex justify-between w-full">
                                    <Text bold>Nông sản sạch</Text>
                                    <Text bold>
                                        {productDetail?.history_gift?.length}/{
                                            productDetail?.product?.number_deliveries
                                        }
                                         lần
                                    </Text>
                                </Flex>
                            </Box>


                        </Box>

                        <Box className="rounded-lg px-3 py-4 bg-white my-4">
                            <Flex direction='row' className=" items-center" >
                                {/* <ion-icon class="text-[#ED5B00] text-3xl" :icon="documentTextOutline"></ion-icon> */}
                                <Icon name="document-text-outline" size={24} color="#ED5B00" className="text-[#ED5B00] text-3xl" />
                                <Text bold className=" text-lg flex items-center ml-3">
                                    Thông tin hợp đồng
                                    {/* <ion-icon :icon="chevronForwardOutline" class="text-[# ]"></ion-icon> */}

                                </Text>
                                <Icon name="chevron-forward" size={24} color="#AEAEAE" />
                            </Flex>
                        </Box>
                        {productDetail?.trees.length > 0 ? <Box className="rounded-lg px-2 py-4 bg-white my-4 mb-5" >
                            <Center class="w-full">
                                <QRCode className="m-auto p-2 justify-center" size={160}
                                    value={`https://qly.cammattroi.com/tree/qrcode/${productDetail?.id}`}
                                    logo={require('../../assets/images/product.png')}
                                    logoSize={20}
                                    logoBackgroundColor='white'
                                />
                                <Text class="text-base text-center mt-2">
                                    Quét mã QR để truy xuất vị trí cây
                                </Text>
                            </Center>
                        </Box> : null}

                    </Box>
                </Box>
            </ScrollView >
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})


export default PackageBenefits;