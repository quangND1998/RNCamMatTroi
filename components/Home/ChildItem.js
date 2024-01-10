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
  import React from 'react';
  const { width, height } = Dimensions.get('screen');
  
  const ChildItem = ({ item }) => {
    // console.log(navigation);
    const translateYImage = new Animated.Value(40);
    const handlerDetail = () => {
      // console.log(item.id);
    }
    Animated.timing(translateYImage, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
    return (
      <TouchableOpacity>
        <View style={styles.container}  >
          <Image
            className=" w-full object-cover"
            source={ item.banner}
  
            style={[
              styles.image
            ]}
          ></Image>
        </View>
      </TouchableOpacity>
    );
  };
  export default ChildItem;
  
  const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      alignItems: 'center',
      margin: 0
    },
    image: {
      flex: 1,
      width: '100%',
    },
    content: {
      flex: 0.4,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    description: {
      fontSize: 14,
      marginVertical: 12,
      color: '#333',
    },
    price: {
      fontSize: 32,
      fontWeight: 'bold',
    },
  });
  