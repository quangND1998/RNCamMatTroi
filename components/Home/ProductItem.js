import React, { useState, useEffect, useRef } from 'react';
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
import {  Linking, Keyboard, ScrollView, RefreshControl, ImageBackground, SectionList, YellowBox } from 'react-native';
import { Center, Container, Heading, Button,Box, Flex, Stack, Input, SearchBar, Icon, Spacer, ZStack, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useHelper } from '../../helpers/helper';
const { width, height } = Dimensions.get('screen');
const imageHeight = height - 240;
import QRCode from 'react-native-qrcode-svg';
import { ArrowRight } from 'iconsax-react-native';
import Video from 'react-native-video';
import Gallery from 'react-native-image-gallery';
const ProductItem = ({ item,index , navigation }) => {
  // console.log(navigation);
  const [isOpen, setIsOpen] = useState(false);
  const translateYImage = new Animated.Value(40);
  const { formatDateShort, formatDateUse } = useHelper();
  const videoPlayer = useRef(null);
  const [paused, setPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const onLoad = (data) => {
    setDuration(data.duration);
  };

  const onLoadStart = (data) => setIsLoading(true);
  const handlerDetail = () => {
    console.log(index);
    
    // console.log(navigation);
    // navigation.navigate('Schedule', {
    //   itemId: item.id,

    // });
  }
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
        <Box className=" mt-[-220px] bg-white rounded-2xl  mx-4  border-solid border-2 border-[#2C5524]">
          <Box className="flex flex-row p-4 w-full justify-between">
            <Box style={styles.content} className="text-left mr-2 ">
              <Text numberOfLines={3} className="text-sm text-gray-700 px-1 my-1 font-base clamp three-lines"
                style={styles.description}>Mã cây: <Text className="text-[#184E17]">{item.tree?.address}</Text></Text>
              <Text numberOfLines={3} className="text-sm text-gray-700 px-1 my-1 font-base clamp three-lines"
                style={styles.description}>Tên cây: <Text className="text-[#FF6100]">{item.tree?.name}</Text></Text>
              <Text numberOfLines={3} className="text-sm text-gray-700 px-1 my-1 font-base clamp three-lines"
                style={styles.description}>Ngày nhận nuôi: <Text className="text-[#184E17]">{formatDateShort(item.time_approve)}</Text></Text>
              <Text numberOfLines={3} className="text-sm text-gray-700 px-1 my-1 font-base clamp three-lines"
                style={styles.description}>Số ngày nhận nuôi: <Text className="text-[#184E17]">{formatDateUse(item.time_approve)} </Text></Text>
            </Box>
            <Box className="p-1 ">
              <QRCode
                value={`https://qly.cammattroi.com/tree/qrcode/${item?.id}`}
                logo={require('../../assets/images/product.png')}
                logoSize={20}
                logoBackgroundColor='white'
              />
            </Box>
          </Box>
          <TouchableOpacity onPress={handlerDetail} className="bg-[#FF6100]  flex flex-row rounded-b-2xl items-center justify-center text-white" >
            <Text numberOfLines={3} className="text-sm text-white uppercase px-1 py-3 font-bold"
            >Đặt lịch thăm vườn ngay</Text>
            <ArrowRight className="text-[#ffffff] "
              size="25"
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </Box>
      </View>
      <Box className="bg-white rounded-2xl">
        <Box className="mx-4">
          <Text  className="text-2xl text-[#FF6100]  px-1 py-3 font-bold" >Lịch sử chăm sóc cây</Text>
            <Box className="" >
                  {item.tree?.history_care ?  Object.keys(item.tree?.history_care).map((history, key) =>
                  <Box>
                  {  key < 2 ?
                    <Box className="flex mx-3">
                      <Text className="font-base text-sm text-[#184E17] ">{formatDateShort(history)}</Text>
                      <Box className="flex w-full my-2 items-center">
                        {item.tree?.history_care[history].map((history_care, index) =>
                          // <Text className="font-inter font-normal text-base text-[#080808] ">{activity.name} ,</Text>
                          <Box className=" flex w-full flex-row flex-wrap">
                            <Text className="font-bold  text-[#184E17] px-3">.</Text>
                            {history_care.activity_care.map((activity, index) =>
                                <Box className="flex flex-row">
                                    {history_care.activity_care.length - 1 == index ? 
                                    <Text className="font-inter text-[13px] text-[#080808] " >{activity.name}</Text> :
                                    <Text className="font-inter  text-[13px] text-[#080808] " >{activity.name},</Text>}

                                </Box>
                            )}
                          </Box>
                        )}
                      </Box>
                    </Box>
                    : 
                    <Text className="font-base text-center text-sm text-[#184E17] ">Xem tất cả</Text>
                  }
                  </Box>
                  ) : null}
            </Box>
          <Text  className="text-2xl text-[#FF6100]  px-1 py-3 font-bold" >Hình ảnh và video</Text>
          <Box className="px-3 py-3 bg-[#F9EDD5] w-full flex flex-row flex-wrap"> 
            {item?.tree ? item.tree?.images.map((image, index_m) => 
              <Box key={index_m} className="w-1/3 border border-[#F9EDD5]" >
                {image.mime_type == "image/jpeg" ?
                  <Image className="w-full object-cover" source={{ uri: image.original_url }} alt={`imageslide`} style={[ styles.imageGallary ]}></Image>
                  :
                  <Box className="w-full h-[100px]">
                    <Video source={{uri: image.original_url }}
    
                      onLoad={onLoad}
                      className="w-full h-[100px]"
                      ref={videoPlayer}
                    />
                    <Box className="absolute flex items-center justify-center w-full h-full">
                      <Image  className=" mx-auto object-cover w-[25px] h-[25px]" source={require('../../assets/icon/play.png')}></Image>
                    </Box>
                  </Box>
                }
              </Box>
            ) : null }

          </Box>
        </Box>
        
      </Box>
      <Gallery
        style={{ flex: 1, backgroundColor: 'black' }}
        images={[
          { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
          { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
          { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
          { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
        ]}
      />
    </View>
  );
};
export default ProductItem;

const styles = StyleSheet.create({
  container: {
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
  imagelist:{
    width: '100%',
    display: 'flex',
  },
  imageGallary: {
    // width: "30%",
    height: 100,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
