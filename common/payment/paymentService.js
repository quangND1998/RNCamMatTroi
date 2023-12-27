import ApiService from "../apiService"
export const PaymentService = {
    payment(orderId) {
        console.log('service', orderId)
        return ApiService.query(`api/v1/payment/${orderId}/order`)
    },

}