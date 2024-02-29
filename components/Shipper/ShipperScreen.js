import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useDispatch, useSelector } from 'react-redux';
import { PressableOpacity } from 'react-native-pressable-opacity';
import HomeShipper from './HomeShipper';
import { Modal, Button, Select, Input, FormControl, Text, Flex, CheckIcon, HStack, Center, Box, Radio } from "native-base";
import { fetchOrders } from '../../store/actions/shipper';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderShipperDetail from './OrderShipperDetail';
import { HeaderBackButton, HeaderTitle, HeaderBackground } from '@react-navigation/elements';
import Close from '../Svg/Close';
const Stack = createNativeStackNavigator();
const ShipperScreen = () => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = React.useState(false);

    const date = useSelector(state => state.shipper.date)
    const day = useSelector(state => state.shipper.day)
    const status = useSelector(state => state.shipper.status)

    const getOrders = useCallback(() => {

        dispatch({
            type: 'setDate',
            payload: date
        })
        dispatch({
            type: 'setDay',
            payload: day
        })
        let params = {
            date: date,
            day: day,
            status: status
        }
        dispatch(fetchOrders(params))
        setModalVisible(false)
    }, [date, day, status])
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeShipper" options={{
                headerShown: true, title: 'Quản lý vận đơn', tabBarActiveTintColor: '#F78F43',
                tabBarInactiveTintColor: "##000000",
                headerShadowVisible: false,
                headerTitleStyle: {
                    fontWeight: '600',
                    color: '#FFFFFF',
                },
                headerStyle: {
                    backgroundColor: '#F78F43',

                },
                headerTitleAlign: 'left',
                headerRight: (props) => (
                    <Box>

                        <Flex direction='row' justifyContent="center" alignItems="center">
                            <PressableOpacity onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                                <Flex direction='row' className="bg-white px-4 rounded-md py-2 justify-between ">

                                    {day ? day == 7 ? '7 ngày trước' : day == 30 ? '30 ngày trước' : null :
                                        date ? date == 'now' ? 'Hôm nay' : date == 'yesterday' ? 'Hôm qua' : date == 'month' ? 'Tháng này' : date == 'beforMonth' ? 'Tháng trước' : null : null}
                                    <Icon name="chevron-forward" size={20} color="#070707" className="text-[#070707] text-3xl" />

                                </Flex>
                            </PressableOpacity>
                        </Flex>
                        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} justifyContent="flex-end" className="h-full" bottom="0" size="full">
                            <Modal.Content>
                                <Modal.CloseButton _icon={<Close />} className="mr-9 left-2 py-3 " />
                                {/* className="mr-9 left-0  py-3 " */}
                                <Modal.Header className="bg-[#D9D9D9] font-bold   items-center py-6" ><Text className="font-bold text-[16px]">Bộ lọc thời gian</Text></Modal.Header>
                                <Modal.Body>
                                    <Radio.Group name="dateRadio" accessibilityLabel="favorite number" value={date} onChange={nextValue => {
                                        dispatch({
                                            type: 'setDate',
                                            payload: nextValue
                                        });
                                        dispatch({
                                            type: 'setDay',
                                            payload: null
                                        });

                                    }}>
                                        <Radio colorScheme="orange" value="now" my={1} size="sm">
                                            Hôm nay
                                        </Radio>
                                        <Radio colorScheme="orange" value="yesterday" my={1} size="sm">
                                            Hôm qua
                                        </Radio>
                                        <Radio colorScheme="orange" value="month" my={1} size="sm">
                                            Tháng này
                                        </Radio>
                                        <Radio colorScheme="orange" value="beforMonth" my={1} size="sm">
                                            Tháng trước
                                        </Radio>
                                    </Radio.Group>

                                    <Radio.Group name="dayRadio" accessibilityLabel="favorite number" value={day} onChange={nextValue => {
                                        dispatch({
                                            type: 'setDay',
                                            payload: nextValue
                                        })
                                        dispatch({
                                            type: 'setDate',
                                            payload: null
                                        })
                                    }}>
                                        <Radio colorScheme="orange" value={7} my={1} size="sm">
                                            7 ngày trước
                                        </Radio>
                                        <Radio colorScheme="orange" value={30} my={1} size="sm">
                                            30 ngày trước
                                        </Radio>

                                    </Radio.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button flex="1" onPress={getOrders} className="bg-[#FF0000] rounded-md font-bold" size='lg'  >
                                        <Text className="text-white font-bold text-[15px]">Áp dụng bộ lọc</Text>
                                    </Button>

                                </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                    </Box>

                ),
            }} component={HomeShipper} />
            <Stack.Screen name="OrderShipperDetail" options={({ navigation, route }) => ({
                title: route.params.title,
                tabBarActiveTintColor: '#F78F43',
                tabBarInactiveTintColor: "#000000",
                headerTitleStyle: {
                    color: '#FFFFFF',
                    alignItems: 'center'
                },
                headerStyle: {
                    backgroundColor: '#F78F43',
                },
                headerTitleAlign: 'left',
                headerLeft: (props) => (
                    <PressableOpacity onPress={() => {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        }
                        else {
                            navigation.navigate('Home')
                        }
                    }}>
                        {/* <Image className=" w-6 h-6" resizeMode='contain' alt='back' source={require('../../assets/icon/fi-rr-arrow-small-left.png')} */}
                        {/* {...props} */}

                        {/* /> */}
                        <Icon
                            name="chevron-back"
                            color="rgba(255, 255, 255, .9)"
                            size={28}
                        />
                    </PressableOpacity>
                ),
            })} component={OrderShipperDetail} />
            {/* <Stack.Screen name="HomeShipper" options={{
                headerShown: true, title: 'Quản lý vận đơn', tabBarActiveTintColor: '#F78F43',
                tabBarInactiveTintColor: "#184E17",

                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                },
                headerStyle: {
                    backgroundColor: '#F78F43',

                },


                headerTitleAlign: 'left',
              
            }} component={HomeShipper} /> */}



        </Stack.Navigator>
    );

}

const styles = StyleSheet.create({})

export default ShipperScreen;