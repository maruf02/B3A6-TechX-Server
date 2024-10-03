import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const initiatePayment = async () => {
  const response = await axios.post(process.env.PAYMENT_URL!, {
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    tran_id: "paymentData.transactionId",
    success_url: "http://www.merchantdomain.com/sucesspage.html",
    fail_url: "http://www.merchantdomain.com/failedpage.html",
    cancel_url: "http://www.merchantdomain.com/cancellpage.html",
    // amount: "paymentData.totalCost",
    amount: "100",
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: " paymentData.userName",
    // cus_email: "paymentData.userEmail,",
    cus_email: "abc@gmail.com",
    cus_add1: "paymentData.userAddress",
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "N/A",
    cus_phone: " paymentData.userPhone",
    type: "json",
  });
  console.log("response", response);
  return response.data;
};
