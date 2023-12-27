import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, Alert } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy } from 'iconsax-react-native';
import { logoutAction } from '../../store/actions/auth';
import { getToken } from '../../common/asynStorage';
import { useLogin } from '../../context/LoginProvider';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const AddScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { setIsLoggedIn } = useLogin();
    const toast = useToast();
    const handlerLogout = async () => {
        Alert.alert('Đăng xuất', 'Bạn muốn đăng xuất', [
            {
                text: 'Hủy',
                onPress: () => console.log('Hủy'),
                style: 'cancel',
            },
            {
                text: 'Đăng xuất', onPress: () => dispatch(logoutAction(
                    () => {
                        toast.show({
                            title: "Đăng xuất thành công",

                            description: "Thanks for signing up with us."
                        })
                        setIsLoggedIn(false)
                        // navigation.navigate('Login');
                    },
                    () => {
                        toast.show({
                            title: "Something went wrong, please try again!",

                            description: "Something went wrong, please try again."
                        })
                        setIsLoggedIn(false)
                    },
                ))
            },
        ]);


    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity  >
                <Text onPress={handlerLogout}>Add</Text>
            </TouchableOpacity>

        </View>
    );
}


const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1
    }
})


export default AddScreen;