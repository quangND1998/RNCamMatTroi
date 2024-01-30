import React, { useState, useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, Animated, TouchableOpacity, Linking, Keyboard, View, TextInput, ScrollView, RefreshControl, ImageBackground, SectionList, YellowBox } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Flex, Stack, SearchBar, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import { SafeAreaView } from 'react-native-safe-area-context';
import HrTag from '../../HrTag';
import { PressableOpacity } from 'react-native-pressable-opacity';
import { fetchOrders, orderStatus } from '../../../store/actions/shipper';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])
import { SHIPPER_STATUS } from '../constants';
import { useHelper } from '../../../helpers/helper';
import PaginationMuti from '../../PaginationMuti';
import Pending from '../../Pending';
const merchantId = "11931"
const CheckOrder = ({ navigation, route }) => {

    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = React.useState(false);


    const { formatOnlyDate } = useHelper();




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
                <Box className=" mx-3 my-3 ">
                    <Box className={`  bg-white  rounded-md  `} >
                        <Box className=" mx-3 my-3 ">
                            <Text>Nhập đơn hàng</Text>
                            <Flex direction='row' className="mt-3 items-center justify-between">
                                <TextInput className="py-1.5 border border-0.5 ml-2 rounded-md  w-2/3  border-0.5"></TextInput>
                                <Box className="  px-5 py-2.5 bg-[#FF6100] rounded-md items-center">
                                    <Text className="text-white">Check</Text>
                                </Box>
                            </Flex>
                        </Box>

                    </Box>
                </Box>



            </ScrollView>
        </SafeAreaView >
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


export default CheckOrder;