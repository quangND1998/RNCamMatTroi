import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, ScrollView, RefreshControl, ImageBackground } from 'react-native';
import { Center, Container, Heading, Button, Text, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import Payoo from '../../payoo';
import { PaymentService } from '../../common/payment/paymentService';
import { getNews } from '../../store/actions/new';
import { SafeAreaView } from 'react-native-safe-area-context';

const ImageHeader = props => (
    <View style={{ backgroundColor: '#eee' }}>
      <Image
        style={StyleSheet.absoluteFill}
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }}
      />
      <Header {...props} style={{ backgroundColor: 'transparent' }}/>
    </View>
  );

export default ImageHeader;