import React, { useState, useEffect, useRef } from 'react';
import { LogBox, Touchable } from 'react-native';
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
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    useEffect(() => {
        fetchProductOwner();
        dispatch(getUnReadNotification())

    }, []);

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            (async () => {
                dispatch(getUnReadNotification())

            })();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    const fetchProductOwner = async () => {
        dispatch(getProductOwner())

    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchProductOwner();
            getUnReadNotification()
            setRefreshing(false);
        }, 2000);
        console.log(productOwner);
    }, []);

    const handlePrevious = () => {
        const previousIndex = currentIndex - 1;
        if (previousIndex >= 0) {
            setCurrentIndex(previousIndex);
            flatListRef.current.scrollToIndex({ index: previousIndex });
        }
        console.log(currentIndex)
    };

    const handleNext = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < productOwner?.length) {
            setCurrentIndex(nextIndex);
            flatListRef.current.scrollToIndex({ index: nextIndex });
        }
        console.log(currentIndex)
    };
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
            <Box className='absolute z-50 w-full  bg-white rounded-b-[28px]'>
                    {/* <Image source={require('../../assets/images/banner.png')} className="m-auto h-24 w-full object-cover" alt='banner'></Image> */}
                    <Box className="px-4 py-4 w-full  ">
                        <Flex direction='row' className="flex items-center justify-between">
                            <Flex direction='row' className="">
                                <Avatar source={{
                                    uri: user?.profile_photo_url
                                }}>
                                </Avatar>

                                <Flex className="ml-4">
                                    <Text className="font-bold text-xl text-gray-800">{user?.name}</Text>
                                    <Text className="text-[#FF6100] text-[12px]">#{user?.cic_number}</Text>
                                </Flex>

                            </Flex>

                            <Box className="flex flex-row">
                                <PressableOpacity onPress={() => {
                                    navigation.navigate('ScanExpo');

                                }} >
                                    <Image source={require('../../assets/icon/scan.png')} alt="scan" className="w-[24px] h-[24px]" resizeMode="contain" ></Image>
                                </PressableOpacity>
                                <PressableOpacity onPress={() => {
                                    navigation.navigate('Notification');

                                }} >
                                    <Image source={require('../../assets/icon/icon_bell.png')}  alt="icon_bell" className="ml-5 w-[24px] h-[24px]" resizeMode="contain"></Image>
                                    <Box className="absolute left-8 top-[-8] shadow rounded-md ">
                                        <Text className="min-w-min w-[20px] h-[20px] text-center text-white bg-[#FF6100] text-[10px] rounded-xl">{
                                            totalUnRead > 0 ? '1+' : '0'
                                        }
                                        </Text>
                                    </Box>
                                </PressableOpacity>
                            </Box>
                        </Flex>

                    </Box>
            </Box>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>

                {/* <Box className="bg">
                    <SlideBG></SlideBG>
                </Box> */}
                <Box className="" style={styles.container}>
                    <View style={styles.container}>
                        {productOwner ?
                            <FlatList
                                data={productOwner}
                                renderItem={({ item, index }) => <ProductItem item={item} index={index} navigation={navigation} />}
                                horizontal
                                scrollEnabled={false}
                                keyExtractor={(item) => item.id.toString()}
                                ref={flatListRef}
                                initialNumToRender={1}
                                showsHorizontalScrollIndicator={false}

                            /> : <View></View>}
                            {currentIndex > 0 ? 
                            <TouchableOpacity activeOpacity={0.7} className="absolute top-1/4 rounded-full bg-white h-8 w-8 z-50 m-auto left-4" title="Previous" onPress={handlePrevious} disabled={currentIndex === 0} >
                                <Image className="h-6 w-6 z-50 m-auto" source={require('../../assets/icon/fi-rr-arrow-small-left.png')} resizeMode="contain"></Image>
                            </TouchableOpacity>
                            : null}

                            {currentIndex != productOwner?.length - 1 ? 
                            <TouchableOpacity activeOpacity={0.7} className="absolute top-1/4 rounded-full bg-white h-8 w-8 z-50 m-auto right-4" title="Next" onPress={handleNext} disabled={currentIndex === productOwner?.length - 1} >
                                <Image className="h-6 w-6 z-50 m-auto" source={require('../../assets/icon/fi-rr-arrow-small-right.png')} resizeMode="contain"></Image>
                            </TouchableOpacity>
                            : null}

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