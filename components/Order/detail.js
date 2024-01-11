import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, ScrollView, SafeAreaView,RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy } from 'iconsax-react-native';
import { getListProductService } from '../../store/actions/productService';
import { getListOrderGift } from '../../store/actions/history';
import { useHelper } from '../../helpers/helper';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const OrderDetail = ({ item,navigation }) => {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const productService = useSelector(state => state.productService.productService);
    const orderGilfs = useSelector(state => state.history.orderGilfs);
    const {formatDate,formatDateUse} = useHelper();
    useEffect(() => {

    }, []);
    const fetchProductService = async () => {
        dispatch(getListProductService())
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            
        }, 2000);
      
    }, []);
    const onPressLearnMore = () => {
        console.log('ngant');
    };
    return (
        <SafeAreaView style={styles.container} className="mb-[80px]">
            <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>

            <Box className="mx-3 mt-3 ">
                <Box className="ml-1 flex flex-row items-center">
                    <Text className="font-bold text-[30px] text-[#000000] px-3">.</Text>
                    <Text className="font-base text-[16px] text-[#000000]">Tặng thẻ membership Cam Mặt Trời</Text>
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


export default OrderDetail;