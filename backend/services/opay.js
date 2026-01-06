// OPay Payment Service
import axios from 'axios';

const OPAY_CONFIG = {
  baseURL: process.env.OPAY_BASE_URL || 'https://sandbox.opayweb.com/api/v1',
  headers: {
    'Authorization': `Bearer ${process.env.OPAY_SECRET_KEY}`,
    'MerchantId': process.env.OPAY_MERCHANT_ID,
    'Content-Type': 'application/json'
  }
};

export class OPayService {
  // Initialize payment
  static async initializePayment(paymentData) {
    try {
      const response = await axios.post(
        `${OPAY_CONFIG.baseURL}/transaction/initialize`,
        {
          amount: paymentData.amount,
          currency: 'NGN',
          country: 'NG',
          reference: `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          email: paymentData.email,
          callbackUrl: `${process.env.BASE_URL}/api/payments/callback`,
          metadata: {
            ticket_type_id: paymentData.ticket_type_id,
            quantity: paymentData.quantity,
            event_id: paymentData.event_id
          }
        },
        {
          headers: OPAY_CONFIG.headers
        }
      );

      return {
        success: true,
        authorization_url: response.data.data.authorization_url,
        reference: response.data.data.reference
      };
    } catch (error) {
      console.error('OPay payment error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Payment initialization failed'
      };
    }
  }

  // Verify payment
  static async verifyPayment(reference) {
    try {
      const response = await axios.post(
        `${OPAY_CONFIG.baseURL}/transaction/verify`,
        { reference },
        { headers: OPAY_CONFIG.headers }
      );

      return {
        success: response.data.data.status === 'successful',
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Payment verification failed'
      };
    }
  }
}