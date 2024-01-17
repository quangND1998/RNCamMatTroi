import React, { useState, useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import {
    StyleSheet, TouchableOpacity, Linking, Keyboard, View, ScrollView, RefreshControl,
    ImageBackground, Dimensions,
    Animated,
    Easing,
} from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import Payoo from '../../payoo';
import { PaymentService } from '../../common/payment/paymentService';
import { getNews } from '../../store/actions/new';
import { getActivity } from '../../store/actions/new';
import { getProductOwner } from '../../store/actions/productService';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductItem from './ProductItem';
import ChildItem from './ChildItem.js';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
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
    const productOwner = useSelector(state => state.productService.productOwners);
    useEffect(() => {
        fetchProductOwner();
    }, []);
    const fetchProductOwner = async () => {
        dispatch(getProductOwner())

    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchProductOwner();
            setRefreshing(false);
            console.log(productOwner);
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
    const images = [
        {
            banner: require('../../assets/images/anhcam2.png')
        },
        {
            banner: require('../../assets/images/anhcam2.png')
        },
        {
            banner: require('../../assets/images/anhcam3.png')
        },
    ];
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;
    _renderItem = ({ item }) => {
        return (
          <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={item.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        );
      }
      _renderNextButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon
              name="chevron-forward"
              color="rgba(255, 255, 255, .9)"
              size={24}
            />
          </View>
        );
      };
      _renderDoneButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon
              name="md-checkmark"
              color="rgba(255, 255, 255, .9)"
              size={24}
            />
          </View>
        );
      };

        // <View >
        //     {images ?
        //         <FlatList
        //             data={images}
        //             renderItem={({ item }) => <ChildItem item={item} />}
        //             horizontal
        //             pagingEnabled
                    snapToAlignment="center"
        //             showsHorizontalScrollIndicator={false}
        //             onScroll={handleOnScroll}
        //             viewabilityConfig={viewabilityConfig}
        //         /> : <View></View>}
        // </View>
        if(productOwner){
            return <View></View>;
        }else{
            return  (<AppIntroSlider  data={productOwner} 
            renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
            />)
        }
}

const styles = StyleSheet.create({
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
})


export default NewSwiper;