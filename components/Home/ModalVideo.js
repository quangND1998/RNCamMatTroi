import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Image
} from 'react-native';

import { Center, Container, Heading, Button, Box, Flex, Stack, Input, SearchBar, Icon, Spacer, ZStack, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { WebView } from 'react-native-webview';
import { PressableOpacity } from 'react-native-pressable-opacity';
import { CONTENT_SPACING, CONTROL_BUTTON_SIZE, SAFE_AREA_PADDING } from '../QrCode/Constants'
import * as VideoThumbnails from 'expo-video-thumbnails';

const ModalVideo = ({ url }) => {
    const [isVisible, setVisible] = useState(false);

    const [image, setImage] = useState(null);
    useEffect(() => {
        generateThumbnail()
    }, [])
    const generateThumbnail = async () => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                url,
                {
                    time: 15000,
                }
            );
            setImage(uri);

        } catch (e) {
            console.warn(e);
        }
    };
    return (
        <View style={styles.container}>

            <View className="flex items-center align-center h-[100px]">
                {image && <Image source={{ uri: image }} resizeMode='cover' className=" mx-auto object-cover w-[100px] h-[100px] " />}

                <PressableOpacity onPress={() => setVisible(true)} className="absolute w-[100px] h-[100px] flex items-center " style={styles.bg_color} >
                    <Image className=" m-auto object-cover w-[25px] h-[25px] z-25" source={require('../../assets/icon/play.png')}></Image>
                </PressableOpacity>


            </View>

            <Modal
                style={{

                }}
                animationType="slide"
                transparent={false}
                visible={isVisible}
                onRequestClose={() => {
                    alert('Modal has been closed.');
                }}>


                <WebView
                    javaScriptEnabled={true}
                    style={{ flex: 1 }}
                    source={{
                        uri: url
                    }}
                />
                <View style={styles.topButtonRow}>
                    <PressableOpacity style={styles.button} onPress={() => setVisible(false)} disabledOpacity={0.4}>

                        <FontAwesome name={'remove'} solid size={24} color="#f4f8fc" />

                    </PressableOpacity>
                </View>

            </Modal>
        </View>
    );
};

export default ModalVideo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    topButtonRow: {
        position: 'absolute',
        top: SAFE_AREA_PADDING.paddingTop,
        left: SAFE_AREA_PADDING.paddingLeft,
    },
    bg_color: {
        backgroundColor: 'rgba(187 181 181 0.16)'
    }
});