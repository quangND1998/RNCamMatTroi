import React, { useCallback, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EmojiHappy, User, More, DocumentText, Card } from 'iconsax-react-native';
import AddScreen from '../components/Add/AddScreen';
import { Button, Image, Select, Box } from 'native-base';
import { HeaderBackButton } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShipperScreen from '../components/Shipper/ShipperScreen';
import CheckOrderScreen from '../components/Shipper/Check/CheckOrderScreen';
import Home from '../components/Svg/Home';
import Chevron from '../components/Svg/Chevron';
import SettingShipper from '../components/Shipper/Setting/Index'
const Tab = createBottomTabNavigator();
import { PressableOpacity } from 'react-native-pressable-opacity';
import MoreTab from '../components/Svg/MoreTab';
import ShipperNofication from '../components/Notification/ShipperNofication';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAllNotification, getAllNotification, getUnReadNotification, readNotifcation } from '../store/actions/notification';
import { Notification } from 'iconsax-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const BottomShipperNavigator = () => {
    const dispatch = useDispatch();
    const totalUnRead = useSelector(state => state.notification.totalUnRead);

    const clearNotification = () => {
        dispatch(deleteAllNotification())
    }


    return (
        <Tab.Navigator

            initialRouteName="HomeShipper"
            backBehavior="history"
            screenOptions={({ navigation, route }) => ({
                tabBarActiveTintColor: '#FF6100',
                tabBarInactiveTintColor: "#000000",
                tabBarStyle: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    overflow: 'hidden',
                    height: 78,
                    bordercolor: 'transparent',
                    position: 'absolute',
                    marginTop: '77px',
                },

                headerTitleStyle: {
                    fontWeight: 'semibold',
                    color: 'white',
                },
                headerTitleAlign: 'center',
                tabBarLabelStyle: {
                    alignContent: 'center',


                },
                tabBarItemStyle: {
                    padding: 0,
                    paddingBottom: 12,
                    alignContent: 'center',
                },
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: '#FF6100',

                },
                paddingTop: 12,
                headerLeft: (props) => (
                    <PressableOpacity onPress={() => {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        }
                        else {
                            navigation.navigate('Home')
                        }
                    }}>
                        <Image className=" w-6 h-6 ml-2" resizeMode='contain' alt='back' source={require('../assets/icon/fi-rr-arrow-small-left.png')}
                            {...props}

                        />
                    </PressableOpacity>
                )
            })}

        >

            <Tab.Screen
                name="ShipperScreen"
                component={ShipperScreen}
                options={{

                    headerShown: false,
                    tabBarLabel: 'Quản lý vận đơn',
                    tabBarIcon: ({ color, size }) => (
                        // <Home source={require('../assets/icon/home.png')} className="w-14 h-14 " alt='box' ></Home>
                        <Home color="#FF6100" size={26} />

                    ),
                }}
            />
            <Tab.Screen
                name="CheckOrderScreen"
                component={CheckOrderScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Check đơn',
                    title: 'Quản lý vận đơn',
                    tabBarIcon: ({ color, size }) => (
                        <Chevron color="#FF6100" size={26} />
                    ),
                }}
            />



            <Tab.Screen name="Thông báo" component={ShipperNofication} options={({ navigation, route }) => ({
                tabBarLabel: 'Thông báo',
                tabBarBadge: totalUnRead, tabBarIcon: ({ color, size }) => (
                    <Notification
                        size="24"
                        color="#FF8A65"
                    />
                ),
                headerRight: (props) => (
                    <PressableOpacity className="mr-4" onPress={clearNotification} >
                        <MaterialCommunityIcons name='trash-can-outline' size={26} className="text-xl " color="#fdfdfe" />
                    </PressableOpacity>
                ),
            })} />

            <Tab.Screen
                name="Setting"
                component={SettingShipper}
                options={{
                    headerShown: true,
                    tabBarLabel: 'Thêm',
                    title: 'Xem thêm',
                    tabBarIcon: ({ color, size }) => (
                        <MoreTab width={24} height={25} color='#FF6100' />
                    ),

                }}
            />

        </Tab.Navigator>
    );

}



const Stack = createNativeStackNavigator();
const ShipperNavigator = () => {


    return (
        <Stack.Navigator screenOptions={{

            headerTitleStyle: {
                fontWeight: 'bold',
                color: '#FF6100',

            },


        }}
        >
            <Stack.Screen
                name="Root"
                component={BottomShipperNavigator}
                options={{
                    headerShown: false,
                    animationTypeForReplace: 'push',
                    alignContent: 'center',
                }}
            />



        </Stack.Navigator>
    )
}

export default ShipperNavigator;