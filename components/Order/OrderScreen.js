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
                tabBarActiveTintColor: '#F78F43',
                tabBarInactiveTintColor: "#184E17",

                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#F78F43',
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
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        borderLeftWidth: 0.1,
        borderRightWidth: 0.1,
        height: 100,
        paddingBottom: 0
    }
})

export default OrderScreen;