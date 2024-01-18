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
const HomeShipper = ({ navigation, route }) => {
   
    const dispatch = useDispatch();
 
    const [refreshing, setRefreshing] = React.useState(false);
  
    useEffect(() => {
      

    }, []);
    const fetchProductOwner = async () => {
     

    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
      
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


export default HomeShipper;