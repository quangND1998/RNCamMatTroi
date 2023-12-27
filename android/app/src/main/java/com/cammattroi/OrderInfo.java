package com.cammattroi;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class OrderInfo {

    @Expose
    @SerializedName("CheckSum")
    private String checksum;
    @Expose
    @SerializedName("OrderInfo")
    private String orderInfo;
    private double cashAmount;

    public OrderInfo(String checksum, String orderInfo, double cashAmount) {
        this.checksum = checksum;
        this.orderInfo = orderInfo;
        this.cashAmount = cashAmount;
    }

    public String getChecksum() {
        return checksum;
    }

    public String getOrderInfo() {
        return orderInfo;
    }

    public double getCashAmount() {
        return cashAmount;
    }
}
