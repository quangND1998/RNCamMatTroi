import React, { useState, useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import {
    StyleSheet, TouchableOpacity, Linking, Keyboard, View, ScrollView, RefreshControl,
    ImageBackground, Dimensions,
    Animated, SafeAreaView, useWindowDimensions, BackHandler,
    Easing,
} from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { getNewDetail } from '../../store/actions/new';
import RenderHtml from 'react-native-render-html';
import { ArrowLeft2 } from 'iconsax-react-native';
const FarmDetail = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { itemId } = route.params;
    const [refreshing, setRefreshing] = React.useState(false);
    const newDetail = useSelector(state => state.new.newdetail);
    const { width } = useWindowDimensions();
    const source = {
        html: newDetail?.description
    };
    useEffect(() => {
        fetchNewDetail(itemId);
        console.log(newDetail);
    }, []);
    const fetchNewDetail = async () => {
        dispatch(getNewDetail(itemId))
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchNewDetail(itemId);
            setRefreshing(false);
        }, 2000);
    }, []);
    function handleBackButtonClick() {
        navigation.goBack();
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                {newDetail ?
                    <Box>
                        <Box className="relative">
                            <Image source={{ uri: newDetail.images[0]?.original_url }} className="m-auto h-52 w-full object-cover" alt="original_url"></Image>
                            <TouchableOpacity onPress={handleBackButtonClick} className="absolute mt-10 ml-3">
                                <ArrowLeft2
                                    size="32"
                                    color="#FF8A65"
                                />
                            </TouchableOpacity >
                        </Box>
                        <Box className="m-3 border-bottom">
                            <Box>
                                <Box className="mb-4">
                                    <Text className="font-semibold text-base">{newDetail.title}</Text>
                                    <Text className="text-sm text-[#AEAEAE]">{newDetail.updated_at}</Text>
                                </Box>
                                <Box>
                                    <RenderHtml
                                        className="text-sm text-[#000000]"
                                        contentWidth={width}
                                        source={source}
                                    />
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                    : <View></View>}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {


    },
})


export default FarmDetail;