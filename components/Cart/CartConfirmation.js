import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, TouchableOpacity, Linking, Keyboard, View, SafeAreaView, ScrollView, RefreshControl, Alert } from 'react-native';
import { Flex, Center, Container, Select, CheckIcon, Image, Modal, FormControl, WarningOutlineIcon, Heading, Button, Text, Box, Stack, Input, SearchBar, Spacer, ZStack, HStack, VStack, Pressable, FlatList, Avatar, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { EmojiHappy, Trash } from 'iconsax-react-native';
import { PressableOpacity } from 'react-native-pressable-opacity';
import { getListProductService, getProductDetail } from '../../store/actions/productService';
import { fetchProductRetails, queryProductRetails } from '../../store/actions/productRetail';
import PaginationMuti from '../PaginationMuti';
import {
    selectTotalPrice, selectTotalQuantity, selectTotal, selectLastPrice
} from '../../store/reducers/cartReducer';
import { addToCart, changeQuantity, getVouchers, saveOrder } from '../../store/actions/cart';
import { useHelper } from '../../helpers/helper';
import NumericInput from 'react-native-numeric-input'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const CartConfirmation = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const vouchers = useSelector(state => state.cart.vouchers);
    const voucher = useSelector(state => state.cart.voucher);
    const totalPrice = useSelector(selectTotalPrice);
    const totalQuantity = useSelector(selectTotalQuantity)
    const total = useSelector(selectTotal)
    const lastPrice = useSelector(selectLastPrice)
    const [spinner, setSpinner] = useState(false)
    const [selected, setSelected] = React.useState(1);
    const [collapseProduct, setCollapseProduct] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('banking');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [modalSale, setModalSale] = React.useState(false);
    const { formatPrice, formatDate } = useHelper();
    const errors = useSelector(state => state.cart.errors)
    useEffect(() => {
        fetchVouchers()
    }, [totalPrice])
    const openModal = (data) => {
        setProduct(data)
        setQuantity(data.quantity)
        setModalVisible(!modalVisible);
    };

    const openModalSale = () => {

        setModalSale(!modalVisible);
        fetchVouchers();
    };
    const updateQuantity = (data) => {
        if (quantity == 0) {
            alertRemoveItem()
            // isRemoveProduct.value = true;
            setModalVisible(true);

        }
        else {
            dispatch(changeQuantity({ product: data, quantity: quantity }))
            // store.dispatch('stores/cart/changeQuantity', { product: data, quantity: quantity.value })
            setModalVisible(false);
        }
    }
    const alertRemoveItem = () =>
        Alert.alert('Bạn muốn xóa sản phẩm!', 'Bạn có muốn xóa sản phẩm khỏi giỏ hàng', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    dispatch({
                        type: 'removeItemOnCart',
                        payload: product
                    })
                    setModalVisible(false);
                }

            },
        ]);
    const removeItemOnCart = (product) => {
        Alert.alert('Bạn muốn xóa sản phẩm!', 'Bạn có muốn xóa sản phẩm khỏi giỏ hàng', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    dispatch({
                        type: 'removeItemOnCart',
                        payload: product
                    })
                    setModalVisible(false);
                }

            },
        ]);
    }

    const fetchVouchers = () => {
        let params = {
            total: totalPrice
        }
        dispatch(getVouchers(params))
    }
    const chooseVoucher = (voucher) => {
        dispatch({
            type: 'addVoucher',
            payload: voucher
        })
    }
    const save = () => {
        setSpinner(true);
        dispatch(saveOrder({ items: cart.items, voucher: voucher, payment_method: paymentMethod },
            () => {
                Toast.show({
                    type: 'success',
                    text1: 'Đặt hàng thành công!',
                    text2: 'Cảm ơn bạn đã sử dụng sản phẩm của Cam Mặt Trời 👋',
                    position: 'bottom'
                });
                setSpinner(false);
            },
            (error) => {
                // console.log(error)
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
    const alertSaveOrder = () =>
        Alert.alert('Bạn muốn đặt sản phẩm!', 'Cam Mặt Trời sẽ liên hệ với quý khách và gửi nông sản đến tay bạn', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    save();
                    setModalVisible(false);
                }

            },
        ]);
    return (
        <SafeAreaView style={styles.container}>
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <ScrollView
                contentContainerStyle={styles.scrollView}
            >
                {product ? <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} size="xl">
                    <Modal.Content maxH="300">
                        <Modal.CloseButton />
                        <Modal.Header>Chỉnh sửa giỏ hàng</Modal.Header>
                        <Modal.Body>
                            <ScrollView>
                                <Box className="flex border-b w-full ">
                                    <Box className=" ml-3">
                                        <Heading class="font-semibold text-[#000000] block">{product.name}</Heading>
                                        <Text className="text-xs text-[#F78F43] my-1 ">{product.price} vnđ</Text>
                                        <Box className="flex my-2">
                                            <NumericInput value={quantity} minValue={0} onChange={value => setQuantity(value)} />
                                        </Box>
                                    </Box>
                                </Box>
                            </ScrollView>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                    setModalVisible(false);
                                }}>
                                    Cancel
                                </Button>
                                <Button onPress={() => {
                                    updateQuantity(product)

                                }}>
                                    Save
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal> : null}

                <Box className="my-5 mx-5">
                    {cart.items.length > 0 ? <Box className="my-5">
                        <Box flex="1" className=" w-full ">
                            <Box className="flex flex-row justify-between">
                                <Heading size='md'>Tóm tắt đơn hàng</Heading>
                                <Box className="flex items-center">
                                </Box>
                            </Box>

                            {cart.items.slice(0, 3).map((item, key) =>
                                <Flex direction="row" key={item.id} className="flex items-center justify-between  my-3">
                                    <Flex direction="row" className="flex  items-center  ">
                                        <Text className="py-1 px-2  text-sm rounded-lg shadow-sm text-[#F78F43]">{item.quantity}x</Text>
                                        <Box className="ml-3 block">
                                            <Heading size="xs" className="block">{item.name}</Heading>
                                            <PressableOpacity onPress={() => openModal(item)}>
                                                <Text fontSize="xs" className=" text-[#F78F43]"  >Chỉnh sửa</Text></PressableOpacity>
                                        </Box>
                                    </Flex>
                                    <Flex direction="row" className=" items-center">
                                        <Text fontSize="xs" className="text-[#F78F43]">{formatPrice(item.price)} đ</Text>
                                        <PressableOpacity onPress={() => removeItemOnCart(item)}>
                                            <Box className="ml-4" >
                                                <MaterialCommunityIcons name='trash-can-outline' size={16} className="text-xl text-[#fc5050]" color="#fc5050" />
                                            </Box>
                                        </PressableOpacity>
                                    </Flex>
                                </Flex>
                            )}
                            {collapseProduct ? cart.items.slice(3, cart.items.length).map((item, key) =>
                                <Flex direction="row" key={item.id} className="flex justify-between  my-3">
                                    <Flex direction="row" className=" items-center  ">
                                        <Text className="py-1 px-2  text-sm rounded-lg shadow-sm text-[#F78F43]">{item.quantity}x</Text>
                                        <Box className="ml-3 block">
                                            <Heading size="xs" className="block">{item.name}</Heading>
                                            <PressableOpacity onPress={() => openModal(item)}>
                                                <Text fontSize="xs" className=" text-[#F78F43]" >Chỉnh sửa</Text></PressableOpacity>
                                        </Box>
                                    </Flex>
                                    <Flex direction="row" className=" items-center">
                                        <Text fontSize="xs" className="text-[#F78F43] mt-[-12]">{formatPrice(item.price)} đ</Text>
                                        <PressableOpacity onPress={() => removeItemOnCart(item)}>
                                            <Box className="ml-5" >
                                                <MaterialCommunityIcons name='trash-can-outline' size={16} className="text-xl text-[#fc5050]" color="#fc5050" />
                                            </Box>
                                        </PressableOpacity>
                                    </Flex>
                                </Flex>
                            ) : null}
                            {cart.items.length >= 4 ? <PressableOpacity onPress={() => setCollapseProduct(!collapseProduct)}><Center className="text-center mt-2" >
                                <MaterialCommunityIcons name={collapseProduct ? 'chevron-up' : 'chevron-down'} size={30} className="text-xl text-[#ED5B00]" color="#fc5050" />
                            </Center></PressableOpacity> : null}
                        </Box>
                    </Box> : null}
                    {cart.items.length > 0 ?
                        <Box>
                            <Box className="w-full my-5">
                                <Flex direction='row' className=" justify-between">
                                    <Text>Tổng tạm tính</Text>
                                    <Text>{formatPrice(totalPrice)}đ</Text>
                                </Flex>
                                <Flex direction='row' className=" justify-between">
                                    <Text>Phí áp dụng</Text>
                                    <Text>Miễn phí</Text>
                                </Flex>
                                <Flex direction='row' className="flex justify-between my-5 bg-[#F0F0F0] py-3 px-2 rounded-xl items-center">
                                    <Flex direction='row'>
                                        <MaterialCommunityIcons name="tag-outline" size={20} color="#F78F43" className="-rotation-90 text-[#F78F43]"></MaterialCommunityIcons>
                                        <Text className="text-xs ml-2">Ưu đãi</Text>
                                    </Flex>
                                    <PressableOpacity onPress={() => openModalSale()}><Text expand="block">Chọn mã giảm giá</Text></PressableOpacity>

                                    <Modal isOpen={modalSale} onClose={() => setModalSale(false)} size="full">
                                        <Modal.Content maxH="500" >
                                            <Modal.CloseButton />
                                            <Modal.Header><Heading className="text-center font-semibold">Voucher của shop</Heading>
                                                <Text className="text-xs text-center mx-5 text-gray-500">Để tiết kiệm hơn khi áp mã giảm
                                                    giá của shop. Liên hệ với shop nếu gặp trục trặc về mã giảm giá do shop tự tạo
                                                </Text></Modal.Header>
                                            <Modal.Body>
                                                <ScrollView>
                                                    {vouchers ?
                                                        <Box>
                                                            {vouchers.map((item) =>
                                                                <Flex key={item.id} direction='row' className={`rounded shadow  justify-between p-2 my-4 items-center `}>
                                                                    <Flex direction='row' className="flex items-center">
                                                                        <Box className={`border-r w-20 pr-2 ${voucher && voucher.id == item.id ? 'opacity-25' : ''}`}>
                                                                            {item.code}
                                                                        </Box>
                                                                        {item.discount_percentage > 0 ? <Box className={`ml-2 ${voucher && voucher.id == item.id ? 'opacity-25' : ''}`}>
                                                                            <Text className="text-xs text-black">
                                                                                Giảm
                                                                                {item.discount_percentage}%</Text>
                                                                            <Text className="text-[10px]">Đơn tối thiểu {formatPrice(item.min_spend)
                                                                            } Giảm tối đa
                                                                                {formatPrice(item.discount_max_value)}</Text>
                                                                            <Box className="w-full bg-gray-200 rounded-full h-0.5 ">
                                                                                <Box className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                                                                                    <Box className="h-1 bg-red-600" style={{ width: '75%' }}></Box>
                                                                                </Box>
                                                                            </Box>
                                                                            {item.remaining_days < 4 ? <Text className="text-[9px] text-red-500 mt-1" >
                                                                                hết hạn trong: còn {
                                                                                    item.remaining_days
                                                                                }
                                                                                ngày</Text> : <Text className="text-[9px] text-red-500 mt-1" > Hết hạn: {
                                                                                    formatDate(item.expires_at)}</Text>}


                                                                        </Box> : null}
                                                                        {
                                                                            item.discount_percentage == 0 ?
                                                                                <Box className={`ml-2   ${voucher && voucher.id == item.id ? 'opacity-25' : ''}`} >
                                                                                    <Text className="text-xs text-black">
                                                                                        Giảm {formatPrice(item.discount_value)}</Text>
                                                                                    <Text className="text-[10px]">Đơn tối thiểu {formatPrice(item.min_spend)
                                                                                    }
                                                                                    </Text>
                                                                                    <Box className="w-full bg-gray-200 rounded-full h-0.5  ">
                                                                                        <Box className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                                                                                            <Box className="h-1 bg-red-600" style={{ width: '75%' }}></Box>
                                                                                        </Box>
                                                                                    </Box>
                                                                                    {item.remaining_days < 4 ? <Text className="text-[9px] text-red-500 mt-1" >
                                                                                        hết hạn trong: còn {
                                                                                            item.remaining_days
                                                                                        }
                                                                                        ngày</Text> : <Text className="text-[9px] text-red-500 mt-1" > Hết hạns: {
                                                                                            formatDate(item.expires_at)}</Text>}
                                                                                </Box> : null
                                                                        }

                                                                    </Flex>
                                                                    <Box>
                                                                        {voucher && voucher.id == item.id ? <Button onPress={() => chooseVoucher(null)}
                                                                            className="text-xs bg-red-700 text-white px-2 py-1">Đã áp dụng</Button> : <Button onPress={() => chooseVoucher(item)} className="text-xs bg-red-700 text-white px-2 py-1"
                                                                            >Áp dụng</Button>}
                                                                    </Box>
                                                                </Flex>)}
                                                        </Box> : null}
                                                </ScrollView>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button.Group space={2}>
                                                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                                        setModalSale(false);
                                                    }}>
                                                        Huỷ
                                                    </Button>

                                                </Button.Group>
                                            </Modal.Footer>
                                        </Modal.Content>
                                    </Modal>
                                </Flex>
                            </Box>
                        </Box> : null}
                    <Heading className="text-lg font-semibold ">Thanh toán</Heading>
                    {errors ? Object.keys(errors).map(key =>
                        <Text key={key} className="text-red-500"  >
                            {errors[key]}</Text>
                    ) : null}
                    <Box className="mx-1 my-5 rounded-xl " >
                        <Box className="w-full my-5 rounded-xl py-3 px-4 shadow">
                            <Flex direction='row' className="flex justify-between items-center">
                                <Text className="text-[15px]">Phương thức thanh toán</Text>
                                <Box maxW="300">
                                    <Select className="w-2/5 text-[14px] text-right text-[#434141c2] bg-gray-150" selectedValue={paymentMethod} minWidth="100" accessibilityLabel="Chọn phương thức thanh toán" placeholder="Chọn phương thức thanh toán" _selectedItem={{

                                        endIcon: <CheckIcon size="2" />
                                    }} mt={1} onValueChange={itemValue => setPaymentMethod(itemValue)}>
                                        <Select.Item label="Thanh toán khi nhận hàng" value="cash" />
                                        <Select.Item label="Thanh toán thẻ" value="banking" />
                                    </Select>
                                </Box>


                            </Flex>
                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }}
                            />
                            {paymentMethod === 'banking' ? <Box className="my-4">
                                <Text className="mb-2">Quét mã để thanh toán</Text>
                                <Center>
                                    <Image source={require('../../assets/images/QR_qcam.png')} alt="qrcode" className="w-60 h-72"></Image>
                                </Center>

                                <Center className="block font-semibold text-xs text-center">
                                    <Text>6161616888 - Ngân Hàng Quân Đội (MB)</Text>
                                    <Text>CÔNG TY CỔ PHẦN CAM MẶT TRỜI</Text>
                                    <Text>Nội dung: HKS231</Text>
                                </Center>
                            </Box> : null}
                            {/* {errors ? errors.map((error, key) => <Text class="text-red-500"  >
                                {error[0]}</Text>) : null} */}


                            {/* <Text class="text-red-500"  >
                                {errors.payment_method}</Text> */}

                        </Box>
                        <Text className="text-[#FF0909] text-xs mx-3">(Các chứng từ hợp đồng, hoá đơn sẽ được gửi đến địa chỉ trong hồ
                            sơ,
                            khách hàng có thể xem bản mềm tại lịch sử mua hàng)</Text>
                    </Box>
                </Box>

            </ScrollView >
            {
                cart.items.length > 0 ?
                    <Box className="fixed rounded-md shadow-sm">
                        <Box className="w-full py-2 px-3">
                            <Flex direction='row' className=" w-full  mt-2 justify-between">
                                <Text fontSize="sm" >Tổng cộng:</Text>
                                <Text className="text-gray-800">{formatPrice(totalPrice)}đ</Text>
                            </Flex>
                            <Flex direction='row' className=" mr-0 w-full   justify-between">
                                <Text fontSize="sm" >Giảm giá:</Text>
                                {voucher ? <Text className="text-gray-800" v-if="voucher">{formatPrice(voucher.discount_mount)}đ</Text> : <Text className="text-gray-800" v-else>0đ</Text>}
                            </Flex>
                            <Flex direction='row' className="w-full   justify-between">
                                <Heading size="sm">Tổng cộng:</Heading>
                                <Text className="text-[#F78F43]">{formatPrice(lastPrice)}đ</Text>
                            </Flex>
                        </Box>
                        <Button className="fixed   w-[90%] ml-[5%] mr-[5%] mt-2 mb-2 px-4 py-4 text-white bg-[#F78F43] rounded-xl" onPress={() => alertSaveOrder()}>Mua
                            ngay</Button>
                    </Box> : null

            }


        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {

    },
    icon_state: {
        position: 'absolute',
        top: 30,
        width: 35,
        fontWeight: 600,
    },
    image_thumb: {
        objectFit: 'cover',
        height: '100 %',
        width: '100 %',
    },
    btn_button: {
        bottom: '-10px'
    },



})


export default CartConfirmation;