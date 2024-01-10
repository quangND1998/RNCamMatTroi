import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EmojiHappy, Home, User, More, DocumentText, Card } from 'iconsax-react-native';
import HomeScreen from '../components/Home/HomeScreen';
import OrderScreen from '../components/Order/Index';
import UserScreen from '../components/User/Index';
import AddScreen from '../components/Add/Index';
import ScanExpo from '../components/QrCode/ScanExpo';
import Payment from '../components/Payment/Payment';
import { Image } from 'native-base';


const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    return (
        <Tab.Navigator

            initialRouteName="Home"
            backBehavior="history"
            screenOptions={{
                tabBarActiveTintColor: '#F78F43',
                tabBarInactiveTintColor: "#184E17",
                tabBarStyle: {
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    borderLeftWidth: 0.2,
                    borderRightWidth: 0.2,
                    overflow: 'hidden',
                    position: 'absolute',
                    height: 68,
                    bordercolor: 'transparent',

                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#F78F43',
                },
                headerTitleAlign: 'center',
                tabBarLabelStyle: {
                    margin: 0,
                    padding: 0,
                    paddingBottom: 5,

                },
                tabBarItemStyle: {
                    padding: 0,
                    paddingTop: 8,
                }

            }}
        >


            <Tab.Screen
                name="Order"
                component={OrderScreen}
                options={{
                    tabBarLabel: 'Đơn hàng',
                    title: 'Đơn hàng',
                    tabBarIcon: ({ color, size }) => (
                        // <DocumentText color="#F78F43" variant="Outline" size={25} />
                        <Image source={require('../assets/icon/fi-rr-box.png')} className="w-8 h-8 " alt='box' ></Image>
                    ),

                }}
            />


            <Tab.Screen
                name="Payment"
                component={Payment}
                options={{
                    headerShown: false,

                    tabBarLabel: 'Thăm vườn',
                    tabBarIcon: ({ color, size }) => (
                        // <Card color="#F78F43" variant="Outline" size={25} />
                        <Image source={require('../assets/icon/fi-rr-calendar.png')} className="w-8 h-8 " alt='calendar' ></Image>
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../assets/icon/icon_orange.png')} className="w-12 h-12 " alt='box' ></Image>
                    ),
                    tabBarLabelStyle: { marginBottom: -16 },
                }}
            />
            <Tab.Screen
                name="User"
                component={UserScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: ({ color, size }) => (
                        <User color="#184E17" variant="Outline" size={24} />

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
                        <More color="#184E17" variant="Outline" size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    );

}
export default BottomNavigator;