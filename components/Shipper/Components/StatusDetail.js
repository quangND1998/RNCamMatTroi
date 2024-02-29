import React, {useMemo } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import { SafeAreaView } from 'react-native-safe-area-context';

LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])
import { SHIPPER_STATUS } from '../constants';
const StatusDetail = ({ order_transport }) => {

    const status_color = {
        not_shipping: ' text-[#FF0000]',
        not_delivered: 'text-[#FF6100]',
        delivered: 'text-[#4F8D06]',
        wait_refund: 'text-[#1D75FA]',
        refund: 'text-[#1D75FA]',
        wait_decline: 'text-[#FF0000]',
        decline: 'text-[#FF0000]',
        wait_warehouse: "text-[#1D75FA]",

    }

    const status_text = {
        not_shipping: 'Chưa lấy',
        not_delivered: 'Đang vận chuyển',
        delivered: 'Đã giao',
        wait_refund: 'Yêu cầu chờ hoàn',
        refund: 'Đã hoàn',
        wait_decline: 'Yêu cầu chờ hủy',
        decline: 'Hủy giao',
        wait_warehouse: "Kho đang xác nhận hàng hoàn",

    }

    const docuemnt_text = {
        not_push: 'chưa up hồ sơ',
        not_approved: 'đã up hồ sơ',
        approved: 'đủ hồ sơ',



    }
    const color = useMemo(() => {
        return status_color[order_transport.status]
    }, [])

    const text = useMemo(() => {
        if (order_transport.order.state_document && order_transport.status == 'delivered') {
            return `${status_text[order_transport.status]}, ${docuemnt_text[order_transport.order.state_document]}`
        }
        return status_text[order_transport.status]
    }, [])

    return (
        <SafeAreaView >

            <Text 
                className={`${color}`}>
                {text}
            </Text>



        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {


    },
    image_bg: {
        flex: 1,
        justifyContent: 'center',
    },
    containt_service: {
        margin: 20
    }
})


export default StatusDetail;