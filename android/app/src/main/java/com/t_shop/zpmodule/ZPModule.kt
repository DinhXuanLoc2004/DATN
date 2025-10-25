package com.t_shop.zpmodule

import android.content.Intent
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import vn.zalopay.sdk.ZaloPayError
import vn.zalopay.sdk.ZaloPaySDK
import vn.zalopay.sdk.listeners.PayOrderListener

class ZPModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    private val mReactContext: ReactApplicationContext = reactContext

    private val PAYMENTSUCCESS = "1"
    private val PAYMENTFAILED = "-1"
    private val PAYMENTCANCELED = "4"

    private val  listener = object : PayOrderListener{
        override fun onPaymentSucceeded(transactionId: String, transToken: String, appTransID: String?) {
            val params = Arguments.createMap().apply {
                putString("transactionId", transactionId)
                putString("transToken", transToken)
                putString("appTransID", appTransID)
                putString("returnCode", PAYMENTSUCCESS)
            }
            sendEvent(mReactContext, "EventPayZalo", params)
        }

        override fun onPaymentCanceled(transToken: String?, appTransID: String?) {
            val params = Arguments.createMap().apply {
                putString("returnCode", PAYMENTCANCELED)
                putString("zpTranstoken", transToken)
                putString("appTransID", appTransID)
            }
            sendEvent(mReactContext, "EventPayZalo", params)
        }

        override fun onPaymentError(zaloPayError: ZaloPayError?, transToken: String?, appTransID: String?) {
            if (zaloPayError == ZaloPayError.PAYMENT_APP_NOT_FOUND){
                installApp()
            }
            val params = Arguments.createMap().apply {
                putString("returnCode", PAYMENTFAILED)
                putString("zpTranstoken", transToken)
                putString("appTransID", appTransID)
            }
            sendEvent(mReactContext, "EventPayZalo", params)
        }
    }

    private val activityEventListener = object : BaseActivityEventListener(){
        override fun onNewIntent(intent: Intent?) {
            super.onNewIntent(intent)
        }
    }

    init {
        mReactContext.addActivityEventListener(activityEventListener)
    }

    override fun getName(): String {
        return "PayZaloBridge"
    }

    @ReactMethod
    fun payOrder(zpTranstoken: String){
        val currentActivity = currentActivity
        currentActivity?.let {
            ZaloPaySDK.getInstance().payOrder(it, zpTranstoken, "t-shop-deeplink://app", listener)
        }
    }

    @ReactMethod
    fun installApp() {
        ZaloPaySDK.getInstance().navigateToZaloOnStore(mReactContext)
        ZaloPaySDK.getInstance().navigateToZaloPayOnStore(mReactContext)
    }

    // Các phương thức cần thiết để hỗ trợ NativeEventEmitter
    @ReactMethod
    fun addListener(eventName: String) {
        // Phương thức này có thể để trống, chỉ cần tồn tại để NativeEventEmitter hoạt động
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // Phương thức này có thể để trống, chỉ cần tồn tại để NativeEventEmitter hoạt động
    }

    private fun sendEvent(reactContext: ReactContext, eventName: String, params: WritableMap) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }
}