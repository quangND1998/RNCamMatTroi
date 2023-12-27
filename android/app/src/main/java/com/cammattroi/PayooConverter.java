package com.cammattroi;

import androidx.annotation.Nullable;

import vn.payoo.model.Order;
import vn.payoo.model.OrderConverter;

public class PayooConverter implements OrderConverter {

    @Nullable
    @Override
    public <T> Order convert(T data) {
        String checksum = ((OrderInfo) data).getChecksum();
        String orderInfo = ((OrderInfo) data).getOrderInfo();
        Double cashAmount = ((OrderInfo) data).getCashAmount();
        return new Order(checksum, orderInfo, cashAmount);
    }

    public static PayooConverter create() {
        return new PayooConverter();
    }
}
