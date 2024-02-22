import React, { useState, useEffect } from 'react';
import { LogBox, Dimensions } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, Alert, SafeAreaView, ScrollView, Platform, TextInput } from 'react-native';
import { Center, Container, Heading, Button, Text, Flex, Box, Select, CheckIcon, TextArea, Stack, Input, SearchBar, Image, Icon, Spacer, ZStack, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy, Logout } from 'iconsax-react-native';
import { logoutAction } from '../../store/actions/auth';
import { getToken } from '../../common/asynStorage';
import { useLogin } from '../../context/LoginProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import _ from "lodash";
import { PressableOpacity } from 'react-native-pressable-opacity';
import * as RNImagePicker from 'expo-image-picker'
import { appReview } from '../../store/actions/add';
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';
import { fetchProductOwners } from '../../store/actions/productService';
import { selectProductOwnersActive } from '../../store/reducers/productService';
import ErorrValidator from '../ErorrValidator';
import FileUpload from '../Svg/FileUpload';
import Star from '../Svg/Star';
import Arrow from '../Svg/Arrow';
const Complaint = ({ navigation, route }) => {
    const dispatch = useDispatch();
    var { width, height } = Dimensions.get("window");
    const star = useSelector(state => state.add.star)
    const productOwnersActive = useSelector(selectProductOwnersActive)
    const [spinner, setSpinner] = useState(false)
    const errors = useSelector(state => state.add.errors)
    const [form, setForm] = useState({
        star: null,
        evaluate: null,
        data: [],
        description: null,
        productOwner: null
    })
    const [images, setImages] = useState([]);
    const getProductOwner = () => {
        dispatch(fetchProductOwners());
    }
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            (async () => {
                getProductOwner();

                if (productOwnersActive && productOwnersActive.length > 0) {

                    setForm(prevState => {
                        return { ...prevState, productOwner: productOwnersActive[0].id }
                    })
                }
                dispatch({
                    type: 'clearErrorReview'
                })
            })();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const isInclued = (data) => {

        return form.data.includes(data);
    }
    const Add = (value) => {
        let newArray = form.data
        if (newArray.includes(value)) {
            let index = newArray.indexOf(value);
            newArray.splice(index, 1)
            setForm(prevState => {
                return { ...prevState, data: newArray }
            })
        }
        else {
            newArray.push(value)
            setForm(prevState => {
                return { ...prevState, data: newArray }
            })

        }

    }

    const pickImages = async () => {



        try {
            const { status } = await RNImagePicker.requestMediaLibraryPermissionsAsync()
            if (status === 'granted') {
                const result = await RNImagePicker.launchImageLibraryAsync({
                    options: {
                        allowsMultipleSelection: true,
                        mediaType: 'photo',
                        base64: true,
                        selectionLimit: 4
                    }
                })
                if (images.length < 4) {

                    console.log('result', result.assets);
                    if (result && result.assets.length == 1) {
                        setImages([
                            ...images,
                            result.assets[0]
                        ])
                        // setImages(result.assets[0])
                        // console.log(images)
                    }

                    if (result && result.assets.length > 1) {
                        let newImages = images;
                        result.assets.forEach(image => {
                            newImages.push(image)
                        })
                        setImages(newImages)

                    }
                }
            }

        } catch (error) {
            console.debug(error)
        }

    }

    const saveComplaint = () => {

        if (productOwnersActive.length == 0) {
            Toast.show({
                type: 'error',
                text1: 'Chưa có gói hoạt động nào kích hoạt!',
                position: 'bottom',

            });
            return
        }
        const formData = new FormData();

        for (var i = 0; i < images.length; i++) {
            let localUri = images[i].uri;
            let filename = localUri.split('/').pop();
            console.log(localUri)
            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            console.log(match[1])
            let type = match ? `image/${match[1]}` : `image`;
            formData.append('images[' + i + ']', { uri: localUri, name: filename, type });
        }
        formData.append('star', star);
        formData.append('data', JSON.stringify(form.data));
        formData.append('description', form.description ? form.description : '');
        formData.append('product_service_owner_id', form.productOwner ? form.productOwner : '')
        setSpinner(true)
        dispatch(appReview(formData,
            (message) => {
                console.log('saveComplaint', message)
                Toast.show({
                    type: 'success',
                    text1: message,
                    position: 'bottom'
                });
                setSpinner(false)
                navigation.navigate('Home')
            },
            (error) => {
                // console.log(error)
                setSpinner(false)
                Toast.show({
                    type: 'error',
                    text1: 'Lỗi!',
                    text2: error,
                    position: 'bottom',
                    visibilityTime: 3000
                });

            },
        ));

    }
    const DeleteImage = (data) => {
        let newImages = images

        let index = newImages.indexOf(data);
        console.log(index)
        newImages.splice(index, 1)
        setImages([...newImages])

    }

    const alertsaveComplaint = () =>
        Alert.alert('Bạn muốn đặt sản phẩm!', 'Cam Mặt Trời sẽ liên hệ với quý khách và gửi nông sản đến tay bạn', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {

                    saveComplaint()
                }

            },
        ]);
    return (
        <SafeAreaView style={styles.container} >
            <Spinner
                visible={spinner}
                textContent={'Vui lòng đợi...'}
                textStyle={styles.spinnerTextStyle}
            />
            <ScrollView >
                <Box className="lg:w-[70%] lg:mx-[15%]">
                    <Center>

                        <Center direction='row' className="  items-center w-full mb-3">
                            {/* {star && star <= 2 ? <Text className="font-bold text-[17px]" > Quá tệ</Text> : null}
                    {star && star == 3 ? <Text className="font-bold text-[17px]" >Bình thường</Text> : null}
                    {star && star == 4 ? <Text className="font-bold text-[17px]" >Tốt</Text> : null}
                    {star && star == 5 ? <Text className="font-bold text-[17px]" >Tuyệt vời</Text> : null} */}


                            <Flex direction='row' className=" items-center mt-5 ">
                                {_.range(1, 6).map(i =>
                                    <PressableOpacity key={i} onPress={() => {
                                        dispatch({ type: 'chooseStar', payload: i });
                                        setForm(prevState => {
                                            return { ...prevState, data: [] }
                                        })
                                    }}>
                                        <Box className="text-3xl mx-1 text-[#AEAEAE]" >


                                            <Star width={28} height={28} color={i <= star ? '#FF6100' : '#AEAEAE'} />
                                        </Box>
                                    </PressableOpacity>

                                )}

                            </Flex>
                        </Center>


                    </Center>
                    <Box className="mb-[177px]">
                        <Box className="text-[#AEAEAE] text-[13px]   mx-5 lg:mx-0 w-full">
                            <Text className="text-[#AEAEAE]">Chúng tôi cần cải thiện điều gì? </Text>
                        </Box>

                        <Box className="my-5 mx-5 lg:mx-0">

                            {star && star <= 2 ? <Flex direction='row' className="flex flex-wrap" >
                                <PressableOpacity onPress={() => Add('Chất lượng')}>
                                    <Box className={`px-2 py-1  rounded-lg bg-white  text-back mx-1 my-1  ${isInclued('Chất lượng') ? 'border border-amber-600' : ''}`}
                                    ><Text className="text-[10px]">Chất
                                        lượng</Text></Box>
                                </PressableOpacity>
                                <PressableOpacity onPress={() => Add('Quá lâu')}>
                                    <Box className={` px-2 py-1 rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Quá lâu') ? 'border border-amber-600' : ''}`}
                                    ><Text className="text-[10px]">Quá lâu</Text></Box>
                                </PressableOpacity>
                                <PressableOpacity onPress={() => Add('Đội giá')}>
                                    <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1  ${isInclued('Đội giá') ? 'border border-amber-600' : ''}`}
                                    ><Text className="text-[10px]">Đội giá</Text></Box>
                                </PressableOpacity>
                                <PressableOpacity onPress={() => Add('Thái độ nhân viên')}>
                                    <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Thái độ nhân viên') ? 'border border-amber-600' : ''}`}
                                    ><Text className="text-[10px]">Thái độ nhân viên</Text></Box>
                                </PressableOpacity>



                            </Flex >
                                : null}

                            {star && star == 3 ? <Flex direction='row' className="flex flex-wrap" >

                                <PressableOpacity onPress={() => Add('Chất lượng')}>
                                    <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Chất lượng') ? 'border border-amber-600' : ''}`}
                                    ><Text className="text-[10px]">Chất
                                        lượng</Text></Box>
                                </PressableOpacity>
                                <PressableOpacity onPress={() => Add('Quá lâu')}>
                                    <Box className={`px-2 py-1  rounded-lg bg-white text-back  mx-1 my-1 ${isInclued('Quá lâu') ? 'border border-amber-600' : ''}`}
                                    ><Text className="text-[10px]">Quá lâu</Text></Box>
                                </PressableOpacity>
                                <PressableOpacity onPress={() => Add('Đội giá')}>
                                    <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Đội giá') ? 'border border-amber-600' : ''}`}
                                    ><Text className="text-[10px]">Đội giá</Text></Box>
                                </PressableOpacity>
                                <PressableOpacity onPress={() => Add('Thái độ nhân viên')}>
                                    <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Thái độ nhân viên') ? ' border border-amber-600' : ''}`}
                                    ><Text className="text-[10px]">Thái độ nhân viên</Text></Box>
                                </PressableOpacity>


                            </Flex >
                                : null}

                            {star && star >= 4 ? <Flex direction='row' className="flex flex-wrap" >
                                <PressableOpacity onPress={() => Add('Chất lượng')}>
                                    <Box className={` px-2 py-1 rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Chất lượng') ? 'border border-amber-600' : ''}`}
                                    ><Text className="text-[10px]">Chất
                                        lượng</Text></Box>
                                </PressableOpacity>
                                <PressableOpacity onPress={() => Add('Tuyệt vời')}>
                                    <Box className={` px-2 py-1 rounded-lg bg-white  text-back mx-1 my-1 ${isInclued('Tuyệt vời') ? ' border border-amber-600' : ''}`}
                                    ><Text className="text-[10px]">Tuyệt vời</Text></Box>
                                </PressableOpacity>

                                <PressableOpacity onPress={() => Add('Sạch sẽ')}>
                                    <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Sạch sẽ') ? 'border border-amber-600' : ''}`}
                                    ><Text className="text-[10px]">Sạch sẽ</Text></Box>
                                </PressableOpacity>
                                <PressableOpacity onPress={() => Add('Đóng gói cẩn thận')}>
                                    <Box className={`px-2 py-1  rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Đóng gói cẩn thận') ? 'border border-amber-600' : ''}`}
                                    ><Text className="text-[10px]">Đóng gói cẩn thận</Text></Box>
                                </PressableOpacity>
                                <PressableOpacity onPress={() => Add('Thái độ thân thiện')}>
                                    <Box className={`px-2 py-1 bỏ rounded-lg bg-white text-back mx-1 my-1 ${isInclued('Thái độ thân thiện') ? 'border border-amber-600' : ''}`}
                                    ><Text className="text-[10px]">Thái độ thân thiện</Text></Box>
                                </PressableOpacity>



                            </Flex >
                                : null}

                            <Box className="my-5 bg-[#F0F0F0]  border-0">

                                <TextInput underlineColorAndroid="transparent"

                                    placeholderTextColor="grey"
                                    numberOfLines={100}
                                    multiline={true} style={{
                                        flex: 1,
                                        textAlignVertical: 'top',
                                        padding: 10,
                                        paddingLeft: 15,
                                        height: 150, justifyContent: "flex-start"
                                    }}
                                    value={form.description} placeholder="Nhận xét thêm" className="rounded-md bg-white  border-white text-[11px]"
                                    onChangeText={text => setForm(prevState => {
                                        return { ...prevState, description: text }
                                    })} // for android and ios
                                />
                            </Box>

                            <Box className="mt-1 mb-3" >
                                <Heading size="sm" className="color-[#FF6100]">Hoạt động theo gói </Heading>
                                {productOwnersActive.length > 0 ?
                                    <Box >
                                        <Select selectedValue={form.productOwner} minWidth="100" accessibilityLabel="Chọn gói dịch vụ"
                                            backgroundColor={'white'}
                                            borderRadius={10}
                                            borderColor={'white'}
                                            placeholder="Chọn gói dịch vụ "
                                            dropdownIcon={<Box className="mr-2">
                                                <Arrow color="#184E17" width={20} height={6} />
                                            </Box>}
                                            _selectedItem={{
                                                bg: "orange.600",
                                                endIcon: <CheckIcon size="1" />
                                            }} mt={1} onValueChange={itemValue => setForm(prevState => {
                                                return { ...prevState, productOwner: itemValue }
                                            })}>

                                            {productOwnersActive.map((item, key) =>
                                                <Select.Item key={item.id} label={item?.product?.name} value={item.id} />)}
                                        </Select>
                                    </Box>
                                    : <Text className="text-red-600 font-bold">Chưa có gói được kích hoạt</Text>}

                                <ErorrValidator errors={errors} key_error={'product_service_owner_id'} />
                            </Box>
                            <Flex direction='row' className="mt-1 items-center mb-2">
                                <PressableOpacity onPress={() => pickImages()} >
                                    <FileUpload />
                                </PressableOpacity>
                                <Text className=" text-[#AEAEAE] ml-2 text-[12px]">Đính kèm hình ảnh</Text>
                            </Flex>


                            <Flex direction='row' className="flex flex-wrap mb-[30px]" >
                                {images.length > 0 && images.map((image, index) =>
                                    <Flex key={`image${index}`} direction='row' className=" flex flex-wrap mx-1 my-1" >
                                        <Box className="relative ">
                                            <Box className="absolute right-0 top-0 z-10 ">
                                                <PressableOpacity onPress={() => DeleteImage(image)}>
                                                    <MaterialCommunityIcons name='trash-can-outline' size={16} color='#fc5050' />
                                                </PressableOpacity>

                                            </Box>
                                            <Image source={{ uri: image.uri }} alt={`image${index}`} size="md" className="rounded-md" />

                                        </Box>

                                    </Flex>

                                )}
                            </Flex>

                            {/* <Button onPress={() => saveComplaint()} className=" mb-[77px] bottom-0  w-full  text-white bg-[#FF6100] rounded-xl btn_button"
                        >Gửi</Button> */}
                        </Box >

                    </Box>
                </Box>

            </ScrollView >
            {/* <Box className="mx-5 w-[90%] absolute bottom-[80px] lg:w-2/3 lg:mx-auto">
                <Button onPress={() => saveComplaint()} className=" w-full  text-white bg-[#FF6100] rounded-[10px] btn_button"
                >Gửi</Button>
            </Box> */}

            <Button onPress={() => saveComplaint()} className="absolute mx-5 w-[90%] my-[87px] bottom-0 px-2 py-3 lg:w-[70%] lg:mx-[15%] text-white  bg-[#FF6100] rounded-[10px] btn_button"
            ><Text className="text-white text-[16px]">Gửi</Text>
            </Button>


        </SafeAreaView >

    );
}


const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1
    }
})


export default Complaint;