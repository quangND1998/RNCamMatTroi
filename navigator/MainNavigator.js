import React, { useContext } from 'react';
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
import { HeaderBackButton } from '@react-navigation/elements';
import CartConfirmation from '../components/Cart/CartConfirmation';
import LogoLogin from '../components/Login/LogoLogin';
import LoginOtp from '../components/Login/LoginOtp';
import { Center } from 'native-base';
import { getHeaderTitle } from "@react-navigation/elements";
import OTP from '../components/Login/Otp';
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerTitleAlign: 'center',

        }}>
            <Stack.Screen initialRouteName="LogoLogin" name="LogoLogin" component={LogoLogin} />
            <Stack.Screen name="Login" options={{
                headerShown: true, title: 'Đăng nhập', headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#F78F43',


                },
                headerTitleAlign: 'center'
            }} component={Login} />
            <Stack.Screen name="LoginOtp" options={{
                headerShown: true, title: 'Đăng nhập OTP',

                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#F78F43',


                },
                headerTitleAlign: 'center',

            }} component={LoginOtp} />

            <Stack.Screen name="OTP" options={{
                headerShown: true, title: '',

                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#F78F43',


                },
                headerTitleAlign: 'center',

            }} component={OTP} />
        </Stack.Navigator>
    );
}


const MainNavigator = () => {
    const { isLoggedIn } = useLogin();
    const cameraPermission = Camera.getCameraPermissionStatus()
    const showPermissionsPage = cameraPermission !== 'granted' || microphonePermission === 'not-determined'

    return isLoggedIn ?
        <Stack.Navigator screenOptions={{
            headerStyle: {
                alignContent: 'center',
            }
        }}
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
            <Stack.Screen name="ScanExpo" options={{ title: 'Quét mã ' }} component={ScanExpo} />
            <Stack.Screen name="CartConfirmation" options={{ title: 'Xác nhận đơn hàng' }} component={CartConfirmation} />
            <Stack.Screen name="PackageBenefits" options={({ navigation, route }) => ({
                headerLeft: (props) => (
                    <HeaderBackButton
                        {...props}
                        onPress={() => navigation.navigate('CodeScan')}
                    />
                ), title: route.params.name
            })} component={PackageBenefits} />
        </Stack.Navigator> : <StackNavigator />;
};
export default MainNavigator;