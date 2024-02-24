import React from 'react';
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
const Tab = createBottomTabNavigator();

const BottomShipperNavigator = () => {
    return (
        <Tab.Navigator

            initialRouteName="HomeShipper"
            backBehavior="history"
            screenOptions={({ navigation, route }) => ({
                tabBarActiveTintColor: '#FF6100',
                tabBarInactiveTintColor: "#184E17",
                tabBarStyle: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    overflow: 'hidden',
                    height: 100,
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
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    height: 60,
                },
                headerTransparent:true,
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
                        <Image className=" w-6 h-6" resizeMode='contain' alt='back' source={require('../assets/icon/fi-rr-arrow-small-left.png')}
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
                    tabBarLabel: 'Thêm',
                    title: 'Quản lý vận đơn',
                    tabBarIcon: ({ color, size }) => (
                        <Chevron color="#FF6100" size={26} />
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
            headerTitleAlign: 'center',

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