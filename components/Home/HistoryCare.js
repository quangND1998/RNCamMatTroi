import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Flex, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy, Trash } from 'iconsax-react-native';
import { getAllNotification, getUnReadNotification, readNotifcation } from '../../store/actions/notification';
import QRCode from 'react-native-qrcode-svg';
import { getTreeDetail } from '../../store/actions/productService';
import { useHelper } from '../../helpers/helper';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const HistoryCare = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const treeId = route.params.treeId;
    const { formatDateShort, formatDateUse } = useHelper();
    const tree = useSelector(state => state.productService.tree)
    const history_care = useSelector(state => state.productService.history_care)
    useEffect(() => {
        fetchTreeDetail();

    }, []);
    const fetchTreeDetail = () => {
        dispatch(getTreeDetail(treeId));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            console.log(treeId)
            fetchTreeDetail();
            console.log('fetchTreeDetail', tree)
            setRefreshing(false);

        }, 2000);

    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView className="mb-[77px]"
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <Box className="bg-white  rounded-b-3xl mt-[40px] px-4 py-2">
                    <Flex direction='row' className="flex flex-row px-3 py-3 w-full justify-between ">
                        {/* <Box className="p-4 text-left mr-2  ">

                            <Text>Mã cây: <Text className="text-[#184E17]">{tree?.address}</Text></Text>
                            <Text>Tên cây: <Text bold className="text-[#F78F43] uppercase">{tree?.name}</Text></Text>
                            <Text>Ngày nhận nuôi:<Text className="text-[#184E17]"> {formatDateShort(tree?.product_service_owner?.time_approve)} </Text></Text>
                            <Text>Số ngày nhận nuôi: <Text className="text-[#184E17]"> {formatDateUse(tree?.product_service_owner?.time_approve)}</Text></Text>
                        </Box>
                        <Box className="p-1 ">
                            <QRCode
                                value={`https://qly2.cammattroi.com/tree/qrcode/${tree?.product_service_owner?.id}`}
                                logo={require('../../assets/images/product.png')}
                                logoSize={16}
                                logoBackgroundColor='white'
                            />
                        </Box> */}

                        <Box className="text-left mr-2">
                            <Text numberOfLines={3} className=" text-gray-700 px-1 my-0 "
                                style={styles.description}>Mã cây: <Text className="text-[#184E17] font-bold">{tree?.address}</Text></Text>
                            <Text numberOfLines={3} className=" text-gray-700 px-1 my-0 "
                                style={styles.description}>Tên cây: <Text className="text-[#F78F43] font-bold">{tree?.name}</Text></Text>
                            <Text numberOfLines={3} className=" text-gray-700 px-1 my-0 "
                                style={styles.description}>Ngày nhận nuôi: <Text className="text-[#184E17] font-bold" >{formatDateShort(tree?.product_service_owner?.time_approve)}</Text></Text>
                            <Text numberOfLines={3} className=" text-gray-700 px-1 my-0 "
                                style={styles.description}>Số ngày nhận nuôi: <Text className="text-[#184E17] font-bold">{formatDateUse(tree?.product_service_owner?.time_approve)} </Text></Text>
                        </Box>
                        <Box className="p-1 ">
                            <QRCode
                                value={`https://qly.cammattroi.com/tree/qrcode/${tree?.product_service_owner?.id}`}
                                logo={require('../../assets/images/logo_qcam.png')}
                                logoSize={16}
                                logoBackgroundColor='white'
                                size={70}
                                resizeMode="contain"
                            />
                        </Box>
                    </Flex>
                </Box>

                {history_care ?
                    Object.keys(history_care).map((history, key) =>
                        <Box key={key} className="my-2 mx-4 " >
                            <Text style={{ fontFamily: 'Inter-Regular' }} className='text-[#184E17] my-3 text-[12px]  font-[400px]'>
                                {formatDateShort(history)}
                            </Text>
                            {history_care[history].map((item, index) =>
                                <Flex key={index} direction='row' className="flex-wrap mx-1  bg-white px-2 py-2 rounded-md mb-2  border-[1px] border-[#F78F43] " >
                                    {item.activity_care.map((activity, index) =>
                                        <Box key={index} >
                                            {item.activity_care.length - 1 == index ? <Text style={{ fontFamily: 'Inter-Regular' }} className='text-[16px] mr-1  items-center' >{activity.name}.</Text> :
                                                <Text style={{ fontFamily: 'Inter-Regular' }} className='text-[16px]  mr-1  items-center ' >{activity.name},</Text>}
                                        </Box>
                                    )}
                                </Flex>
                            )}
                        </Box>
                    )
                    : null}

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
    },
    description: {
        fontSize: 14,
        marginVertical: 12,
        color: '#000',
        fontFamily: 'Inter-Regular'
    },
})


export default HistoryCare;