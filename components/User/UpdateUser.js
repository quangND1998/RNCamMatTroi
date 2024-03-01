import React, { useState, useEffect, useMemo, useRef } from 'react';
import { LogBox, Dimensions } from 'react-native';
import { StyleSheet, TextInput, TouchableOpacity, Linking, Keyboard, View, Alert, SafeAreaView, ScrollView, Platform, RefreshControl } from 'react-native';
import { Center, Container, Heading, Button, Text, Flex, Box, Radio, TextArea, Stack, Select, CheckIcon, Input, SearchBar, Image, Icon, Spacer, ZStack, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData, logoutAction, saveInforChange } from '../../store/actions/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import _ from "lodash";
import { PressableOpacity } from 'react-native-pressable-opacity';
import * as RNImagePicker from 'expo-image-picker'
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';
import ErorrValidator from '../ErorrValidator';
import { formatPhoneNumberIntl, isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useHelper } from '../../helpers/helper';
import { Camera, CameraType, Constants, FlashMode, } from 'expo-camera';
import { CONTENT_SPACING, CONTROL_BUTTON_SIZE, SAFE_AREA_PADDING } from '../QrCode/Constants'
import { LampOn, LampSlash, Image as ImageIcon, ArrowLeft2, Camera as CameraIcon, ArrowDown2 } from 'iconsax-react-native';
import { Picker } from '@react-native-picker/picker';

import Arrow from '../Svg/Arrow';
import UploadAvatar from './UploadAvatar';
// import { TextInput } from 'react-native-gesture-handler';

const UpdateUser = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [type, setType] = useState(CameraType.front);
    const user = useSelector(state => state.auth.user)
    const [spinner, setSpinner] = useState(false)
    const [refreshing, setRefreshing] = React.useState(false);
    const [provinces, setProvinces] = useState(null)
    const [value, setPhoneNumber] = useState(user ? user.phone_number : '')
    const [show, setShow] = useState(false);
    const [showCicDate, setShowCicDate] = useState(false);
    const [showCicDateExpried, setshowCicDateExpried] = useState(false);
    const { formatOnlyDate, checkInValid, checkIsImage } = useHelper();
    const errors = useSelector(state => state.auth.errors);
    const isCamera = useSelector(state => state.auth.isCamera);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const photo = useSelector(state => state.auth.photo)
    const cameraRef = useRef(null);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [form, setForm] = useState({
        name: user ? user.name : null,
        phone_number: user ? user.phone_number : null,
        email: user ? user.email : null,
        address: user ? user.address : null,
        sex: user ? user.sex : 'male',
        district: user ? user.district : null,
        wards: user ? user.wards : null,
        city: user ? user.city : null,
        cic_number: user ? user.cic_number : null,
        cic_date: user ? user.date_of_birth ? (new Date(user.cic_date)) : new Date() : null,
        cic_date_expried: user ? user.date_of_birth ? (new Date(user.cic_date_expried)) : new Date() : null,
        date_of_birth: user ? user.date_of_birth ? (new Date(user.date_of_birth)) : new Date() : null
    })
    const getProvinces = async () => {
        const response = await fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
        const jsonData = await response.json();
        setProvinces(jsonData)
    };
    useEffect(() => {
        getProvinces();
        console.log(form)
    }, [])
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            (async () => {
                fetchUser();
                dispatch({
                    type: 'setPhoto',
                    payload: null
                })
            })();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    const districts = useMemo(() => {
        if (form.city == null) {
            return [];
        } else {
            if (provinces) {
                return provinces.find(pro => {
                    return pro.Name == form.city;
                });
            }
            return []

        }
    }, [form.city])

    const wards = useMemo(() => {

        if (form.city == null && form.district == null) {
            return null;
        } else if (form.city !== null && form.district == null) {
            return null;
        } else if (form.city && form.district) {
            if (provinces) {

                if (districts) {
                    console.log('districts', districts)
                    return districts.Districts.find(district => {
                        return district.Name == form.district;
                    });
                }
                return null

            }
            return null
        }
    }, [form.city, form.district, districts])
    const fetchUser = async () => {
        dispatch({
            type: 'clearOtpError'
        })
        dispatch(fetchUserData(
            (user) => {
                // console.log(user)
                if (user) {
                    setForm(prevState => {
                        return {
                            ...prevState,
                            name: user ? user.name : null,
                            phone_number: user ? user.phone_number : null,
                            email: user ? user.email : null,
                            address: user ? user.address : null,
                            sex: user ? user.sex : 'male',
                            district: user ? user.district : null,
                            wards: user ? user.wards : null,
                            city: user ? user.city : null,
                            cic_number: user ? user.cic_number : null,
                            cic_date: user ? user.date_of_birth ? (new Date(user.cic_date)) : new Date() : null,
                            cic_date_expried: user ? user.date_of_birth ? (new Date(user.cic_date_expried)) : new Date() : null,
                            date_of_birth: user ? user.date_of_birth ? (new Date(user.date_of_birth)) : new Date() : null
                        }
                    })
                }

            },
            () => {

            }
        ))
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchUser();

            setRefreshing(false);
        }, 2000);


    }, []);
    const updateUserInfo = () => {

        const phone = parsePhoneNumber(form.phone_number, "VN").formatNational();

        const formData = new FormData();

        // for (var i = 0; i < images.length; i++) {
        //     let localUri = images[i].uri;
        //     let filename = localUri.split('/').pop();
        //     console.log(localUri)
        //     // Infer the type of the image
        //     let match = /\.(\w+)$/.exec(filename);
        //     console.log(match[1])
        //     let type = match ? `image/${match[1]}` : `image`;
        //     formData.append('images[' + i + ']', { uri: localUri, name: filename, type });
        // }
        formData.append('name', form.name);
        formData.append('cic_number', form.cic_number);
        formData.append('email', form.email);
        formData.append('phone_number', phone);
        formData.append('sex', form.sex);
        formData.append('address', form.address);
        formData.append('city', form.city);
        formData.append('wards', form.wards);
        formData.append('district', form.district);
        formData.append('date_of_birth', (new Date(form.date_of_birth)).toISOString());
        formData.append('cic_date', (new Date(form.cic_date)).toISOString());
        formData.append('cic_date_expried', (new Date(form.cic_date_expried)).toISOString());
        if (photo) {
            let localUri = photo;
            let filename = localUri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            console.log(match[1])
            let type = match ? `image/${match[1]}` : `image`;
            formData.append('image', { uri: localUri, name: filename, type });
        }
        console.log(formData)
        if (form.phone_number && isValidPhoneNumber(form.phone_number, "VN")) {
            setSpinner(true)
            dispatch(saveInforChange(formData, (message) => {
                Toast.show({
                    type: 'success',
                    text1: message,
                    position: 'bottom'
                });
                setSpinner(false)

            }, (error) => {
                setSpinner(false)
                Toast.show({
                    type: 'error',
                    text1: 'Lỗi!',
                    text2: error,
                    position: 'bottom',
                    visibilityTime: 3000
                });
            }))
        }

    }




    const alertsaveUserInfor = () =>
        Alert.alert('Cập nhật thông tin tài khoản!', 'Thông tin tài khoản sẽ được lưu lại và thay đổi khi được duyệt', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {

                    updateUserInfo()
                }

            },
        ]);

    return (
        isCamera ? <UploadAvatar /> : <SafeAreaView  >
            <Spinner
                visible={spinner}
                textContent={'Vui lòng đợi...'}
                textStyle={styles.spinnerTextStyle}
            />
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <Box className="mb-[77px] lg:w-[70%] lg:mx-[15%]">
                    <Box className="w-full">
                        <Box className="my-10 mt-14 w-full ">
                            <Box className="relative">

                                {photo ? <Image source={{ uri: photo }} className="rounded-full m-auto h-28 w-28 " alt="avt"></Image>
                                    : checkIsImage(user?.profile_photo_url) == true ? <Image source={{ uri: user?.profile_photo_url }} className="rounded-full m-auto h-28 w-28 " alt="avt"></Image> : <Image source={require("../../assets/images/avt.png")} className="rounded-full m-auto h-28 w-28 " alt="avt"></Image>}

                                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                    <Box className="m-[12px] ">
                                        <PressableOpacity onPress={() => dispatch({ type: 'openCamera', payload: true })} className="bg-white w-10 h-10  absolute  rounded-full shadow-xl" style={styles.shadowLogin}>
                                            <Image source={require("../../assets/icon/camera.png")} resizeMode="contain" className=" m-auto w-[17] h-[18] " alt="avt"></Image>
                                        </PressableOpacity>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="mt-6">
                                <Text className="text-[20px] font-bold text-center mt-5">{user?.name}</Text>
                                <Text className="text-[13px] text-[#184E17] text-center my-1">{user?.email}</Text>
                                {user?.infor?.status == 0 ? <Text className="text-[10px] text-[#FF6100] text-center">Đang chờ xét duyệt</Text> : null}
                            </Box>

                        </Box>
                    </Box>
                    <Box className="mx-4 px-2 my-2">
                        <Box className="w-full">
                            <Text bold className="text-[18px] mb-5  ">Thông tin liên hệ </Text>
                            {/* <Box className=" ">
                                <Text className="block mb-2 text-[13px]  text-[#184E17] ">Họ</Text>
                                <TextInput type="text" isInvalid={checkInValid(errors, 'name') ? true : false} value={form.name} onChangeText={(value) => setForm(prevState => {
                                    return { ...prevState, name: value }
                                })}
                                    className=" border border-[#AEAEAE] text-gray-900 text-sm rounded-[10px] px-3 py-1.5 block w-full "
                                    placeholder="" required></TextInput>
                                <Box className="text-red-500 text-[11px]" >
                                    <ErorrValidator errors={errors} key_error={'name'} />
                                </Box>
                            </Box> */}
                            <Box className="my-4 ">
                                <Text className="block mb-2 text-[13px]  text-[#184E17] ">Họ và tên </Text>
                                <TextInput type="text" isInvalid={checkInValid(errors, 'name') ? true : false} value={form.name} onChangeText={(value) => setForm(prevState => {
                                    return { ...prevState, name: value }
                                })}
                                    className=" border border-[#AEAEAE] text-gray-900 text-sm  rounded-[10px] px-3 py-1.5 block w-full "
                                    placeholder="" required></TextInput>
                                <Box className="text-red-500 text-[11px]" >
                                    <ErorrValidator errors={errors} key_error={'name'} />
                                </Box>
                            </Box>

                            <Flex direction='column' className="my-1">
                                <Text className="text-[#184E17] text-[13px] mt-">Giới tính</Text>
                                <Box className="mt-2">
                                    <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={form.sex} onChange={nextValue => {
                                        setForm(prevState => {
                                            return { ...prevState, sex: nextValue }
                                        })
                                    }}>
                                        <Stack direction={{
                                            base: "row",
                                            md: "row"
                                        }} alignItems={{
                                            base: "flex-wrap",
                                            md: "center"
                                        }} space={10} w="75%" >
                                            <Radio value="male" color="orange" colorScheme="orange" my={3} size="3">
                                                <Text className="text-[#184E17] text-[13px]">Nam</Text>
                                            </Radio>
                                            <Radio value="female" colorScheme="orange" my={3} size="3" >
                                                <Text className="text-[#184E17] text-[13px]">Nữ</Text>
                                            </Radio>
                                            <Radio value="khác" colorScheme="orange" my={3} size="3">
                                                <Text className="text-[#184E17] text-[13px]">Khác</Text>
                                            </Radio>

                                        </Stack>

                                    </Radio.Group>
                                    <ErorrValidator errors={errors} key_error={'sex'} />
                                </Box>
                            </Flex>
                            <Box className="my-1">
                                <Text className="my-1 text-[#184E17] text-[13px]">Số điện thoại </Text>
                                <TextInput keyboardType="phone-pad" value={form.phone_number} isInvalid={checkInValid(errors, 'phone_number') ? true : false} onChangeText={(value) => setForm(prevState => {
                                    return { ...prevState, phone_number: value }
                                })}
                                    className="border border-[#AEAEAE] text-gray-900 text-sm rounded-[10px] px-3 py-1.5 block w-full"
                                    placeholder="" required></TextInput>
                                {form.phone_number == null ?
                                    <Box>

                                    </Box>
                                    : <Box>

                                        {isValidPhoneNumber(form.phone_number, 'VN') ? null : <Text className="text-red-500 ml-12 mt-2 text-xs" >Số điện thoại không hợp lệ </Text>}
                                    </Box>
                                }
                                <ErorrValidator errors={errors} key_error={'phone_number'} />
                            </Box>
                            <Box className="my-2">
                                <Text className="block mb-2 text-[13px]  text-[#184E17] ">Email</Text>
                                <TextInput type="text" isInvalid={checkInValid(errors, 'email') ? true : false} value={form.email} onChangeText={(value) => setForm(prevState => {
                                    return { ...prevState, email: value }
                                })}
                                    className="border border-[#AEAEAE] text-gray-900 text-sm rounded-[10px] px-3 py-1.5 block w-full"
                                    placeholder="" required></TextInput>
                                <ErorrValidator errors={errors} key_error={'email'} />
                            </Box>

                            <Box className="mt-1">
                                <Text className="my-1 text-[#184E17] text-[13px]">Địa chỉ</Text>
                                <TextInput type="text" isInvalid={checkInValid(errors, 'address') ? true : false} value={form.address} onChangeText={(value) => {
                                    setForm(prevState => {
                                        return { ...prevState, address: value }
                                    });

                                }}
                                    size="xl"
                                    className="border border-[#AEAEAE] text-gray-900 text-sm rounded-[10px] px-3 py-1.5 block w-full"
                                    placeholder="" required></TextInput>
                                <ErorrValidator errors={errors} key_error={'address'} />
                            </Box>
                            <Box className="mt-2">
                                {provinces ? <Box >
                                    <Text className="text-[#184E17] my-1 text-[13px] w-full">Tỉnh/ Thành phố</Text>
                                    <Box className="">
                                        <Select size="16" className="rounded-xl"
                                            dropdownIcon={<Box className="mr-2">
                                                <Arrow color="#FF6100" width={13} height={6} />
                                            </Box>
                                            } isInvalid={checkInValid(errors, 'city') ? true : false} selectedValue={form.city} minWidth="100" accessibilityLabel="Chọn Tính/ Thành phố" placeholder="Chọn Tính/ Thành phố"
                                            _selectedItem={{
                                                bg: "#FF6100",
                                                color: 'white',
                                                rightIcon: <CheckIcon size="5" color="white" />
                                            }}
                                            mt={1}
                                            borderRadius={10}
                                            borderColor={'#AEAEAE'}
                                            color={'#184E17'}
                                            padding={1.5}
                                            onValueChange={itemValue => {
                                                setForm(prevState => {
                                                    return { ...prevState, city: itemValue }
                                                });
                                                setForm(prevState => {
                                                    return { ...prevState, district: null }
                                                });
                                                setForm(prevState => {
                                                    return { ...prevState, wards: null }
                                                })
                                            }}>

                                            {provinces.map((item, index) =>
                                                <Select.Item key={index} label={item.Name} value={item.Name} />)}
                                        </Select>
                                    </Box>
                                </Box> : null}
                                <ErorrValidator errors={errors} key_error={'city'} />
                            </Box>
                            <Box className="mt-2">
                                <Box >
                                    <Text className="text-[#184E17] my-1 text-[13px]">Quận/ Huyện</Text>
                                    <Box m>
                                        <Select size="16"
                                            dropdownIcon={<Box className="mr-2">
                                                <Arrow color="#FF6100" width={13} height={6} />
                                            </Box>
                                            } isInvalid={checkInValid(errors, 'district') ? true : false} selectedValue={form.district} minWidth="100" accessibilityLabel="Chọn Quận/ Huyện" placeholder="Chọn Quận/ Huyện"
                                            _selectedItem={{
                                                bg: "#FF6100",
                                                rightIcon: <CheckIcon size="5" color="white" />
                                            }}
                                            mt={1}
                                            borderRadius={10}
                                            borderColor={'#AEAEAE'}
                                            color={'#184E17'}
                                            padding={1.5}
                                            onValueChange={itemValue => setForm(prevState => {
                                                return { ...prevState, district: itemValue }
                                            })}>
                                            {districts.Districts ? districts.Districts.map((item, index) =>
                                                <Select.Item key={index} label={item.Name} value={item.Name} />)
                                                : null}
                                        </Select>
                                    </Box>

                                    {/* <ErorrValidator errors={errors} key_error={'product_service_owner_id'} /> */}
                                </Box>
                                <ErorrValidator errors={errors} key_error={'district'} />
                            </Box>
                            <Box className="mt-2 mb-2">
                                <Box >
                                    <Text className="text-[#184E17] my-1 text-[13px]">Xã/ Phường</Text>
                                    <Box >
                                        <Select size="16" dropdownIcon={<Box className="mr-2">
                                            <Arrow color="#FF6100" width={13} height={6} />
                                        </Box>
                                        } isInvalid={checkInValid(errors, 'wards') ? true : false} selectedValue={form.wards} minWidth="200"
                                            accessibilityLabel="Chọn Xã/ Phường"
                                            placeholder="Chọn Xã/ Phường"
                                            _selectedItem={{
                                                bg: "#FF6100",
                                                rightIcon: <CheckIcon size="5" color="white" />
                                            }}
                                            borderRadius={10}
                                            borderColor={'#AEAEAE'}
                                            color={'#184E17'}
                                            padding={1.5}
                                            onValueChange={itemValue => setForm(prevState => {
                                                return { ...prevState, wards: itemValue }
                                            })}>
                                            {wards?.Wards ? wards.Wards.map((item, index) =>
                                                <Select.Item key={index} label={item.Name} value={item.Name} />)
                                                : null}
                                        </Select>
                                    </Box>

                                    {/* <ErorrValidator errors={errors} key_error={'product_service_owner_id'} /> */}
                                </Box>
                                <ErorrValidator errors={errors} key_error={'wards'} />
                            </Box>
                        </Box>
                    </Box>
                    {/* <Box className="mx-4 px-2 my-2 ">
                        <Box className="w-full">
                            <Text bold className="text-[17px] mb-4 text-[13px]">Thông tin giấy tờ</Text>

                            <Box class="my-5 mt-4 ">
                                <Text className="block mb-2 text-sm  text-[#184E17] ">Giấy tờ tùy thân (CMT/CCCD)</Text>
                                <Input size="xl" type="text" isInvalid={checkInValid(errors, 'cic_number') ? true : false} value={form.cic_number} onChangeText={(value) => setForm(prevState => {
                                    return { ...prevState, cic_number: value }
                                })}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    placeholder="" required></Input>
                                <Box class="text-red-500 text-[11px]" >
                                    <ErorrValidator errors={errors} key_error={'cic_number'} />
                                </Box>
                            </Box>


                            <Box className="my-2">
                                <Text className="block mb-2 text-[13px] text-[#184E17] ">Ngày sinh</Text>
                                <PressableOpacity onPress={() => setShow(true)}>
                                    <Flex direction='row' className={`justify-between border border-0.5 bg-[#F0F0F0] px-1.5 py-2.5 rounded-md mb-2 ${checkInValid(errors, 'date_of_birth') ? 'border border-red-500' : ''}`} >
                                        <Text className="text-[#184E17]"> {formatOnlyDate(form.date_of_birth)}</Text>
                                    </Flex>

                                </PressableOpacity>
                                {show && (
                                    <DateTimePicker
                                        testID="date_of_birthPicker"
                                        value={form.date_of_birth}
                                        textColor="red"
                                        mode='date'
                                        is24Hour={true}
                                        onChange={(event, selectedDate) => {
                                            setShow(false);
                                            setForm(prevState => {
                                                return { ...prevState, date_of_birth: selectedDate }
                                            })

                                        }}
                                    />
                                )}
                                <ErorrValidator errors={errors} key_error={'date_of_birth'} />
                            </Box>
                            <Box className="my-2">
                                <Text className="my-1 text-[#184E17] text-[13px]">Ngày cấp</Text>
                                <PressableOpacity onPress={() => setShowCicDate(true)}>
                                    <Flex direction='row' className={`justify-between border border-0.5 bg-[#F0F0F0] px-1.5 py-2.5 rounded-md mb-2 ${checkInValid(errors, 'cic_date') ? 'border border-red-500' : ''}`} >
                                        <Text className="text-[#184E17]"> {formatOnlyDate(form.cic_date)}</Text>
                                    </Flex>

                                </PressableOpacity>
                                {showCicDate && (
                                    <DateTimePicker
                                        testID="date_cicPicker"
                                        value={form.cic_date}
                                        textColor="red"
                                        mode='date'
                                        is24Hour={true}
                                        onChange={(event, selectedDate) => {
                                            setShowCicDate(false);
                                            setForm(prevState => {
                                                return { ...prevState, cic_date: selectedDate }
                                            })

                                        }}
                                    />
                                )}
                                <ErorrValidator errors={errors} key_error={'cic_date'} />
                            </Box>
                            <Box className="my-2">
                                <Text className="my-1 text-[#184E17] text-[13px]">Có giá trị đến</Text>
                                <PressableOpacity onPress={() => setshowCicDateExpried(true)}>
                                    <Flex direction='row' className={`justify-between border border-0.5 bg-[#F0F0F0] px-1.5 py-2.5 rounded-md mb-2 ${checkInValid(errors, 'cic_date_expried') ? 'border border-red-500' : ''}`} >
                                        <Text className="text-[#184E17]"> {formatOnlyDate(form.cic_date_expried)}</Text>
                                    </Flex>

                                </PressableOpacity>
                                {showCicDateExpried && (
                                    <DateTimePicker
                                        testID="date_cic_expriedPicker"
                                        value={form.cic_date_expried}
                                        textColor="red"
                                        mode='date'
                                        is24Hour={true}
                                        onChange={(event, selectedDate) => {
                                            setshowCicDateExpried(false);
                                            setForm(prevState => {
                                                return { ...prevState, cic_date_expried: selectedDate }
                                            })

                                        }}
                                    />
                                )}
                                <ErorrValidator errors={errors} key_error={'cic_date_expried'} />
                            </Box>

                        </Box>
                    </Box> */}
                    {form.phone_number && isValidPhoneNumber(form.phone_number, "VN") ? <Button onPress={alertsaveUserInfor}
                        className=" bottom-0  w-[90%] ml-[5%]  mr-[5%] mt-2 mb-2 px-4 py-[10px] lg:w-[94%] lg:mx-[3%] text-white bg-[#FF6100] rounded-[10px] " style={styles.btn_button}>
                        <Text className="text-white items-center text-center">Lưu</Text>
                    </Button> : null
                    }
                </Box>
            </ScrollView >


        </SafeAreaView >



    );
}


const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        margin: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000000' // the rock-solid workaround
    },
    cameraContainer: {
        marginHorizontal: 0, marginLeft: 0, marginStart: 0,
        paddingHorizontal: 0, paddingLeft: 0, paddingStart: 0,
        height: '115%',
        padding: 0
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    button: {
        marginBottom: CONTENT_SPACING,
        width: CONTROL_BUTTON_SIZE,
        height: CONTROL_BUTTON_SIZE,
        borderRadius: CONTROL_BUTTON_SIZE / 2,
        backgroundColor: 'rgba(140, 140, 140, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightButtonRow: {
        position: 'absolute',
        right: SAFE_AREA_PADDING.paddingRight,
        bottom: SAFE_AREA_PADDING.paddingTop,
    },
    topButtonRow: {
        position: 'absolute',
        top: SAFE_AREA_PADDING.paddingTop,
        left: SAFE_AREA_PADDING.paddingLeft,
    },
    rightTopButtonRow: {
        position: 'absolute',
        top: SAFE_AREA_PADDING.paddingTop,
        right: SAFE_AREA_PADDING.paddingRight,
    },
    centerButtonRow: {
        position: 'absolute',
        right: SAFE_AREA_PADDING.paddingRight,
        bottom: SAFE_AREA_PADDING.paddingTop,
    },
    leftButtonRow: {
        position: 'absolute',
        left: SAFE_AREA_PADDING.paddingLeft,
        bottom: SAFE_AREA_PADDING.paddingBottom,
    },
    shadowLogin: {
        shadowColor: '#000000',
        shadowOffset: { width: -2, height: -1 },
        shadowOpacity: 0.25,
        shadowRadius: 0,
    }
})


export default UpdateUser;