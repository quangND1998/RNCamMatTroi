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
import { enableScreens } from 'react-native-screens';
import OrderTab from '../components/Svg/OrderTab';
import CalenderTab from '../components/Svg/CalenderTab';
import UserTab from '../components/Svg/UserTab';
import MoreTab from '../components/Svg/MoreTab';
const Tab = createBottomTabNavigator();
enableScreens(true)
const BottomNavigator = () => {
    return (
        <Tab.Navigator

            initialRouteName="Home"
            backBehavior="history"

            screenOptions={({ navigation, route }) => ({
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: '#FF6100',
                tabBarInactiveTintColor: "#184E17",
                tabBarStyle: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    overflow: 'hidden',
                    height: 74,
                    bordercolor: 'transparent',
                    position: 'absolute',
                    shadowOpacity: 1,
                    shadowRadius: 2,
                    elevation: 2,
                    alignItems:'center',
                    justifyContent:'center',
                    display:'flex'
                },
                tabBarLabelStyle: {
                    margin: 0,
                    padding: 0,

                    fontWeight: '500',
                    fontFamily: 'Inter-Medium',
                    fontSize: 12,
                    alignItems:'center',
                    justifyContent:'center'

                },
                tabBarItemStyle: {
                    padding: 0,
                    paddingTop: 14,
                    paddingBottom: 14,
                },
                headerLeftLabelVisible: false,
                headerShadowVisible: false,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FF6100',
                },
                headerTitleAlign: 'center',
                headerStyle: {
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    height: 55,
                },
                headerLeft: (props) => (
                    <Image className="absolute w-6 h-6 ml-4" alt='back' resizeMode='contain' source={require('../assets/icon/fi-rr-arrow-small-left.png')} 
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
                ),
                // headerLeft: (props) => (
                //     <Image source={require('../assets/icon/fi-rr-arrow-small-right.png')} labelStyle={{ marginLeft: 0 }} labelVisible={false}
                //         {...props}
                //         onPress={() => {
                //             if (navigation.canGoBack()) {
                //                 navigation.goBack();
                //             }
                //             else {
                //                 navigation.navigate('Home')
                //             }
                //         }}
                //     />
                // ),
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
                        // <OrderTab width={24} height={25} />
                        // <CalenderTab width={24} height={25} />
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
                        // <Image source={require('../assets/icon/fi-rr-calendar.png')} className="w-6 h-6 " alt='calendar' ></Image>
                        <CalenderTab width={24} height={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    // headerTransparent: true,
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../assets/icon/icon_orange.png')} resizeMode='contain' className="absolute w-14 h-14 lg:w-[60px] lg:h-18 m-auto" alt='box' ></Image>
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
                        // <User color="#184E17" variant="Outline" size={20} />
                        <UserTab width={24} height={25}  />
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
                        // <More color="#184E17" variant="Outline" size={20} />
                        // <Image source={require('../assets/icon/more2.png')} className="w-6 h-6 " alt='box' ></Image>
                        <MoreTab width={24} height={25}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );

}
export default BottomNavigator;