import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy } from 'iconsax-react-native';
import { getProductDetail } from '../../store/actions/productService';
import { useHelper } from '../../helpers/helper.js'
import QRCode from 'react-native-qrcode-svg';
const PackageBenefits = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { product_id } = route.params;
    const [refreshing, setRefreshing] = React.useState(false);
    const productDetail = useSelector(state => state.productService.productDetail);
    const { formatUpdatedAt } = useHelper();
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
                <Box className="mb-5 pb-5">
                    <Box className="ion-padding bg-[#F0F0F0] rounded-lg">
                        <Box className=" pt-7 pb-3 bg-white rounded-lg ">
                            <Box className="px-4 flex justify-between">
                                <Box className="flex items-center">

                                    <Image
                                        source={{ uri: productDetail?.tree?.thumb_image?.length > 0 ? productDetail?.tree?.thumb_image[0]?.original_url : null }}
                                        className=" w-20 h-20 rounded-xl  object-cover" alt="" />
                                    <Text className="text-[20px] font-semibold ml-3">
                                        {productDetail?.trees.length ? productDetail?.trees[0].name : null}

                                    </Text>
                                </Box>
                                <Box>
                                    <Text className="text-base font-semibold text-center" >
                                        {
                                            productDetail?.state == "active"
                                                ? "Hoạt động"
                                                : "Tạm ngưng"
                                        }
                                    </Text>
                                    <Text className="text-xs text-[#F78F43]">
                                        đến {formatUpdatedAt(productDetail?.time_end)}
                                    </Text>
                                </Box>
                            </Box>
                            <Box className="px-4 mt-3">
                                <Box className="flex justify-between w-full">
                                    <Text className="font-semibold">Mã định danh</Text>
                                    <Text className="font-semibold">
                                        {
                                            productDetail?.trees?.[0].address
                                        }
                                    </Text>
                                </Box>
                            </Box>
                            <Box className="px-4">
                                <Box className="flex justify-between w-full">
                                    <Text className="font-semibold" >Tham quan vườn</Text>
                                    <Text className="font-semibold">
                                        {productDetail?.visit?.length}/{
                                            productDetail?.product?.free_visit
                                        } lần
                                    </Text>
                                </Box>
                            </Box>

                            <Box className="px-4">
                                <Box className="flex justify-between w-full">
                                    <Text className="font-semibold">Thu hoạch</Text>
                                    <Text className="font-semibold">
                                        {productDetail?.product?.amount_products_received} kg
                                    </Text>
                                </Box>
                            </Box>
                            <Box className="px-4">
                                <Box className="flex justify-between w-full">
                                    <Text className="font-semibold">Nông sản sạch</Text>
                                    <Text className="font-semibold">
                                        {productDetail?.history_gift?.length}/{
                                            productDetail?.product?.number_deliveries
                                        }
                                        lần
                                    </Text>
                                </Box>
                            </Box>


                        </Box>
                        {productDetail?.trees.length > 0 ? <Box className="rounded-lg px-2 py-4 bg-white my-4 mb-5" >
                            <Box class="w-full">
                                <QRCode className="m-auto p-2 justify-center" size={160}
                                    value={`https://qly.cammattroi.com/tree/qrcode/${productDetail?.id}`}
                                />
                                <Text class="text-base text-center mt-2">
                                    Quét mã QR để truy xuất vị trí cây
                                </Text>
                            </Box>
                        </Box> : null}

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

})


export default PackageBenefits;