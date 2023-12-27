package com.cammattroi;

import vn.payoo.paymentsdk.data.model.ResponseObject;

public class PayooPaymentResponse {
    private int groupType;
    private ResponseObject responseObject;

    public PayooPaymentResponse(int groupType, ResponseObject responseObject) {
        this.groupType = groupType;
        this.responseObject = responseObject;
    }

    public int getGroupType() {
        return groupType;
    }

    public ResponseObject getResponseObject() {
        return responseObject;
    }
}
