import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EmojiHappy, Home, User, More, DocumentText, Card } from 'iconsax-react-native';
import HomeScreen from '../components/Home/HomeScreen';
import OrderScreen from '../components/Order/OrderScreen';
import UserScreen from '../components/User/Index';
import AddScreen from '../components/Add/AddScreen';
import ScanExpo from '../components/QrCode/ScanExpo';
import Payment from '../components/Payment/Payment';
import { Button, Image } from 'native-base';
import ScheduleTour from '../components/Schedule/ScheduleTour';
import { HeaderBackButton } from '@react-navigation/elements';
import UpdateUser from '../components/User/UpdateUser';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    return (
        <Tab.Navigator

            initialRouteName="Home"
            backBehavior="history"
            screenOptions={({ navigation, route }) => ({
                tabBarActiveTintColor: '#FF6100',
                tabBarInactiveTintColor: "#184E17",
                tabBarStyle: {
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    borderLeftWidth: 0.2,
                    borderRightWidth: 0.2,
                    overflow: 'hidden',
                    height: 78,
                    bordercolor: 'transparent',

                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FF6100',
                },
                headerTitleAlign: 'center',
                tabBarLabelStyle: {
                    margin: 0,
                    padding: 0,
                    paddingBottom: 12,

                },
                tabBarItemStyle: {
                    padding: 0,
                    paddingTop: 8,
                },
                headerStyle: {
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    borderLeftWidth: 0.1,
                    borderRightWidth: 0.1,
                    height: 68,
                },
                paddingTop: 12,
                headerLeft: (props) => (
                    <HeaderBackButton
                        {...props}
                        onPress={() => {
                            if (navigation.canGoBack()) {
                                navigation.goBack();
                            }
                            else {
                                navigation.navigate('Home')
                            }
                        }}
                    />
                )
            })}

        >


            <Tab.Screen
                name="Order"

                component={OrderScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Đơn hàng',
                    title: 'Đơn hàng',

                    tabBarIcon: ({ color, size }) => (
                        // <DocumentText color="#FF6100" variant="Outline" size={25} />
                        <Image source={require('../assets/icon/fi-rr-box.png')} className="w-6 h-6 " alt='box' ></Image>
                    ),

                }}
            />


            <Tab.Screen
                name="Schedule"
                component={ScheduleTour}
                options={{
                    headerShown: true,
                    title: 'Đặt lịch thăm vườn',
                    tabBarLabel: 'Thăm vườn',
                    tabBarIcon: ({ color, size }) => (
                        // <Card color="#FF6100" variant="Outline" size={25} />
                        <Image source={require('../assets/icon/fi-rr-calendar.png')} className="w-6 h-6 " alt='calendar' ></Image>
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
                        <Image source={require('../assets/icon/icon_orange.png')} className="w-14 h-14 " alt='box' ></Image>
                    ),
                    tabBarLabelStyle: { marginBottom: -10 },
                }}
            />
            <Tab.Screen
                name="User"
                component={UpdateUser}
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
                    title: 'Dịch vụ khách hàng',
                    tabBarIcon: ({ color, size }) => (
                        <More color="#184E17" variant="Outline" size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    );

}
export default BottomNavigator;