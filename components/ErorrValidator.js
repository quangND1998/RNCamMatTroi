import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Flex, Text, Select, CheckIcon, TextArea, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
const ErorrValidator = ({ errors, key_error }) => {

    return (

        <SafeAreaView style={styles.container}>

            {errors && Object.hasOwn(errors, key_error) ? errors[key_error].map((error, key) =>
                <Text key={key} className="text-red-500 text-[11px] px-2"  >
                    {error}</Text>
            ) : null}


        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1
    }
})


export default ErorrValidator;