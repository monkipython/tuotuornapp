import React from "react";
import { View, SafeAreaView, Alert, AsyncStorage, ScrollView, Text, FlatList } from "react-native";
import styles from "./style";
import { Config, Colors, Constants } from "@common";
import { PaymentMethods, Button } from "@components";

import { connect } from "react-redux";
import { ActionCreators } from "@actions";
import { bindActionCreators } from "redux";
import * as ActionTypes from "@actions/ActionTypes";
import PayPal from "react-native-paypal-wrapper";
import RazorpayCheckout from "react-native-razorpay";
import stripe from "tipsi-stripe";

PayPal.initialize(Config.PayPal.Environment, Config.PayPal.ClientId);
stripe.setOptions({
  publishableKey: Config.Stripe.publishKey,
  merchantId: Config.Stripe.mechantId,
  androidPayMode: "test"
});
class PaymentInfo extends React.Component {
  state = {
    paymentMethod: null,
    discount: 0,
    total: 0,
    tax: 0
  };

  render() {
    let { paymentMethods, type, shippingAddress, shippingMethod, customerInfo, salesTax } = this.props
    let subtotal = this.getPriceTotal()
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.items}>
            <Text style={styles.leftText}>{__.t('Subtotal')}:</Text><Text style={styles.rightText}>{Config.Currency.symbol}{subtotal}</Text>
          </View>
          <View style={styles.items}>
            <Text style={styles.leftText}>{__.t('Tax')}:</Text><Text style={styles.rightText}>{Config.Currency.symbol}{this.state.tax}</Text>
          </View>
          <View style={styles.items}>
            <Text style={styles.leftText}>{__.t('Discount')}:</Text><Text style={styles.rightText}>{Config.Currency.symbol}{this.state.discount}</Text>
          </View>
          <View style={styles.items}>
            <Text style={styles.leftText}>{__.t('Total')}:</Text><Text style={styles.rightText}>{Config.Currency.symbol}{this.state.total}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <PaymentMethods
            paymentMethods={paymentMethods}
            onSelectPaymentMethod={this.onSelectPaymentMethod}
          />
        </View>
        </ScrollView>
        <Button
          title={__.t("Submit")}
          style={styles.btnSubmit}
          onPress={this.onSubmit}
          loading={type == ActionTypes.CREATE_ORDER_PENDING}
        />
      </SafeAreaView>
    );
  }

  onSelectPaymentMethod = item => {
    this.setState({ paymentMethod: item });
  };

  onSubmit = () => {
    let { paymentMethod } = this.state;
    let { shippingAddress, coupon, carts, shippingMethod, customerInfo, salesTax } = this.props;
    let total_amount      = this.getPriceTotal();
    
    console.log("paymentinfo on submit");

    if (paymentMethod == null) {
      Alert.alert(__.t("Alert"), "请选择付款方式.");
      return;
    }

    var line_items = [];

    carts.forEach(item => {
      line_items.push({
        product_id: item.id,
        quantity: item.qty,
        total: item.price
      });
    });

    var data = {
      payment_type: "",
      payment_method: paymentMethod.id,
      payment_method_title: paymentMethod.title,
      set_paid: false,
      billing: shippingAddress,
      shipping: shippingAddress,
      line_items: line_items,
      currency: Config.Currency.Code,
      shipping_lines: [
        {
          method_id: shippingMethod.id,
          method_title: shippingMethod.title
        }
      ],
      customer_id: customerInfo.id,
    };

    var coupon_lines = [];

    if(coupon){
      data.coupon_lines      = [{code: coupon.code, discount: this.state.discount}]
    }

    if (paymentMethod.id == "ppec_paypal") {
      PayPal.pay({
        price: `${this.state.total}`,
        currency: Config.Currency.code,
        description: "Mr.TuoTuo订单支付 - 用户email ID: " + customerInfo.email
      })
        .then(confirm => {
          data.set_paid = true
          this.props.createOrder(data)
        })
        .catch(error => {
          console.log(error);
        });
    } else if (paymentMethod.id == "razorpay") {
      let total = new_total_amount * Constants.USD_TO_INR;
      let options = {
        description: "Credits towards consultation",
        image: "https://i.imgur.com/3g7nmJC.png",
        currency: "INR",
        key: Config.RazorpayKey,
        amount: `${this.state.total}`,
        name: "Payment with razorpay",
        prefill: {
          email: customerInfo.email
        },
        theme: { color: Colors.AppColor }
      };
      RazorpayCheckout.open(options)
        .then(response => {
          //alert(`Success: ${response.razorpay_payment_id}`);
          data.set_paid = true;
          this.props.createOrder(data);
        })
        .catch(error => {
          Alert.alert(__.t("Alert"), error.description);
          //alert(`Error: ${error.code} | ${error.description}`);
        });
    } else if (paymentMethod.id === "stripe") {
      let objPay = {
        smsAutofillDisabled: true,
        requiredBillingAddressFields: "full",
        prefilledInformation: {
          billingAddress: {
            name: customerInfo.last_name,
            line1: shippingAddress.address_1,
            city: shippingAddress.city,
            state: shippingAddress.state,
            country: shippingAddress.country,
            postalCode: shippingAddress.postcode,
            email: customerInfo.email
          }
        }
      };
      stripe
        .paymentRequestWithCardForm(objPay)
        .then(token => {
          data.set_paid = false;
          data.payment_type = "stripe";
          data.stripe_token = token.tokenId;
          data.status = "pending";
          this.props.createOrder(data);
        })
        .catch(err => {
          const cancelAction = '-3';
          if((isAndroid && error.message === cancelAction) || (isIos && error.code === cancelAction)) {
            // Cancelled by user
            console.log("cancel by user")
          }
        });
    } else {
      this.props.createOrder(data);
    }
  };

  getPriceTotal = () => {
    var total = 0;
    this.props.carts.forEach(item => {
      total += item.price * item.qty;
    });
    return total;
  };

  _storeData = async (name, values) => {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(values));
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  }

  _retrieveData = async (name) => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        // We have data!!
        return JSON.parse(value);
      }
     } catch (error) {
        return error;
       // Error retrieving data
     }
  }
  
  componentDidMount(){
    let {salesTax, shippingRate, coupon} = this.props
    let subtotal = this.getPriceTotal()
    let discount_amount   = 0;

    var new_total_amount = parseFloat(subtotal)
    var taxes = parseFloat(salesTax) * new_total_amount
    new_total_amount = new_total_amount + taxes

    if(coupon){
      if(coupon.type == "percent"){
        discount_amount = coupon.amount * subtotal
      }else if(coupon.type == "fixed_cart"){
        discount_amount = coupon.amount
      }
    }

    new_total_amount = new_total_amount - discount_amount

    this.setState({total: new_total_amount.toFixed(2), tax: taxes.toFixed(2), discount: discount_amount})
  }

  componentWillReceiveProps(props) {
    if (
      props.type == ActionTypes.CREATE_ORDER_FAIL ||
      props.type == ActionTypes.PAYMENT_STRIPE_FAIL
    ) {
      Alert.alert(props.message);
    }

    if (props.type == ActionTypes.CREATE_ORDER_SUCCESS) {
      let orderInfo = props.orderInfo;
      let customerInfo = props.customerInfo;
      if (orderInfo.payment_type === "stripe") {
        let dataStripe = {
          payment_method: "stripe",
          order_id: orderInfo.id,
          payment_token: orderInfo.stripe_token,
          total: this.state.total,
          currency: Config.Currency.code,
          customer_email: customerInfo.email,
          api_sk_key: Config.Stripe.secretKey
        };
        this.props.paymentStripe(dataStripe);
      } else {
        Alert.alert(__.t("Alert"), __.t("Order Received"));
        this.props.showCarts();
      }
    }
    if (props.type == ActionTypes.PAYMENT_STRIPE_SUCCESS) {
      Alert.alert(__.t("Alert"), __.t("Order Received"));
      this.props.showCarts();
    }
  }
}

PaymentInfo.defaultProps = {
  paymentMethods: [],
};

function mapStateToProps({ cartsReducers, authReducers }) {
  return {
    carts: cartsReducers.carts,
    type: cartsReducers.type,
    coupon: cartsReducers.coupon,
    message: cartsReducers.message,
    paymentMethods: cartsReducers.paymentMethods,
    shippingAddress: cartsReducers.shippingAddress,
    shippingMethod: cartsReducers.shippingMethod,
    customerInfo: authReducers.customerInfo,
    orderInfo: cartsReducers.orderInfo,
    salesTax: cartsReducers.salesTax,
    shippingRate: cartsReducers.shippingRate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentInfo);
