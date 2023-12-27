import React from 'react';
import { View, StyleSheet } from 'react-native';
import DetailsScreen from '../components/Details/Detail';
import Imagedetail from '../components/Details/ImageDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from '../components/Camera/CameraScreen';
const Stack = createNativeStackNavigator();
const DetailNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: true
        }}>

        </Stack.Navigator>
    );

}

const styles = StyleSheet.create({})

export default DetailNavigator;
