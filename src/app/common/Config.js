import { Dimensions } from "react-native";
import Icons from "./Icons";
import PayPal from "react-native-paypal-wrapper";

const Config = {
  WoocommerceConfig: {
    endpoint: "https://tuotuobuy.com",
    consumer_key: "ck_40b7351899f23408ac55fce2588548a7cd44f49a",
    consumer_secret: "cs_1fe5b997e6fdbd6f63773c8b6a5ebeb0114ad8b2"
  },
  Promotions: [
    {
      name: "最新生鲜",
      image: "https://tuotuobuy.com/wp-content/uploads/2018/11/fresh.png",
      categoryId: 241
    },
    {
      name: "最新干货",
      image: "https://tuotuobuy.com/wp-content/uploads/2018/11/dryfood.png",
      categoryId: 241
    },
    {
      name: "最新护肤",
      image: "https://tuotuobuy.com/wp-content/uploads/2018/11/makeup.png",
      categoryId: 241
    },
    {
      name: "最新母婴",
      image: "https://tuotuobuy.com/wp-content/uploads/2018/11/baby.png",
      categoryId: 241
    }
  ],
  Brands: [
    {
      name: "精选",
      categoryId: 241,
      image: "https://tuotuobuy.com/wp-content/uploads/2018/11/banner.jpg"
    },
    {
      name: "热销",
      categoryId: 241,
      image: "https://tuotuobuy.com/wp-content/uploads/2018/11/banner.jpg"
    },
    {
      name: "优惠",
      categoryId: 241,
      image: "https://tuotuobuy.com/wp-content/uploads/2018/11/banner.jpg"
    },
    {
      name: "好评",
      categoryId: 241,
      image: "https://tuotuobuy.com/wp-content/uploads/2018/11/banner.jpg"
    }
  ],
  PayPal: {
    Environment: PayPal.SANDBOX, //PayPal.PRODUCTION
    ClientId:
      "AfPS3u9W0-3Y30upDcE-AO1mZXmsOAAVc4IyITRXzNVGJTQfQeQ7wZT45PEvGM3PFUKzfGMmhzydmIVW"
  },
  OneSignalAppId: "60dbfa31-171a-4516-92fc-bd09ece5b4f1",
  EnabledDoken: false,
  RazorpayKey: "rzp_test_1oesWLG5iUkyFQ",
  Currency: {
    code: "USD",
    symbol: "$"
  },
  Stripe: {
    publishKey: "pk_test_dbrsvJ6uivDvdxplddAm5o3D",
    secretKey: "sk_test_PVYJ8AB0Y47l0XPRvvp3kY9O",
    mechantId: "acct_1DYbW1JfLX2hhus9"
  }
};

export default Config;
