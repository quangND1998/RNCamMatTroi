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
import QRCode from 'react-native-qrcode-svg';
import { Box, Flex } from 'native-base';
import { ArrowRight } from 'iconsax-react-native';
const ProductItem = ({ item, navigation }) => {
  // console.log(navigation);
  const translateYImage = new Animated.Value(40);
  const { formatDateShort, formatDateUse } = useHelper();
  const handlerDetail = () => {
    console.log(item.id);
    // console.log(navigation);
    navigation.navigate('Schedule', {
      itemId: item.id,

    });
  }
  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();
  return (
    <Box className="bg-white rounded-2xl my-2 mx-4  border-solid border-2 border-[#2C5524]">
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
        <TouchableOpacity onPress={() => navigation.navigate('HistoryCare', {
          treeId: item.tree.id
        })}>

          <Box className="p-1 " >
            <QRCode
              value={`https://qly.cammattroi.com/tree/qrcode/${item?.id}`}
              logo={require('../../assets/images/product.png')}
              logoSize={20}
              logoBackgroundColor='white'
            />
          </Box>
        </TouchableOpacity>
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
  );
};
export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  content: {
    alignItems: 'left',
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
});
