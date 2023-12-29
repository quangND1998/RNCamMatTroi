import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EmojiHappy, Home, User, More, DocumentText } from 'iconsax-react-native';
import HomeScreen from '../components/Home/Home';
import OrderScreen from '../components/Order/Index';
import UserScreen from '../components/User/Index';
import AddScreen from '../components/Add/Index';
import ScanExpo from '../components/QrCode/ScanExpo';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            backBehavior="history"
            screenOptions={{
                tabBarActiveTintColor: '#F78F43',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Home color="#F78F43" variant="Outline" size={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="Order"
                component={OrderScreen}
                options={{
                    tabBarLabel: 'Đơn hàng',
                    tabBarIcon: ({ color, size }) => (
                        <DocumentText color="#F78F43" variant="Outline" size={25} />
                    ),
                }}
            />

            <Tab.Screen
                name="User"
                component={UserScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: ({ color, size }) => (
                        <User color="#F78F43" variant="Outline" size={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="ScanExpo"
                component={ScanExpo}
                options={{
                    headerShown: false,
                    tabBarLabel: 'qrcode',
                    tabBarIcon: ({ color, size }) => (
                        <User color="#F78F43" variant="Outline" size={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="Add"
                component={AddScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Thêm',
                    tabBarIcon: ({ color, size }) => (
                        <More color="#F78F43" variant="Outline" size={25} />
                    ),
                }}
            />
        </Tab.Navigator>
    );

}
export default BottomNavigator;