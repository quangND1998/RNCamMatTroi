import React from 'react';
import { View, StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductHome from '../Products/ProductHome';
import Home from './Home';

const Stack = createNativeStackNavigator();
const HomeScreen = () => {
    return (
        <Stack.Navigator
        >
            <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={Home} />
            <Stack.Screen name="ProductHome" options={{ headerShown: false }} component={ProductHome} />
        </Stack.Navigator>
    );

}

const styles = StyleSheet.create({})

export default HomeScreen;