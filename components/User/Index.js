import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy } from 'iconsax-react-native';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const UserScreen = ({ navigation, route }) => {


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Text>UserScreen</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1
    }
})


export default UserScreen;