import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Touchable, Image, Text } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { Avatar } from "native-base";
import HomeScreen from '../components/Home/Home';
import { useLogin } from '../context/LoginProvider';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, logoutAction } from '../store/actions/auth';
import { useToast } from 'native-base';
import { getToken } from '../common/asynStorage';
const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
    const { setIsLoggedIn, profile } = useLogin();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const login = useSelector(state => state.login);
    const toast = useToast();

    console.log('user CustomDrawer', user)
    const handlerLogout = async () => {
        const token = await getToken();
        // console.log(token)
        // destroyToken();
        // setIsLoggedIn(false)
        console.log('handlerLogout', token)
        dispatch(logoutAction(
            token,
            () => {
                toast.show({
                    title: "Logout successfully",

                    description: "Thanks for signing up with us."
                })
                setIsLoggedIn(false)
                // navigation.navigate('Login');
            },
            () => {
                toast.show({
                    title: "Something went wrong, please try again!",

                    description: "Something went wrong, please try again."
                })
                setIsLoggedIn(false)
            },
        ));

    }
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 20,
                        backgroundColor: '#f6f6f6',
                        marginBottom: 20,
                    }}
                >


                    <View>
                        {/* <Text>{profile.fullname}</Text>
                        <Text>{profile.email}</Text> */}
                    </View>

                    {/* <Avatar size="48px" source={{
                        uri: user.profile_photo_url
                    }} /> */}



                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    bottom: 50,
                    backgroundColor: '#f6f6f6',
                    padding: 20,
                    zIndex: 100,
                    color: '#ffffff'
                }}
                onPress={handlerLogout}
            >
                <Text style={{
                    color: '#000000',
                    zIndex: 100,
                    fontWeight: 'bold',
                }}>Log Out  </Text>
            </TouchableOpacity>
        </View>
    );
};

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTitle: '',
            }}
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen component={HomeScreen} name='Home' />

        </Drawer.Navigator>
    );
};



export default DrawerNavigator;