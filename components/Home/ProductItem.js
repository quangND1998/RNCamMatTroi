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
// const { width, height } = Dimensions.get('screen');
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const imageHeight = height;
const heightScreen = height - 77;


import QRCode from 'react-native-qrcode-svg';
import { ArrowRight } from 'iconsax-react-native';
import Video from 'react-native-video';
import ImageModal from 'react-native-image-modal';
import { PressableOpacity } from 'react-native-pressable-opacity';
import ModalVideo from './ModalVideo';
import ModalImage from './ModalImage';
const ProductItem = ({ item, index, navigation }) => {
  const [screenWidth, setScreenWidth] = useState(width);
  const [screenHeight, setScreenHeight] = useState(height);
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

  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
      console.log('update screen');
    };

    Dimensions.addEventListener('change', updateDimensions);

    return () => {
      Dimensions.removeEventListener('change', updateDimensions);
    };
  }, []);
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
    <View style={{ flex: 1,width: screenWidth }} className="w-full">
      <View style={styles.content} className="relative w-full">
        <Image
          className=" w-full object-cover"
          source={images[index].url}
          alt={`imageslide`}
          style={[
            styles.image
          ]}
        >
        </Image>
        <Box  className=" mt-[-340px] mx-4   bg-white rounded-[20px]   border-solid border-[1px] border-[#2C5524]">
          <Box className="flex flex-row px-3 py-3 w-full justify-between">
            <Box style={styles.content} className="text-left mr-2 ">
              <Text numberOfLines={3} className=" text-gray-700 px-1 my-[0.5px] "
                style={styles.description}>Mã cây: <Text className="text-[#184E17] font-bold">{item.tree?.address}</Text></Text>
              <Text numberOfLines={3} className=" text-gray-700 px-1 my-[0.5px]"
                style={styles.description}>Tên cây: <Text className="text-[#FF6100] font-bold">{item.tree?.name}</Text></Text>
              <Text numberOfLines={3} className=" text-gray-700 px-1 my-[0.5px] "
                style={styles.description}>Ngày nhận nuôi: <Text className="text-[#184E17] font-bold" >{formatDateShort(item.time_approve)}</Text></Text>
              <Text numberOfLines={3} className=" text-gray-700 px-1 my-[0.5px] "
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
          <TouchableOpacity onPress={handlerDetail} className="bg-[#FF6100]  flex flex-row rounded-b-[18px] items-center justify-center text-white" >
            <Text numberOfLines={3} className="text-[15px] text-[#F0F0F0] uppercase px-1 py-2.5 font-bold"
            >Đặt lịch thăm vườn ngay</Text>
            {/* <ArrowRight className="text-[#ffffff] "
              size="25"
              color="#FFFFFF"
            /> */}
            <Image className="ml-4 w-[25px] h-6" alt="icon_next" resizeMode="contain" source={require('../../assets/icon/arrow-small-right.png')}></Image>
          </TouchableOpacity>
        </Box>
      </View>
      <Box className="bg-white  rounded-t-[20px] mt-4 py-2 mb-[77px] w-full">
        <Box className="mx-4">
          <Text className="text-[20px] text-[#FF6100]  px-1 py-3 font-bold" >Lịch sử chăm sóc cây</Text>
          <Box className="" >
            {item.tree?.history_care ? Object.keys(item.tree?.history_care).map((history, key) =>
              <Box key={key} >
                {key < 3 ?
                  <Box className="flex mx-3">
                    <Text className="font-base text-[12px] text-[#184E17]  ">{formatDateShort(history)}</Text>
                    <Box className="flex w-full my-2 items-center">
                      {item.tree?.history_care[history].map((history_care, index) =>
                        // <Text className="font-inter font-normal text-base text-[#080808] ">{activity.name} ,</Text>
                        <Box key={index} className=" flex w-full flex-row flex-wrap items-center">
                          {/* <Text className="font-bold text-[40px] text-[#184E17] px-3 py-4">.</Text> */}
                          <Image source={require('../../assets/icon/dot.png')} className="px-3  w-[4px] h-[4px] flex justify-center" alt="dot" resizeMode="contain"></Image>
                          {history_care.activity_care.map((activity, index) =>
                            <Box key={index} className="flex flex-row">
                              {history_care.activity_care.length - 1 == index ?
                                <Text className="font-inter text-[16px] text-[#080808] " >{activity.name}</Text> :
                                <Text className="font-inter  text-[16px] text-[#080808] " >{activity.name}, </Text>}

                            </Box>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Box>
                  : key == 3 ?
                    <PressableOpacity onPress={() => navigation.navigate('HistoryCare', { treeId: item.tree.id }

                    )}>
                      <Text className="font-base text-center text-[14px] font-normal text-[#184E17] ">Xem tất cả</Text>
                    </PressableOpacity>

                    : null
                }
              </Box>

            ) : null}
          </Box>
          <Text className="text-[20px] text-[#FF6100]  px-1 py-3 font-bold" >Hình ảnh và video</Text>
          <Box className="px-3 py-3 bg-[#F9EDD5] w-full flex flex-row flex-wrap">
            {item?.tree ? item.tree?.images.map((image, index_m) =>
              <Box key={index_m} className="w-1/3 lg:w-1/6  border-[1px] border-[#F9EDD5]" >
                {image.mime_type.includes("image") ?
                  // <ImageModal resizeMode="cover" modalImageResizeMode="contain"
                  //   source={{ uri: image.original_url }} alt={`imageslide${image.id}`} style={[styles.imageGallary]}></ImageModal>

                  // <Image source={{ uri: image.original_url }} alt={`imageslide${image.id}`} className=" mx-auto object-cover w-full h-[100px] " />
                  <Box className="w-full h-[100px]">
                    <Box className="absolute flex items-center justify-center w-full h-full" >
                      <ModalImage className="w-full h-full"  url={image.original_url} alt={`imageslide${image.id}`} ></ModalImage>
                    </Box>
                  </Box>
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
    </View >
  );
};
export default ProductItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
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
    fontSize: 15,
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

  },
  imagelist: {
    width: '100%',
    display: 'flex',
  },
  imageGallary: {
    height: 100,
    width: 120,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
