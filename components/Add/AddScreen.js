import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerService from './CustomerService';
import Complaint from './Complaint';
import { HeaderBackButton, HeaderTitle, HeaderBackground } from '@react-navigation/elements';
const Stack = createNativeStackNavigator();
const AddScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName='CustomerService'
            screenOptions={({ navigation, route }) => ({
                tabBarActiveTintColor: '#FF6100',
                tabBarInactiveTintColor: "#184E17",
                headerLeftLabelVisible: false,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FF6100',
                },
                headerTitleAlign: 'center',
                paddingTop: 12,
                headerLeft: (props) => (
                    <Image className="absolute w-6 h-6" resizeMode='contain' alt='back' source={require('../../assets/icon/fi-rr-arrow-small-left.png')} 
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
                headerTransparent: false,
                headerBackground: () => (
                    <HeaderBackground style={styles.background}  >
                    </HeaderBackground>
                ),
            })}
        >
            <Stack.Screen name="CustomerService" options={{ title: 'Dịch vụ khách hàng', headerShadowVisible: false, }} component={CustomerService} />
            <Stack.Screen name="Complaint" options={{ title: 'Khiếu nại' }} component={Complaint} />
            {/* <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={Home} />
            <Stack.Screen name="CustomerService" options={{ headerShown: false }} component={ProductHome} /> */}
        </Stack.Navigator>
    );

}

const styles = StyleSheet.create({
    background: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: 60,
        paddingBottom: 0,

        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS

    }
})

export default AddScreen;