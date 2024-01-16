import React, { useState, useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet,Animated, TouchableOpacity, Linking, Keyboard, View, ScrollView, RefreshControl, ImageBackground, SectionList, YellowBox } from 'react-native';
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
import { getUnReadNotification } from '../../store/actions/notification';

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
    const totalUnRead = useSelector(state => state.notification.totalUnRead);
    const scrollX = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        fetchProductOwner();
        dispatch(getUnReadNotification())
        
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

    const handleOnScroll = event => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ],
            {
                useNativeDriver: false,
            },
        )(event);
    };
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
                                <PressableOpacity onPress={() => {
                                    navigation.navigate('Notification');

                                }} >
                                    <Image source={require('../../assets/icon/icon_bell.png')} className="ml-5" alt="icon_bell"></Image>
                                    <Box className="absolute left-8 top-[-8] shadow ">
                                        <Text className="py-0.5 px-1.5 text-white bg-[#F78F43] text-[10px] rounded-full">{
                                            totalUnRead
                                        }
                                        </Text>
                                    </Box>
                                </PressableOpacity>
                            </Box>
                        </Flex>

                    </Box>
                </Box>
                {/* <Box className="bg">
                    <SlideBG></SlideBG>
                </Box> */}
                <Box className="">
                    <View >
                        {productOwner ?
                            <FlatList
                                data={productOwner}
                                renderItem={({ item,index }) => <ProductItem item={item} index={index} navigation={navigation} />}
                                horizontal
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