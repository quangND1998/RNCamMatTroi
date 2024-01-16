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
import { useHelper } from '../../helpers/helper';
import React from 'react';
const { width, height } = Dimensions.get('screen');
const imageHeight = height - 240;
import QRCode from 'react-native-qrcode-svg';
import { Box, Flex } from 'native-base';
import { ArrowRight } from 'iconsax-react-native';
const ProductItem = ({ item,index , navigation }) => {
  // console.log(navigation);
  const translateYImage = new Animated.Value(40);
  const { formatDateShort, formatDateUse } = useHelper();
  const handlerDetail = () => {
    console.log(index);
    
    // console.log(navigation);
    // navigation.navigate('Schedule', {
    //   itemId: item.id,

    // });
  }
  const images = [
    {
        banner: require('../../assets/images/anhcam.png')
    },
    {
        banner: require('../../assets/images/anhcam2.png')
    },
    {
        banner: require('../../assets/images/anhcam3.png')
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
              source={images[index].banner}
              alt={`imageslide`}
              style={[
                styles.image
              ]}
            >
        </Image>
        <Box className="mt-[-220px] bg-white rounded-2xl  mx-4  border-solid border-2 border-[#2C5524]">
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
              {item?.tree.history_care ? item.tree?.history_care.map((history, index_h) =>
                <Box className="flex mx-3">
                   <Text className="font-base text-sm text-[#184E17] ">{history.date}</Text>
                   <Box className="flex flex-row my-2 items-center">
                   <Text className="font-bold text-2xl text-[#184E17] px-3">.</Text>
                    {history.activity_care ? history.activity_care.map((activity,index_a) => 
                      <Text className="font-inter font-normal text-base text-[#080808] ">{activity.name} ,</Text>
                    ) : null}
                   </Box>
                </Box>
              ) : null}
          </Box>
          <Text  className="text-2xl text-[#FF6100]  px-1 py-3 font-bold" >Hình ảnh và video</Text>

        </Box>
        
      </Box>
    
    </View>
  );
};
export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  content: {
    flex: 1,
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
});
