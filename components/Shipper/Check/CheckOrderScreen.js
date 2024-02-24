import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useDispatch } from 'react-redux';
import { PressableOpacity } from 'react-native-pressable-opacity';

import { Modal, Button, Select, Input, FormControl, Flex, CheckIcon, HStack, Center, Box, Radio } from "native-base";


import Icon from 'react-native-vector-icons/Ionicons';
import CheckOrder from './CheckOrder';
const Stack = createNativeStackNavigator();
const CheckOrderScreen = () => {
    const dispatch = useDispatch();
    return (
        <Stack.Navigator>
            <Stack.Screen name="CheckOrder" options={{
                headerShown: true, title: 'Quản lý vận đơn', tabBarActiveTintColor: '#FF6100',
                tabBarInactiveTintColor: "#184E17",

                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                },
                headerStyle: {
                    backgroundColor: '#FF6100',

                },
                headerTransparent: true,

                headerTitleAlign: 'left',

            }} component={CheckOrder} />



        </Stack.Navigator>
    );

}

const styles = StyleSheet.create({})

export default CheckOrderScreen;