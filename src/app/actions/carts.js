import * as ActionTypes from './ActionTypes'
import * as Services from '@services'

export const addToCart = (product) => {
  return { type: ActionTypes.ADD_PRODUCT_TO_CART, product }
}

export const removeToCart = (product) => {
  return { type: ActionTypes.REMOVE_PRODUCT_TO_CART, product }
}

export const changeProductQuantity = (product, qty) => {
  return { type: ActionTypes.CHANGE_PRODUCT_QUANTITY, product, qty }
}

export const setCoupon = (coupon) => {
  return { type: ActionTypes.SET_COUPON, coupon }
}

export const getShippingRate = (weight, address) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_SHIPPING_RATE_PENDING })
    Services.getShippingRate(weight, address)
    .then((shippingRate) => {
      dispatch({ type: ActionTypes.GET_SHIPPING_RATE_SUCCESS, shippingRate })
    })
    .catch((errMsg) => {
      dispatch({ type: ActionTypes.GET_SHIPPING_RATE_FAIL, message: errMsg })
    })
  }
}

export const setShippingRate = (shippingRate) => {
  return { type: ActionTypes.SET_SHIPPING_RATE, shippingRate }
}

export const getSalesTax = (postcode, country) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_SALESTAX_PENDING })
    Services.getSalesTax(postcode, country)
    .then((salesTax) => {
      dispatch({ type: ActionTypes.GET_SALESTAX_SUCCESS, salesTax })
    })
    .catch((errMsg) => {
      dispatch({ type: ActionTypes.GET_SALESTAX_FAIL, message: errMsg })
    })
  }
}

export const setSalesTax = (salesTax) => {
  return { type: ActionTypes.SET_SALESTAX, salesTax }
}

export const getCoupon = (couponCode, customer_id) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_COUPON_PENDING })
    Services.getCoupon(couponCode, customer_id)
    .then((coupon) => {
      dispatch({ type: ActionTypes.GET_COUPON_SUCCESS, coupon })
    })
    .catch((errMsg) => {
      dispatch({ type: ActionTypes.GET_COUPON_FAIL, message: errMsg })
    })
  }
}

export const setShippingAddress = (address) => {
  return { type: ActionTypes.SET_SHIPPING_ADDRESS, address }
}

export const getShippingMethods = () => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_SHIPPING_METHODS_PENDING })

    Services.getShippingMethods()
      .then((shippingMethods) => {
        shippingMethods.forEach((item)=>{
          if(item.id == "wc_services_usps"){
            shippingMethods.pop();
          }else if(item.id == "flat_rate"){
            item.title = "普通运费"
          }
        })
        dispatch({ type: ActionTypes.GET_SHIPPING_METHODS_SUCCESS, shippingMethods })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_SHIPPING_METHODS_FAIL, message: errMsg })
      })
  }
}

export const setOrderStatus = (orderStatus) => {
  return { type: ActionTypes.ORDER_STATUS, orderStatus }
}

export const setShippingMethod = (shippingMethod) => {
  return { type: ActionTypes.SET_SHIPPING_INFO, shippingMethod }
}

export const getPaymentMethods = () => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_PAYMENT_METHODS_PENDING })
    Services.getPaymentMethods()
      .then((paymentMethods) => {
        dispatch({ type: ActionTypes.GET_PAYMENT_METHODS_SUCCESS, paymentMethods })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_PAYMENT_METHODS_FAIL, message: errMsg })
      })
  }
}

export const createOrder = (params) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.CREATE_ORDER_PENDING })

    Services.createOrder(params)
      .then((response) => {
        let orderInfo = response
        orderInfo.payment_type = params.payment_type
        orderInfo.stripe_token = params.stripe_token
        dispatch({ type: ActionTypes.CREATE_ORDER_SUCCESS, orderInfo })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.CREATE_ORDER_FAIL, message: errMsg })
      })
  }
}

export const getMyOrders = (customer_id, page) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_MY_ORDERS_PENDING })

    Services.getMyOrders(customer_id, page)
      .then((orders) => {
        dispatch({ type: ActionTypes.GET_MY_ORDERS_SUCCESS, orders })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_MY_ORDERS_FAIL, message: errMsg })
      })
  }
}

export const paymentStripe = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.PAYMENT_STRIPE_PENDING })
    Services.paymentStripe(data)
      .then((stripeInfo) => {
        dispatch({ type: ActionTypes.PAYMENT_STRIPE_SUCCESS })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.PAYMENT_STRIPE_FAIL, message: errMsg })
      })
  }
}
