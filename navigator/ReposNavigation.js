import React from 'react';
import { View, StyleSheet } from 'react-native';
import Post from '../components/Post/Post';
import Stargazers from '../components/Post/stargazers'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const Reposnavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: true
        }}>
            <Stack.Screen initialRouteName="Post" name="Post" component={Post} />
            <Stack.Screen name="Star" component={Stargazers} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default Reposnavigation;
