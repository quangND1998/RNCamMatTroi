import React from 'react';
import { View, StyleSheet } from 'react-native';

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
            <Stack.Screen name="CustomerService" options={{ title: 'Dịch vụ khách hàng' }} component={CustomerService} />
            <Stack.Screen name="Complaint" options={{ title: 'Khiếu nại' }} component={Complaint} />
            {/* <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={Home} />
            <Stack.Screen name="CustomerService" options={{ headerShown: false }} component={ProductHome} /> */}
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

export default AddScreen;