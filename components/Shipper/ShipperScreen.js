import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native-svg';
import { useDispatch } from 'react-redux';
import { PressableOpacity } from 'react-native-pressable-opacity';
import HomeShipper from './HomeShipper';
import { Modal, Button, Select, Input, FormControl, Flex, CheckIcon, HStack, Center, Box, Radio } from "native-base";
import { fetchOrders } from '../../store/actions/shipper';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderShipperDetail from './OrderShipperDetail';
import { HeaderBackButton, HeaderTitle, HeaderBackground } from '@react-navigation/elements';
const Stack = createNativeStackNavigator();
const ShipperScreen = () => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [date, setDate] = React.useState('now');
    const [day, setDay] = React.useState(null);
    useEffect(() => {
        getOrders();
    }, [])

    const getOrders = () => {
        let params = {
            date: date,
            day: day
        }
        dispatch({
            type: 'setDate',
            payload: date
        })
        dispatch({
            type: 'setDat',
            payload: date
        })

        dispatch(fetchOrders(params))
    }
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeShipper" options={{
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
                                <Modal.CloseButton />
                                {/* className="mr-9 left-0  py-3 " */}
                                <Modal.Header className="bg-[#D9D9D9] items-center py-6">Bộ lọc thời gian</Modal.Header>
                                <Modal.Body>
                                    <Radio.Group name="dateRadio" accessibilityLabel="favorite number" value={date} onChange={nextValue => {
                                        setDate(nextValue);
                                        setDay(null);
                                    }}>
                                        <Radio value="now" my={1}>
                                            Hôm nay
                                        </Radio>
                                        <Radio value="yesterday" my={1}>
                                            Hôm qua
                                        </Radio>
                                        <Radio value="month" my={1}>
                                            Thàng này
                                        </Radio>
                                        <Radio value="beforMonth" my={1}>
                                            Thàng trước
                                        </Radio>
                                    </Radio.Group>

                                    <Radio.Group name="dayRadio" accessibilityLabel="favorite number" value={day} onChange={nextValue => {
                                        setDay(nextValue);
                                        setDate(null)
                                    }}>
                                        <Radio value={7} my={1}>
                                            7 ngày trước
                                        </Radio>
                                        <Radio value={30} my={1}>
                                            30 ngày trước
                                        </Radio>

                                    </Radio.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button flex="1" onPress={() => {
                                        getOrders();
                                        setModalVisible(false)
                                    }} className="bg-[#FF0000]" >
                                        Áp dụng bộ lọc
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
                tabBarInactiveTintColor: "#184E17",

                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                },
                headerStyle: {
                    backgroundColor: '#F78F43',

                },


                headerTitleAlign: 'left',
                headerLeft: (props) => (
                    <HeaderBackButton labelStyle={{ marginLeft: 0, color: 'white' }}
                        {...props}
                        onPress={() => {
                            if (navigation.canGoBack()) {
                                navigation.goBack();
                            }
                            else {
                                navigation.navigate('HomeShipper')
                            }
                        }}
                    />
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