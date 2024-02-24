import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Flex, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductHome from '../Products/ProductHome';
import Home from './Home';
import Notification from '../Notification/Index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux'
import { PressableOpacity } from 'react-native-pressable-opacity';
import { deleteAllNotification } from '../../store/actions/notification';
import { getUnReadNotification } from '../../store/actions/notification';
import { HeaderBackground } from '@react-navigation/elements';
import HistoryCare from './HistoryCare';
const Stack = createNativeStackNavigator();
const HomeScreen = () => {
    const dispatch = useDispatch();
    const clearNotification = () => {
        dispatch(deleteAllNotification())
    }

    useEffect(() => {

        dispatch(getUnReadNotification())

    }, []);

    const user = useSelector(state => state.auth.user);
    const totalUnRead = useSelector(state => state.notification.totalUnRead);
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerTransparent: true,
                headerBackground: () => (
                    <HeaderBackground style={styles.background}  >
                    </HeaderBackground>
                ),
            }}
        >
            <Stack.Screen name="HomeScreen" options={({ navigation, route }) => ({
                tabBarLabel: '',
                title: '',
                headerShown: true,
                headerLeft: (props) => (
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
                ),
                headerRight: (props) => (
                    <Box className="flex flex-row">
                        <PressableOpacity onPress={() => {
                            navigation.navigate('ScanExpo');

                        }} >
                            <Image source={require('../../assets/icon/scan.png')} alt="scan" className="w-[24px] h-[24px]" resizeMode="contain" ></Image>
                        </PressableOpacity>
                        <PressableOpacity onPress={() => {
                            navigation.navigate('Notification');

                        }} >
                            <Image source={require('../../assets/icon/icon_bell.png')} alt="icon_bell" className="ml-2 w-[24px] h-[24px]" resizeMode="contain"></Image>
                            <Box className="absolute left-5 top-[-6] shadow bg-[#FF6100] rounded-full ">
                                <Text className="min-w-min w-[20px] h-[20px] text-center text-white  text-[10px] rounded-xl">{
                                    totalUnRead > 0 ? "+1" : "0"
                                }
                                </Text>
                            </Box>
                        </PressableOpacity>
                    </Box>
                ),

            })}

                component={Home} />
            <Stack.Screen name="ProductHome" options={{ headerShown: false }} component={ProductHome} />
            <Stack.Screen name="Notification" options={{
                headerShown: true, title: 'Thông báo', tabBarActiveTintColor: '#FF6100',
                tabBarInactiveTintColor: "#184E17",

                headerTitleStyle: {
                    fontWeight: '700',
                    color: '#FF6100',
                    lineHeight: 20
                },
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerRight: (props) => (
                    <PressableOpacity onPress={clearNotification} >
                        <MaterialCommunityIcons name='trash-can-outline' size={26} className="text-xl text-[#fc5050]" color="#fc5050" />
                    </PressableOpacity>
                ),
            }} component={Notification} />

            <Stack.Screen name="HistoryCare" options={{
                headerShown: true, title: 'Lịch sử chăm sóc cây', tabBarActiveTintColor: '#FF6100',
                tabBarInactiveTintColor: "#184E17",

                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FF6100',
                },
                headerShadowVisible: false,
                headerTitleAlign: 'center',

            }} component={HistoryCare} />
        </Stack.Navigator>
    );

}

const styles = StyleSheet.create({
    background: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: 60,
        paddingBottom: 0,

        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS

    }
})
export default HomeScreen;