package com.cammattroi;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatEditText;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.gson.Gson;

import org.json.JSONException;

import java.util.List;

import vn.payoo.model.Language;
import vn.payoo.model.Order;
import vn.payoo.model.PayooEnvironment;
import vn.payoo.model.PayooMerchant;
import vn.payoo.paymentsdk.OnPayooPaymentCompleteListener;
import vn.payoo.paymentsdk.PayooPaymentSDK;
import vn.payoo.paymentsdk.data.model.PaymentMethod;
import vn.payoo.paymentsdk.data.model.PaymentOption;
import vn.payoo.paymentsdk.data.model.ResponseObject;


public class PayooSDKAndroidModule extends ReactContextBaseJavaModule implements OnPayooPaymentCompleteListener {

    private static final String KEY_AUTH_TOKEN = "app_auth_token";

    private static final String KEY_USER_ID = "user_id";

    private AppCompatEditText editAuthToken;
    ReactContext reactContext;

    public PayooSDKAndroidModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        //reactContext.addActivityEventListener(this);
    }

    public static Order order;

    @Override
    public String getName() {
        return "PayooSDKAndroidModule";
    }

    private Promise promise;

    @Override
    public void onPaymentComplete(int groupType, ResponseObject responseObject) {
        PayooPaymentResponse response = new PayooPaymentResponse(groupType, responseObject);
        String json = new Gson().toJson(response);
        promise.resolve(json);
    }

    @ReactMethod
    public void pay(ReadableMap input, Promise promise) throws JSONException {
        this.promise = promise;

        //Merchant info
        String merchantId = getStringParams(input, "MerchantID");
        String merchantShareKey = getStringParams(input, "MerchantShareKey");

        //Order info
        String orderXML = getStringParams(input, "PayooOrderXML");
        String checksum = getStringParams(input, "PayooOrderChecksum");
        double cashAmount = getDoubleParams(input, "PayooCashAmount", 0.0);

        //Configuration info
        int lang = getIntParams(input, "Language", 0);
        int environment = getIntParams(input, "Environment", 0);
        int supportMethods = getIntParams(input, "SupportedMethods", 0);
        String bankCode = getStringParams(input, "BankCode");
        String appCode = getStringParams(input, "AppCode");
        String email = getStringParams(input, "CustomerEmail");
        String phone = getStringParams(input, "CustomerPhone");

        OrderInfo orderInfo = new OrderInfo(checksum, orderXML, cashAmount);
        List<PaymentMethod> methods = PaymentMethod.get(supportMethods);

        PaymentOption paymentOption = PaymentOption.newBuilder()
                .withLanguage(lang == 0 ? Language.VIETNAMESE : Language.ENGLISH)
                .withSupportedPaymentMethods(methods)
                .withStyleResId(R.style.PayooSdkTheme_Blue)
                .withCustomerEmail(email)
                .withCustomerPhone(phone)
                .withBankCode(bankCode)
                .withAppCode(appCode)
                .build();


        PayooMerchant payooMerchant = PayooMerchant.newBuilder()
                .merchantId(merchantId)
                .secretKey(merchantShareKey)
                .converter(PayooConverter.create())
                .environment(environment == 0 ? PayooEnvironment.DEVELOPMENT : PayooEnvironment.PRODUCTION)
                .build();

        PayooPaymentSDK.initialize(getCurrentActivity().getApplication(), payooMerchant);
        PayooPaymentSDK.pay((AppCompatActivity) reactContext.getCurrentActivity(), orderInfo, paymentOption, this);
    }

    private String getStringParams(ReadableMap input, String key) {
        String value = input.getString(key);
        if (value == null) {
            return "";
        }
        return value;
    }

    private int getIntParams(ReadableMap input, String key, int defaultValue) {
        try {
            return input.getInt(key);
        } catch (Exception ex) {
            return defaultValue;
        }
    }

    private double getDoubleParams(ReadableMap input, String key, double defaultValue) {
        try {
            return input.getDouble(key);
        } catch (Exception ex) {
            return defaultValue;
        }
    }

}