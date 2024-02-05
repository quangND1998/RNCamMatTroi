import React from 'react';
import { View, StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductHome from '../Products/ProductHome';
import Home from './Home';
import Notification from '../Notification/Index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native-svg';
import { useDispatch } from 'react-redux';
import { PressableOpacity } from 'react-native-pressable-opacity';
import { deleteAllNotification } from '../../store/actions/notification';
import HistoryCare from './HistoryCare';
const Stack = createNativeStackNavigator();
const HomeScreen = () => {
    const dispatch = useDispatch();
    const clearNotification = () => {
        dispatch(deleteAllNotification())
    }
    return (
        <Stack.Navigator
        screenOptions={{
            headerBackTitleVisible: false
        }}
        >
            <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={Home} />
            <Stack.Screen name="ProductHome" options={{ headerShown: false }} component={ProductHome} />
            <Stack.Screen name="Notification" options={{
                headerShown: true, title: 'Thông báo', tabBarActiveTintColor: '#F78F43',
                tabBarInactiveTintColor: "#184E17",

                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#F78F43',
                },
                headerTitleAlign: 'center',
                headerRight: (props) => (
                    <PressableOpacity onPress={clearNotification} >
                        <MaterialCommunityIcons name='trash-can-outline' size={26} className="text-xl text-[#fc5050]" color="#fc5050" />
                    </PressableOpacity>
                ),
            }} component={Notification} />

            <Stack.Screen name="HistoryCare" options={{
                headerShown: true, title: 'Lịch sử chăm sóc cây', tabBarActiveTintColor: '#F78F43',
                tabBarInactiveTintColor: "#184E17",

                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#F78F43',
                },
                headerTitleAlign: 'center',

            }} component={HistoryCare} />
        </Stack.Navigator>
    );

}

const styles = StyleSheet.create({})

export default HomeScreen;