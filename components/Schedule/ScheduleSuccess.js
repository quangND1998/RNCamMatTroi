import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Flex, Text, Select, CheckIcon, TextArea, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector, } from 'react-redux'
import { EmojiHappy, User, Calendar, Timer1 } from 'iconsax-react-native';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const ScheduleSuccess = ({ navigation, route }) => {



    return (

        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
            >
                <Box className="my-5 mx-5 pb-5 mt-36 ion-padding">
                    <Center class=" text-center  ">
                        <Heading className=" text-[18px] text-center text-[#FF6100] ">Cảm ơn quý khách đã đặt lịch tới thăm
                            vườn Cam Mặt Trời.</Heading>
                        <Text className="text-center text-[18px] mt-4" >Chúng tôi sẽ liên hệ để hỗ trợ quý khách trong thời gian sớm nhất.</Text>
                        <Image source={require('../../assets/images/check.png')} className="w-[102.3px] h-[97.2px] mt-8" alt='check'></Image>
                    </Center>

                </Box >

            </ScrollView>
            <Button onPress={() => navigation.navigate('Home')} className="absolute bottom-[-200]    w-[90%] ml-[5%] mr-[5%] mt-2 mb-2 px-4 py-4 text-white bg-[#FF6100] rounded-xl"
            >Trở về Trang chủ</Button>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1
    }
})


export default ScheduleSuccess;