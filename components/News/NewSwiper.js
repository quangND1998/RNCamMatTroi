import React, { useState, useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, ScrollView, RefreshControl,
    ImageBackground,   Dimensions,
    Animated,
    Easing, } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import Payoo from '../../payoo';
import { PaymentService } from '../../common/payment/paymentService';
import { getNews } from '../../store/actions/new';
import { getActivity } from '../../store/actions/new';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slides from '../../data/index.js';
import SlideItem from './SlideItem.js';
const merchantId = "11931"
const NewSwiper = ({ navigation, route }) => {
    const envDevelopment = 0;
    const envProduction = 1;
    const langVietNam = 0;
    const langEnglish = 1;
    const cashAmount = 2020000;
    const dispatch = useDispatch();
    const news = useSelector(state => state.new.news);
    const activity = useSelector(state => state.new.activitys);
    const [refreshing, setRefreshing] = React.useState(false);
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fetchNews();
    }, []);
    const fetchNews = async () => {
        dispatch(getNews())
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchNews();
            setRefreshing(false);
        }, 2000);
    }, []);

    const handleOnScroll = event => {
        Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          },
        )(event);
      };

      const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
      }).current;
    return (
        <View >
            {news ?
            <FlatList
                data={news.data}
                renderItem={({item}) => <SlideItem item={item} />}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                viewabilityConfig={viewabilityConfig}
                    /> : <View></View> }
        </View>
    );
}

const styles = StyleSheet.create({
})


export default NewSwiper;