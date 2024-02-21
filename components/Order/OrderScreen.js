import React from 'react';
import { View, StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderItem from './Index';
import OrderDetail from './detail';
import OrderReview from './OrderReview';
import { HeaderBackButton, HeaderTitle, HeaderBackground } from '@react-navigation/elements';
const Stack = createNativeStackNavigator();
const OrderScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName="OrderItem"
            screenOptions={({ navigation, route }) => ({
                tabBarActiveTintColor: '#FF6100',
                tabBarInactiveTintColor: "#184E17",

                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FF6100',
                },
                headerTitleAlign: 'center',
                paddingTop: 12,
                headerLeft: (props) => (
                    <HeaderBackButton labelStyle={{ marginLeft: 0 }}
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
            <Stack.Screen name="OrderItem" options={{ title: 'Đơn hàng' }} component={OrderItem} />
            <Stack.Screen name="OrderDetail" options={({ navigation, route }) => ({
                title: route.params.name
            })} component={OrderDetail} />

            <Stack.Screen name="OrderReview" options={({ navigation, route }) => ({
                title: `Đánh giá đơn hàng`
            })} component={OrderReview} />
        </Stack.Navigator>
    );

}


const styles = StyleSheet.create({
    background: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: 100,
        paddingBottom: 0,
         elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
    }
})

export default OrderScreen;