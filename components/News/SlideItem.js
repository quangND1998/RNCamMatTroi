import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Easing,
  } from 'react-native';
  import React from 'react';
  
  const {width, height} = Dimensions.get('screen');
  
  const SlideItem = ({item}) => {
    const translateYImage = new Animated.Value(40);
  
    Animated.timing(translateYImage, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  
    return (
      <View style={styles.container}>
        <Animated.Image
         className=" w-full object-cover rounded-lg"
          source= {{ uri: item.images[0]?.original_url }}

          style={[
            styles.image
          ]}
        />
  
        <View style={styles.content}>
          <Text numberOfLines={3} className="text-sm text-gray-700 px-1 my-1 font-base clamp three-lines" 
          style={styles.description}>{item.short_description}</Text>
        </View>
      </View>
    );
  };
  
  export default SlideItem;
  
  const styles = StyleSheet.create({
    container: {
      width: width/2.5,
      height: 260,
      alignItems: 'center',
      margin: 5
    },
    image: {
      flex: 0.6,
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