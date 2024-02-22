import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Login/Login';
import { useLogin } from '../context/LoginProvider';
import DrawerNavigator from './DrawerNavigator';
import BottomNavigator from './BottomNavigator';
import FarmDetail from '../components/Farms/FarmDetail';
import { ScanBarcode } from 'iconsax-react-native';
import { CodeScannerPage } from '../components/QrCode/Scan';
import CodeScan from '../components/QrCode/CodeScan';
import { Camera } from 'react-native-vision-camera'
import PackageBenefits from '../components/Package/PackageBenefits';
import ScanExpo from '../components/QrCode/ScanExpo';
import { HeaderBackButton, HeaderTitle } from '@react-navigation/elements';
import CartConfirmation from '../components/Cart/CartConfirmation';
import LogoLogin from '../components/Login/LogoLogin';
import LoginOtp from '../components/Login/LoginOtp';
import { Box, Center, Flex, Text, View } from 'native-base';
import { getHeaderTitle, HeaderBackground } from "@react-navigation/elements";
import OrderDetail from '../components/Order/detail';
import OTP from '../components/Login/Otp';
import ScheduleTour from '../components/Schedule/ScheduleTour';
import ScheduleSuccess from '../components/Schedule/ScheduleSuccess';
import { StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Nofification from '../components/Notification/Index';
import { useHelper } from '../helpers/helper';
import ShipperNavigator from './ShipperNavigator';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTransparent: true,
            tabBarActiveTintColor: '#FF6100',
            tabBarInactiveTintColor: "#184E17",
            headerLeftLabelVisible: false,
            borderBottomWidth: 0,
            headerTitleStyle: {
                fontWeight: 'bold',
                color: '#FF6100',
            },
            paddingTop: 12,
            
        }}>
            <Stack.Screen initialRouteName="LogoLogin" name="LogoLogin"
                options={{
                    headerShown: false,
                }}
                component={LogoLogin} />
            <Stack.Screen name="Login" options={{
                headerShown: true, title: 'Đăng nhập', headerTitleStyle: {
                    fontWeight: '700',
                    color: '#FF6100',
                    fontFamily: "Inter-Regular"

                },
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerBackground: () => (
                    <HeaderBackground style={styles.background}  >
                    </HeaderBackground>
                ),
            }} component={Login} />
            <Stack.Screen name="LoginOtp" options={{
                headerShown: true, title: 'Đăng nhập OTP',

                headerTitleStyle: {
                    fontWeight: '650',
                    color: '#FF6100',
                    fontFamily: "Inter-Regular"

                },
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerBackground: () => (
                    <HeaderBackground style={styles.background}  >
                    </HeaderBackground>
                ),

            }} component={LoginOtp} />

            <Stack.Screen name="OTP" options={{
                headerShown: true, title: '',

                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FF6100',
                    fontFamily: "Inter-Regular"

                },
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerBackground: () => (
                    <HeaderBackground style={styles.background}  >
                    </HeaderBackground>
                ),

            }} component={OTP} />

        </Stack.Navigator>
    );
}


const MainNavigator = () => {
    const { hasAnyPermission } = useHelper()
    const { isLoggedIn } = useLogin();
    const cameraPermission = Camera.getCameraPermissionStatus()
    const showPermissionsPage = cameraPermission !== 'granted' || microphonePermission === 'not-determined'

    if (isLoggedIn) {
        return (
            hasAnyPermission(['customer', 'super-admin']) ?
                <Stack.Navigator screenOptions={{
                    headerLeftLabelVisible: false,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color: '#FF6100',

                    },
                    headerTitleAlign: 'center',
                    headerStyle: {
                        borderBottomLeftRadius: 24,
                        borderBottomRightRadius: 24,
                        borderLeftWidth: 0.1,
                        borderRightWidth: 0.1,
                        height: 100,
                    },

                }
                }
                >
                    <Stack.Screen
                        name="Root"
                        component={BottomNavigator}
                        options={{
                            headerShown: false,
                            animationTypeForReplace: 'push',
                            alignContent: 'center',
                        }}
                    />

                    <Stack.Screen name="newDetail" options={{ headerShown: false }} component={FarmDetail} />
                    <Stack.Screen name="Scan" options={{ headerShown: false }} component={CodeScannerPage} />
                    <Stack.Screen name="CodeScan" options={{ headerShown: false }} component={CodeScan} />
                    <Stack.Screen name="ScanExpo" options={({ navigation, route }) => ({
                        headerTransparent: true,
                        title: 'Scan',
                        headerBackground: () => (
                            <HeaderBackground style={styles.background}  >
                            </HeaderBackground>
                        ),

                    })} component={ScanExpo} />
                    <Stack.Screen name="CartConfirmation" options={{ title: 'Xác nhận đơn hàng' }} component={CartConfirmation} />
                    <Stack.Screen name="PackageBenefits" options={({ navigation, route }) => ({
                        title: route.params.name
                    })} component={PackageBenefits} />
                    <Stack.Screen name="ScheduleSuccess" options={({ navigation, route }) => ({
                        headerShown: false,
                    })} component={ScheduleSuccess} />

                </Stack.Navigator> : <ShipperNavigator />
        )
    }
    if (!isLoggedIn) {
        return <StackNavigator />
    }
};
export default MainNavigator;
const styles = StyleSheet.create({
    background: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: 200,
        paddingBottom: 0,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        // backgroundColor: '#FF6100'
        fontFamily:'Inter-Bold'
    }
})

