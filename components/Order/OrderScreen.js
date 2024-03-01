import React from 'react';
import { View, StyleSheet, Image , TouchableOpacity} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderItem from './Index';
import OrderDetail from './detail';
import OrderReview from './OrderReview';
import { HeaderBackButton, HeaderTitle, HeaderBackground } from '@react-navigation/elements';
import { PressableOpacity } from 'react-native-pressable-opacity';

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
                headerLeft: (props) => (
                    <TouchableOpacity onPress={() => {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        }
                        else {
                            navigation.navigate('Home')
                        }
                    }}>
                        <Image className=" w-6 h-6" resizeMode='contain' alt='back' source={require('../../assets/icon/fi-rr-arrow-small-left.png')}
                            {...props}

                        />
                    </TouchableOpacity>
                ),
                headerBackTitleVisible: false,
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
        height: 60,
    }
})

export default OrderScreen;