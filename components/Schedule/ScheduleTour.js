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
import { Picker } from '@react-native-picker/picker';
import CopyOutline from '../Svg/CopyOutline';
import Clipboard from '@react-native-community/clipboard';
import Arrow from '../Svg/Arrow';
const ScheduleTour = ({ navigation, route }) => {
    const user = useSelector(state => state.auth.user);
    const [quantity, setQuantity] = useState(1)
    const [quantityChildren, setQuantityChildren] = useState(1)
    const [code, setCode] = useState('HKS' + user?.id + Math.floor(Math.random() * 1000))
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
        if (productOwnersActive.length == 0) {
            Toast.show({
                type: 'error',
                text1: 'Chưa có gói hoạt động nào kích hoạt!',
                position: 'bottom',

            });
            return
        }
        const form = {
            date_time: date,
            number_adult: quantity,
            number_children: quantityChildren,
            product_service_owner_id: productOwner,
            code: code
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
    const copyToClipboard = (value) => {
        Clipboard.setString(value);
        Toast.show({
            type: 'info',
            text1: 'Đã lưu vào bộ nhớ tạm!',
            position: 'bottom',


        });
    };
    return (

        <SafeAreaView style={styles.container}>
            <Spinner
                visible={spinner}
                textContent={'Vui lòng đợi...'}
                textStyle={styles.spinnerTextStyle}
            />
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >

                <Box className="my-5 mb-[140] mx-5 pb-5 ion-padding">
                    <Box className=" h-full ">
                        <Box className="my-2">
                            <Box className="w-full">
                                <Flex direction='row' className="flex justify-between">
                                    <Heading size="sm" className="color-[#FF6100] font-medium my-1">Mã đặt lịch tham quan</Heading>

                                    <Flex direction='row' className=" items-center">
                                        <Text className=" font-inter mr-2 text-[13px] text-[#AEAEAE] leading-4" >{code}</Text>
                                        <PressableOpacity className="leading-4" onPress={() => copyToClipboard(code)}>
                                            <CopyOutline size={11} color="#AEAEAE" />
                                        </PressableOpacity>

                                        {/* <Icon name="copy-outline" size={16} color="#686868" /> */}
                                    </Flex>

                                </Flex>
                                <Box className="mt-2">

                                    <Flex className="py-1.5 rounded-lg flex relative">
                                        <PressableOpacity onPress={showDatepicker}>
                                            <Flex direction='row' className="justify-between bg-white p-[16px] rounded-[5px] mb-2" >
                                                <Text className="text-[#184E17] text-[16px] font-medium"> {formatOnlyDate(date)}</Text>
                                                {/* <Calendar
                                                    size="24"
                                                    color="#FF8A65"
                                                /> */}
                                            </Flex>

                                        </PressableOpacity>
                                        <PressableOpacity onPress={showTimepicker}>

                                            <Flex direction='row' className="justify-between mt-2 bg-white p-[16px] rounded-[5px]" >
                                                <Text className="text-[#184E17] text-[16px] font-medium"> {formatTime(date)}</Text>
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
                                <Box className="" >
                                    <Heading size="sm" className="color-[#FF6100] mt-2 mb-4">Hoạt động theo gói </Heading>
                                    {/* <Box maxW="500" class="bg-white">
                                        <Select class="bg-white" selectedValue={productOwner} minWidth="100" accessibilityLabel="Chọn gói dịch vụ" placeholder="Chọn gói dịch vụ " _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size="1" />
                                        }} mt={1} onValueChange={itemValue => setProductOwner(itemValue)}>

                                            {productOwnersActive.map((item, key) =>
                                                <Select.Item key={item.id} label={item?.product?.name} value={item.id} />)}
                                        </Select>
                                    </Box> */}

                                    {productOwnersActive.length > 0 ?
                                        <Box className=" bg-white border-[#AEAEAE] rounded-[5px] font-bold" >
                                            <Picker
                                                itemStyle={{
                                                    fontSize: 15,
                                                    fontFamily: 'Inter-Bold',
                                                }}
                                                dropdownIconColor={'#184E17'}
                                                selectedValue={productOwner}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    setProductOwner(itemValue)
                                                }>

                                                {productOwnersActive.map((item, key) =>
                                                    <Picker.Item key={item.id} color="#184E17" style={styles.dropdownStyle} label={item?.product?.name} value={item.id} />)}


                                            </Picker>
                                        </Box>
                                        : <Text className="text-red-600 font-bold">Chưa có gói được kích hoạt</Text>}
                                    <ErorrValidator errors={errors} key_error={'product_service_owner_id'} />

                                </Box>


                                <Box className="my-5 bg-[#F0F0F0] rounded-lg">
                                    <Heading size="sm" className="color-[#FF6100] my-1">Số lượng </Heading>
                                    <Flex direction='row' className=" justify-between ">
                                        <Flex direction='row' className=" items-center">
                                            <User
                                                size="20"
                                                color="#184E17"
                                            />
                                            <Text className="ml-3 text-[#184E17] font-normal ">Người lớn</Text>
                                        </Flex>
                                        <Flex direction='row' >
                                            <NumericInput
                                                value={quantity}
                                                onChange={value => setQuantity(value)}
                                                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                                totalWidth={60}
                                                totalHeight={40}
                                                iconSize={16}
                                                step={1}
                                                minValue={1}
                                                valueType='real'
                                                rounded
                                                textColor='#184E17'
                                                iconStyle={{ color: '#FF6100' }}
                                                borderColor='#F0F0F0'
                                                rightButtonBackgroundColor='transparent'
                                                leftButtonBackgroundColor='transparent' />

                                        </Flex>

                                    </Flex>
                                    <ErorrValidator errors={errors} key_error={'number_adult'} />
                                    <Flex direction='row' className=" justify-between">
                                        <Flex direction='row' className=" items-center">
                                            <User
                                                size="20"
                                                color="#184E17"
                                            />
                                            <Text className="ml-3 font-normal  text-[#184E17]">Trẻ em</Text>
                                        </Flex>
                                        <Flex direction='row' >
                                            <NumericInput
                                                value={quantityChildren}
                                                onChange={value => setQuantityChildren(value)}
                                                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                                totalWidth={60}
                                                totalHeight={40}
                                                iconSize={16}
                                                step={1}
                                                valueType='real'
                                                rounded
                                                minValue={1}
                                                textColor='#184E17'
                                                iconStyle={{ color: '#FF6100' }}
                                                borderColor='#F0F0F0'
                                                rightButtonBackgroundColor='transparent'
                                                leftButtonBackgroundColor='transparent' />
                                        </Flex>
                                    </Flex>
                                </Box>
                                <Box className="my-0 bg-[#F0F0F0] ">
                                    {/* <Heading size="sm" className="color-[#FF6100]">Ghi chú</Heading> */}
                                    <TextArea value={textAreaValue} w="100%" h="110" placeholder="Ghi chú"
                                        borderRadius={10}
                                        maxW="500"
                                        onChangeText={text => setTextAreaValue(text)} // for android and ios
                                    />
                                </Box>

                            </Box>
                        </Box>

                        

                    </Box >
                </Box >

            </ScrollView>
            <Button onPress={() => saveSchedule()} className="absolute mx-5 w-[90%] my-[87px] bottom-0  px-2 py-3 text-white  bg-[#FF6100] rounded-[10px] btn_button"
                        ><Text className="text-white text-[16px]">Xác nhận đặt chỗ</Text></Button>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1
    },
    dropdownStyle: {
        fontWeight: 'bold',
        padding: '5px',
        fontFamily: 'Inter-Bold'
    }
})


export default ScheduleTour;