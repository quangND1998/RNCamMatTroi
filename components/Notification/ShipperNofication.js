import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Flex, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy, Trash } from 'iconsax-react-native';
import { getAllNotification, getUnReadNotification, readNotifcation } from '../../store/actions/notification';
import { PressableOpacity } from 'react-native-pressable-opacity';
import { useHelper } from '../../helpers/helper';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const ShipperNofication = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const { formatUpdatedAt, formatOnlyDate } = useHelper();
    const notifications = useSelector(state => state.notification.notifications)

    useEffect(() => {
        dispatch(getUnReadNotification())
        dispatch(getAllNotification())
    }, []);

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            (async () => {
                dispatch(getAllNotification())
                dispatch(readNotifcation())
            })();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            dispatch(getAllNotification())
            dispatch(readNotifcation())
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
                {notifications ?
                    Object.keys(notifications).map((notification, key) =>


                        <Box key={key} className="my-4 mx-4" >
                            <Text className='text-[#184E17] my-3 text-[13px]'>
                                {notification}
                            </Text>
                            {notifications[notification].map((notify, index) =>


                                notify.data.data?.orderId ?
                                    <PressableOpacity key={index} onPress={() => navigation.navigate('OrderShipperDetail', { title: formatUpdatedAt(notify.data.data?.title), orderId: notify.data.data?.orderId })}>
                                        <Flex direction='row' className=" flex-wrap bg-white px-2 py-2 rounded-md mb-2 border border-[#FF6100]" >
                                            <Text className='text-[13px]' >{notify.data.title} {notify.data.body}</Text>
                                        </Flex>
                                    </PressableOpacity>
                                    :

                                    <Flex key={index} direction='row' className=" flex-wrap bg-white px-2 py-2 rounded-md mb-2 border border-[#FF6100]" >
                                        <Text className='text-[13px]' >{notify.data.title} {notify.data.body}</Text>


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
    }
})


export default ShipperNofication;