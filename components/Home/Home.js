import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, ScrollView, RefreshControl, ImageBackground, SectionList, YellowBox } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Flex, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import Payoo from '../../payoo';
import { PaymentService } from '../../common/payment/paymentService';
import { getProductOwner } from '../../store/actions/productService';
import { SafeAreaView } from 'react-native-safe-area-context';
import NewSwiper from '../News/NewSwiper';
import NewActivity from '../News/NewActivity';
import ProductItem from './ProductItem';
import SlideBG from './SlideBG';
import { PressableOpacity } from 'react-native-pressable-opacity';

LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])
const merchantId = "11931"
const Home = ({ navigation, route }) => {
    const envDevelopment = 0;
    const envProduction = 1;
    const langVietNam = 0;
    const langEnglish = 1;
    const cashAmount = 2020000;
    const dispatch = useDispatch();
    const productOwner = useSelector(state => state.productService.productOwners);
    const user = useSelector(state => state.auth.user);
    const [refreshing, setRefreshing] = React.useState(false);
    useEffect(() => {
        fetchProductOwner();
    }, []);
    const fetchProductOwner = async () => {
        dispatch(getProductOwner())
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchProductOwner();
            setRefreshing(false);
        }, 2000);
        console.log(productOwner);
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <Box className='shadow bg-white rounded-b-[28px]'>
                    {/* <Image source={require('../../assets/images/banner.png')} className="m-auto h-24 w-full object-cover" alt='banner'></Image> */}
                    <Box className="px-4 py-6 w-full  ">
                        <Flex direction='row' className="flex items-center justify-between">
                            <Flex direction='row' className="">
                                <Avatar source={{
                                    uri: user?.profile_photo_url
                                }}>
                                </Avatar>

                                <Flex className="ml-4">
                                    <Text className="font-bold text-xl text-gray-800">{user?.name}</Text>
                                    <Text className="text-[#FF6100] text-sm">#{user?.cic_number}</Text>
                                </Flex>

                            </Flex>

                            <Box className="flex flex-row">
                                <PressableOpacity onPress={() => {
                                    navigation.navigate('ScanExpo');

                                }} >
                                    <Image source={require('../../assets/icon/scan.png')} alt="scan"  ></Image>
                                </PressableOpacity>

                                <Image source={require('../../assets/icon/icon_bell.png')} className="ml-5" alt="icon_bell"></Image>
                            </Box>
                        </Flex>

                    </Box>
                </Box>
                <Box className="bg">
                    <SlideBG></SlideBG>
                </Box>
                <Box className="absolute bottom-[30%]">
                    <View >
                        {productOwner ?
                            <FlatList
                                data={productOwner}
                                renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}

                            /> : <View></View>}
                    </View>
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


export default Home;