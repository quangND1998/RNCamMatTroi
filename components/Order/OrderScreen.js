import React from 'react';
import { View, StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderItem from './Index';
import OrderDetail from './detail';

const Stack = createNativeStackNavigator();
const OrderScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName="OrderItem"
        >
            <Stack.Screen name="OrderItem" options={{ headerShown: false }} component={OrderItem} />
            <Stack.Screen name="OrderDetail" options={{ headerShown: false }} component={OrderDetail} />
        </Stack.Navigator>
    );

}

const styles = StyleSheet.create({})

export default OrderScreen;