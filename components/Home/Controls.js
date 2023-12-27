
import React, { Component,useState ,useEffect } from 'react';
import { View, Text, StyleSheet ,TouchableOpacity,Image,Button,PermissionsAndroid,Alert  } from 'react-native';
import SomeTaskName from '../../SomeTaskName';
import heart from '../../heart.png' 
import Geolocation from 'react-native-geolocation-service';
import RNLocation from "react-native-location";
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    view: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'gray',
      padding: 10,
      margin: 10,
    },
    text: {
      fontSize: 20,
      color: 'black',
    },
    title: {
      fontWeight: '500',
    },
  });
// create a component
const Controls = () => {
    const imageSize = 150; 
    useEffect(() => {
      checkPermission();
  }, []);
    const checkPermission = async()=>{
      await  RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse"
        }
      }).then(granted => {
          if (granted) {
          
       
            console.log('coarse',granted)
          }
        })
    
    }
    const getLocation =async () => {
          
            
          Geolocation.getCurrentPosition(
            position => {
              console.log(position);
              setLocation(position);
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
              setLocation(false);
            },
            {  accuracy: {
              android: 'high',
              ios: 'best',
            },enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 , distanceFilter: 0,
            forceRequestLocation: true,
            showLocationDialog: true},
          );
        
  
      // console.log(location);
    };
    const [location, setLocation] = useState(false);
    return (
        <View style={styles.container}>
        <View style={styles.view}>
          {/* <Image source={heart} style={{ width: imageSize, height: imageSize }} resizeMode="contain" /> */}
        </View>
        {/* <View style={styles.view}>
   
          <TouchableOpacity style={styles.button} onPress={() => SomeTaskName.startService()}>
            <Text style={styles.instructions}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => SomeTaskName.stopService()}>
            <Text style={styles.instructions}>Stop</Text>
          </TouchableOpacity>
          <Text  style={styles.text}>Latitude: {location ? location.coords.latitude : null}</Text>
          <Text  style={styles.text}>Longitude: {location ? location.coords.longitude : null}</Text>
          <Button style={styles.button} title="getDataw" onPress={getLocation}>
         
          </Button>
        </View> */}
      </View>
 
    );
};


//make this component available to the app
export default Controls;
