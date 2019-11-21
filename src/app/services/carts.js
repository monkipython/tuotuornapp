import { Constants } from '@common'
import WService from './helper/WService'

var wservice = new WService()

export const getShippingMethods = () => {
  return new Promise((resolve, reject) => {

    wservice.getShippingMethods()
      .then((response) => {
        if (response.statusCode == 200) {
          if (response.body.length > 0) {
            resolve(response.body)
          } else {
            reject(__.t("Don't have any shipping methods at your address"))
          }
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}
export const getShippingRate = (weight, address) => {
  return new Promise((resolve, reject) => {

    wservice.getShippingRate(weight, address)
    .then((response) => {
        if (response) {
          var shipping_rate = response.body.success == false ? 0 : response.body.data.shipping_rate;
          resolve(shipping_rate)
        } else {
          reject(__.t("Postcode not found in our database"))
        }
      })
      .catch(reject)
  })
}


export const getSalesTax = (postcode, country) => {
  return new Promise((resolve, reject) => {

    wservice.getSalesTax(postcode, country)
      .then((response) => {
        if (response) {

          var tax_rate = response.body.success == false ? 0 : response.body.data.tax_rate;
          resolve(tax_rate)
        } else {
          reject(__.t("Postcode not found in our database"))
        }
      })
      .catch(reject)
  })
}

export const getCoupon = (couponCode, customer_id) => {
  return new Promise((resolve, reject) => {

    wservice.getCoupon(couponCode, customer_id)
      .then((response) => {
        if (response.statusCode == 200) {
          if (response.body.success == true) {
            resolve(response.body.data)
          } else {
            reject(response.body.data.errors[0].message)
          }
        } else {
          reject(__.t("Invalid Coupon Code"))
        }
      })
      .catch(reject)
  })
}

export const getPaymentMethods = () => {
  return new Promise((resolve, reject) => {

    wservice.getPaymentMethods()
      .then((response) => {
        if (response.statusCode == 200) {
          resolve(response.body)
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const createOrder = (params) => {
  return new Promise((resolve, reject) => {
    wservice.createOrder(params)
      .then((response) => {
        if (response.statusCode == 201) {
          resolve(response.body)
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const getMyOrders = (customer_id, page) => {
  return new Promise((resolve, reject) => {
    wservice.getMyOrders(customer_id, page, Constants.Api.Limit)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve(response.body)
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const setOrderStatus= (orderStatus) => {
  console.log(orderStatus);
  return orderStatus;
}

export const paymentStripe = (data) => {
  return new Promise((resolve, reject) => {
    wservice.paymentStripe(data)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve(response)
        } else {
          reject(response.body.message)
        }
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}
