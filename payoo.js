import { NativeModules, Platform } from "react-native";

export default class Payoo {
    static payooSdk =
        Platform.OS == "ios"
            ? NativeModules.PayooPaymentSDKModule
            : NativeModules.PayooSDKAndroidModule;
    
    static async pay(sdkConfig, OrderXML, OrderChecksum, callback) {
        let sdkInfo = {};

        //MerchantID and MerchantShareKey: is required
        sdkInfo.MerchantID = sdkConfig.MerchantId;
        sdkInfo.MerchantShareKey = sdkConfig.MerchantShareKey;

        //Order's information: is required
        sdkInfo.PayooOrderChecksum = OrderChecksum;
        sdkInfo.PayooOrderXML = OrderXML;
        sdkInfo.PayooCashAmount = sdkConfig.PayooCashAmount;

        //Optional area
        sdkInfo.Environment = sdkConfig.Environment; // 0: DEV, 1: PROD
        sdkInfo.Language = sdkConfig.Language; // 0: VIE, 1: ENG

        // Method configuration: is optional
        
        /*
        Each payment method has a value:
            E_WALLET_VALUE = 1
            DOMESTIC_CARD_VALUE = 2
            INTERNATIONAL_CARD_VALUE = 4
            PAY_AT_STORE_VALUE = 8
            TOKEN_VALUE = 16
            INSTALLMENT_VALUE = 32
            QR_CODE_VALUE = 64
            APP_2_APP_VALUE = 128
            If you want to select both DOMESTIC and INTERNATIONAL payment methods, please add the method values, SupportedMethods will be 2 + 4 = 6.
            If you want to select directly a DOMESTIC METHOD, SupportedMethods will be 2.
            If you want to select directly a DOMESTIC METHOD and a specific bank, please passing the bank code via bank Code params.
            Same with AppCode
        */

        sdkInfo.SupportedMethods = sdkConfig.SupportedMethods;
        sdkInfo.BankCode = sdkConfig.BankCode;
        sdkInfo.AppCode = sdkConfig.AppCode;

        // Customer's information: is optional
        sdkInfo.CustomerEmail = sdkConfig.CustomerEmail;
        sdkInfo.CustomerPhone = sdkConfig.CustomerPhone;

        let response = await this.payooSdk.pay(JSON.parse(JSON.stringify(sdkInfo)));
        if (response) {
            if (callback) {
                callback(response);
            }
        } else {
            alert("ERROR PAYOO");
        }
    }

    static handleErrorMess(code, languageData = {}) {
        let mess =
            languageData.PAYOOCODE_ERROR_DEFAULT + code || "ERROR + !!" + code;
        Object.entries(languageData).forEach(([key, value]) => {
            if (key === `PAYOOCODE_${code}`) {
                mess = value + code;
            }
        });
        return mess;
    }
}
