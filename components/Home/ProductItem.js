import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { Linking, Keyboard, ScrollView, RefreshControl, ImageBackground, SectionList, YellowBox } from 'react-native';
import { Center, Container, Heading, Button, Box, Flex, Stack, Input, SearchBar, Icon, Spacer, ZStack, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useHelper } from '../../helpers/helper';
const { width, height } = Dimensions.get('screen');
const imageHeight = height;
import QRCode from 'react-native-qrcode-svg';
import { ArrowRight } from 'iconsax-react-native';
import Video from 'react-native-video';
import ImageModal from 'react-native-image-modal';
import { PressableOpacity } from 'react-native-pressable-opacity';
import ModalVideo from './ModalVideo';
const ProductItem = ({ item, index, navigation }) => {

  const translateYImage = new Animated.Value(40);
  const { formatDateShort, formatDateUse } = useHelper();
  const handlerDetail = () => {
    navigation.navigate('Schedule', {
      itemId: item.id
    })
  }

  const listImage = useMemo(() => {
    const array = [];
    if (item?.tree && item.tree?.images) {
      item.tree.images.forEach((image) => {
        if (image.mime_type.includes('image')) {
          array.push({
            source: {
              uri: image.original_url
            }
          })
        }

      })
      return array
    }
    return array
  })
  const images = [
    {
      url: require('../../assets/images/anhcam.png')
    },
    {
      url: require('../../assets/images/anhcam2.png')
    },
    {
      url: require('../../assets/images/anhcam3.png')
    },
  ];
  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();
  return (
    <View style={styles.container}>
      <View style={styles.content} className="relative">
        <Image
          className=" w-full object-cover"
          source={images[index].url}
          alt={`imageslide`}
          style={[
            styles.image
          ]}
        >
        </Image>
        <Box  className=" mt-[-288px] bg-white rounded-2xl  mx-4  border-solid border-2 border-[#2C5524]">
          <Box className="flex flex-row px-4 py-2 w-full justify-between">
            <Box style={styles.content} className="text-left mr-2 ">
              <Text numberOfLines={3} className=" text-gray-700 px-1 my-0 "
                style={styles.description}>Mã cây: <Text className="text-[#184E17] font-bold">{item.tree?.address}</Text></Text>
              <Text numberOfLines={3} className=" text-gray-700 px-1 my-0 "
                style={styles.description}>Tên cây: <Text className="text-[#FF6100] font-bold">{item.tree?.name}</Text></Text>
              <Text numberOfLines={3} className=" text-gray-700 px-1 my-0 "
                style={styles.description}>Ngày nhận nuôi: <Text className="text-[#184E17] font-bold" >{formatDateShort(item.time_approve)}</Text></Text>
              <Text numberOfLines={3} className=" text-gray-700 px-1 my-0 "
                style={styles.description}>Số ngày nhận nuôi: <Text className="text-[#184E17] font-bold">{formatDateUse(item.time_approve)} </Text></Text>
            </Box>
            <Box className="p-1 ">
              <QRCode
                value={`https://qly.cammattroi.com/tree/qrcode/${item?.id}`}
                logo={require('../../assets/images/logo_qcam.png')}
                logoSize={16}
                logoBackgroundColor='white'
                size={70}
                resizeMode="contain"
              />
            </Box>
          </Box>
          <TouchableOpacity onPress={handlerDetail} className="bg-[#FF6100]  flex flex-row rounded-b-xl items-center justify-center text-white" >
            <Text numberOfLines={3} className="text-[15px] text-white uppercase px-1 py-2 font-bold"
            >Đặt lịch thăm vườn ngay</Text>
            {/* <ArrowRight className="text-[#ffffff] "
              size="25"
              color="#FFFFFF"
            /> */}
            <Image className="ml-4 w-[25px] h-6" resizeMode="contain" source={require('../../assets/icon/arrow-small-right.png')}></Image>
          </TouchableOpacity>
        </Box>
      </View>
      <Box className="bg-white rounded--t-2xl mt-4 py-2 mb-[77px]">
        <Box className="mx-4">
          <Text className="text-2xl text-[#FF6100]  px-1 py-3 font-bold" >Lịch sử chăm sóc cây</Text>
          <Box className="" >
            {item.tree?.history_care ? Object.keys(item.tree?.history_care).map((history, key) =>
              <Box key={key} >
                {key < 3 ?
                  <Box className="flex mx-3">
                    <Text className="font-base text-sm text-[#184E17] ">{formatDateShort(history)}</Text>
                    <Box className="flex w-full my-2 items-center">
                      {item.tree?.history_care[history].map((history_care, index) =>
                        // <Text className="font-inter font-normal text-base text-[#080808] ">{activity.name} ,</Text>
                        <Box key={index} className=" flex w-full flex-row flex-wrap items-center">
                          {/* <Text className="font-bold  text-[#184E17] px-3">.</Text> */}
                          <Image source={require('../../assets/icon/dot.png')} className="px-3  w-[5px] h-[5px]" resizeMode="contain"></Image>
                          {history_care.activity_care.map((activity, index) =>
                            <Box key={index} className="flex flex-row">
                              {history_care.activity_care.length - 1 == index ?
                                <Text className="font-inter text-[13px] text-[#080808] " >{activity.name}</Text> :
                                <Text className="font-inter  text-[13px] text-[#080808] " >{activity.name},</Text>}

                            </Box>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Box>
                  : key == 3 ?
                    <PressableOpacity onPress={() => navigation.navigate('HistoryCare', { treeId: item.tree.id }

                    )}>
                      <Text className="font-base text-center text-sm text-[#184E17] ">Xem tất cả</Text>
                    </PressableOpacity>

                    : null
                }
              </Box>

            ) : null}
          </Box>
          <Text className="text-2xl text-[#FF6100]  px-1 py-3 font-bold" >Hình ảnh và video</Text>
          <Box className="px-3 py-3 bg-[#F9EDD5] w-full flex flex-row flex-wrap">
            {item?.tree ? item.tree?.images.map((image, index_m) =>
              <Box key={index_m} className="w-1/3 border border-[#F9EDD5]" >
                {image.mime_type.includes("image") ?
                  <ImageModal resizeMode="contain"
                    source={{ uri: image.original_url }} alt={`imageslide`} style={[styles.imageGallary]}></ImageModal>
                  :
                  <Box className="w-full h-[100px]">
                    <Box className="absolute flex items-center justify-center w-full h-full" >
                      <ModalVideo url={image.original_url} />

                    </Box>
                  </Box>
                }
              </Box>
            ) : null}

          </Box>
        </Box>

      </Box>
    </View>
  );
};
export default ProductItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  content: {
    // flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    marginVertical: 12,
    color: '#000',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    height: imageHeight,
    width: '100%',
  },
  imagelist: {
    width: '100%',
    display: 'flex',
  },
  imageGallary: {
    width: 120,
    height: 120,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
