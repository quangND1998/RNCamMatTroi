import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Flex, Text, Select, CheckIcon, TextArea, Box, Stack, Input, SearchBar, Icon, Spacer, ZStack, Image, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector, } from 'react-redux'
import { EmojiHappy, User, Calendar, Timer1 } from 'iconsax-react-native';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker'
import NumericInput from 'react-native-numeric-input';
import { useHelper } from '../../helpers/helper';
import { PressableOpacity } from 'react-native-pressable-opacity';
import { fetchProductOwners, getProductDetail } from '../../store/actions/productService';
import { selectProductOwnersActive } from '../../store/reducers/productService';
import Spinner from 'react-native-loading-spinner-overlay';
import { createSchedule } from '../../store/actions/schedule';
import Toast from 'react-native-toast-message';
import ErorrValidator from '../ErorrValidator';
import { fetchProductDetail } from '../../store/actions/productRetail';
const ScheduleTour = ({ navigation, route }) => {
    const [quantity, setQuantity] = useState(1)
    const [quantityChildren, setQuantityChildren] = useState(1)
    const [textAreaValue, setTextAreaValue] = useState(null);
    const [productOwner, setProductOwner] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const { formatTime, formatDate, formatOnlyDate } = useHelper();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const productOwnersActive = useSelector(selectProductOwnersActive)
    const productOwners = useSelector(state => state.productService.productOwners)
    const [spinner, setSpinner] = useState(false)
    const errors = useSelector(state => state.schedule.errors)
    const itemId = route.params?.itemId ? route.params?.itemId : null;
    const productDetail = useSelector(state => state.productService.productDetail)


    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            (async () => {
                getProductOwner();
                if (itemId && itemId !== undefined) {
                    getProductOwnerDetail(itemId);
                }
                if (productOwnersActive && productOwnersActive.length > 0) {
                    setProductOwner(productOwnersActive[0].id)
                }
                dispatch({
                    type: 'clearError'
                })
            })();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);


    const getProductOwner = () => {
        dispatch(fetchProductOwners());
    }

    const getProductOwnerDetail = () => {
        dispatch(getProductDetail(itemId,
            (data) => {
                if (data?.product_detail && data?.product_detail.state == 'active' && itemId) {
                    setProductOwner(data?.product_detail.id)
                }
            },
            () => {
            }));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {

            setRefreshing(false);
        }, 2000);
    }, []);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        console.log('date')
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    const saveSchedule = () => {
        const form = {
            date_time: date,
            number_adult: quantity + quantityChildren,
            product_service_owner_id: productOwner
        }
        setSpinner(true);
        dispatch(createSchedule(form,
            (msg) => {
                Toast.show({
                    type: 'success',
                    text1: msg,

                    position: 'bottom'
                });
                setSpinner(false);
                navigation.navigate('ScheduleSuccess')
            },
            (error) => {
                Toast.show({
                    type: 'error',
                    text1: 'Lỗi!',
                    text2: error,
                    position: 'bottom',
                    visibilityTime: 3000
                });
                setSpinner(false);
            },
        ));
    }

    return (

        <SafeAreaView style={styles.container}>
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >

                <Box className="my-5 mx-5 pb-5 ion-padding">
                    <Box className=" h-full ">
                        <Box className="my-4">
                            <Box className="w-full">
                                <Flex className="flex justify-between">
                                    <Heading size="sm" className="color-[#FF6100]">Mã đặt lịch tham quan</Heading>
                                </Flex>
                                <Box className="my-5">

                                    <Flex className="bg-[#EDEEF0] py-1.5 rounded-lg flex relative">
                                        <PressableOpacity onPress={showDatepicker}>
                                            <Flex direction='row' className="justify-between bg-white px-2 py-3 rounded-xl mb-2" >
                                                <Text className="text-[#184E17]"> {formatOnlyDate(date)}</Text>
                                                {/* <Calendar
                                                    size="24"
                                                    color="#FF8A65"
                                                /> */}
                                            </Flex>

                                        </PressableOpacity>
                                        <PressableOpacity onPress={showTimepicker}>

                                            <Flex direction='row' className="justify-between bg-white px-2 py-3 rounded-xl" >
                                                <Text className="text-[#184E17]"> {formatTime(date)}</Text>
                                                {/* <Timer1
                                                    size="24"
                                                    color="#FF8A65"
                                                /> */}
                                            </Flex>

                                        </PressableOpacity>



                                        {show && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={date}
                                                textColor="red"
                                                mode={mode}
                                                is24Hour={true}
                                                onChange={onChange}
                                            />
                                        )}

                                        <ErorrValidator errors={errors} key_error={'date_time'} />
                                        <Box className="absolute bottom-0 px-2.5 py-1.5 right-0">

                                        </Box>

                                    </Flex>

                                </Box>
                                {productOwnersActive ? <Box className="my-5" >
                                    <Heading size="sm" className="color-[#FF6100]">Hoạt động theo gói </Heading>
                                    <Box maxW="500">
                                        <Select selectedValue={productOwner} minWidth="100" accessibilityLabel="Chọn gói dịch vụ" placeholder="Chọn gói dịch vụ " _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size="1" />
                                        }} mt={1} onValueChange={itemValue => setProductOwner(itemValue)}>

                                            {productOwnersActive.map((item, key) =>
                                                <Select.Item key={item.id} label={item?.product?.name} value={item.id} />)}
                                        </Select>
                                    </Box>

                                    <ErorrValidator errors={errors} key_error={'product_service_owner_id'} />
                                </Box> : null}


                                <Box className="my-5 bg-[#F0F0F0] rounded-lg">
                                    <Heading size="sm" className="color-[#FF6100]">Số lượng {productOwnersActive ? productOwnersActive.title : null}</Heading>
                                    <Flex direction='row' className=" justify-between my-2">
                                        <Flex direction='row' className=" items-center">
                                            <User
                                                size="24"
                                                color="#184E17"
                                            />
                                            <Text className="ml-3">Người lớn</Text>
                                        </Flex>
                                        <Flex direction='row' >
                                            <NumericInput
                                                value={quantity}
                                                onChange={value => setQuantity(value)}
                                                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                                totalWidth={120}
                                                totalHeight={40}
                                                iconSize={16}
                                                step={1}
                                                minValue={1}
                                                valueType='real'
                                                rounded
                                                textColor='#184E17'
                                                iconStyle={{ color: '#FF6100' }}
                                                rightButtonBackgroundColor='transparent'
                                                leftButtonBackgroundColor='transparent' />

                                        </Flex>

                                    </Flex>
                                    <ErorrValidator errors={errors} key_error={'number_adult'} />
                                    <Flex direction='row' className=" justify-between my-2">
                                        <Flex direction='row' className=" items-center">
                                            <User
                                                size="24"
                                                color="#184E17"
                                            />
                                            <Text className="ml-3">Trẻ em</Text>
                                        </Flex>
                                        <Flex direction='row' >
                                            <NumericInput
                                                value={quantityChildren}
                                                onChange={value => setQuantityChildren(value)}
                                                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                                totalWidth={120}
                                                totalHeight={40}
                                                iconSize={16}
                                                step={1}
                                                valueType='real'
                                                rounded
                                                minValue={1}
                                                textColor='#184E17'
                                                iconStyle={{ color: '#FF6100' }}
                                                rightButtonBackgroundColor='transparent'
                                                leftButtonBackgroundColor='transparent' />
                                        </Flex>
                                    </Flex>
                                </Box>
                                <Box className="my-5 bg-[#F0F0F0] rounded-lg">
                                    <Heading size="sm" className="color-[#FF6100]">Ghi chú</Heading>
                                    <TextArea value={textAreaValue} w="100%" placeholder="Ghi chú" className="bg-white"
                                        maxW="500"
                                        onChangeText={text => setTextAreaValue(text)} // for android and ios
                                    />
                                </Box>

                            </Box>
                        </Box>
                        <Button onPress={() => saveSchedule()} className="w-full  text-white bg-[#FF6100] rounded-xl btn_button"
                        >Xác nhận đặt chỗ</Button>


                    </Box >
                </Box >
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1
    }
})


export default ScheduleTour;