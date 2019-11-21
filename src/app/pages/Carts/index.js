import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage
} from 'react-native'
import styles from './style'
import { Text, CartItem, Button, HInput, Input} from '@components'
import { Config, Constants, Global } from '@common'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'
import * as Services from '@services'

class Carts extends React.Component {
  state = {
    couponCode: '',
    total: 0,
    old_total: 0,
    isCoupon: false,
    isDiscount: false,
    discount: 0,
  }

  render() {
    let { carts, isRequesting } = this.props
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : 0
    let total     = (typeof carts == "undefined") ? 0 : this.getPriceTotal()
    let new_total     = total - this.state.discount
    return (
      <SafeAreaView style={styles.container}>
          {carts.length == 0 && this.renderEmptyList()}
          {carts.length > 0 && (
            <FlatList
              contentContainerStyle={styles.list}
              keyExtractor={(item, index) => `${index}`}
              data={carts}
              renderItem={({ item }) => <CartItem item={item} onRemove={this.removeToCart} />}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset} enabled>
          {carts.length > 0 && (
            <View style={[styles.couponView, this.state.isCoupon ? styles.validCoupon : styles.inValidCoupon]}>
                <Input style={styles.couponInput} placeholder={__.t('Coupon Code')}
                    value={this.state.couponCode}
                    maxLength={6}
                    onChangeText={(couponCode)=>this.updateCoupon(couponCode)}
                    onFocus={()=>this.setState({couponCode:''})}
                    onBlur={(evt)=>this.checkCoupon(evt.nativeEvent.text, total)}
                    />
            </View>
          )}
          {total > 0 && (
            <View style={styles.totalContainer}>
              {this.state.isDiscount && (
                <View style={styles.totalContent}>
                  <Text style={styles.new_totalLabel}>{__.t('Total')}:</Text>
                  <Text style={styles.old_total}>{Config.Currency.symbol}{total.toFixed(2)}</Text>
                  <Text style={styles.new_total}>{Config.Currency.symbol}{new_total.toFixed(2)}</Text>
                </View>
              )}
              {!this.state.isDiscount && (
                <View style={styles.totalContent}>
                  <Text style={styles.totalLabel}>{__.t('Total')}:</Text>
                  <Text style={styles.total}>{Config.Currency.symbol}{total.toFixed(2)}</Text>
                </View>
              )}
              <Button title={__.t('Checkout')} loading={isRequesting} style={styles.btnCheckout} onPress={this.checkout} />
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  updateCoupon = (couponCode) => {
    this.setState({couponCode: couponCode})
  }

  checkCoupon = (couponCode, total) => {
    let {customerInfo} = this.props
    if(couponCode.length >= 6 && couponCode != ''){
      Services.getCoupon(couponCode, customerInfo.id).then((result) => {
        let _coupon = result.coupon
        let discount = 0;
        if(_coupon.minimum_amount > total){
          Alert.alert(__.t('Alert'), _coupon.description) 
          this.setState({discount: 0,isDiscount: false, couponCode: ''})
        }else if(_coupon.minimum_amount <= total && _coupon.usage_count <= _coupon.usage_limit){
          if(_coupon.type == "percent"){
            discount = (_coupon.amount / 100) * total;
          }else if(_coupon.type == "fixed_cart"){
            discount = _coupon.amount
          }
          this.setState({discount:discount, isDiscount:true})
          this.props.setCoupon(_coupon)
        }else if(_coupon.usage_count > _coupon.usage_limit){
          Alert.alert(__.t('Alert'), "优惠卷已用完") 
          this.setState({discount:0, isDiscount: false})
        }
      }).catch(function(error) {
        this.setState({discount:0, isDiscount: false})
      });
    }else{
      Alert.alert(__.t('Alert'), "请输入有效优惠卷代码") 
      this.setState({discount:0, isDiscount: false})
    }
  }

  renderEmptyList = () => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.message}>{__.t('Empty List')}</Text>
      </View>
    )
  }

  removeToCart = (item) => {
    this.props.removeToCart(item)
  }

  getPriceTotal = () => {
    let {carts} = this.props
    var total = 0
    carts.forEach((item) => {
      total += item.price * item.qty
    })
    return total
  }

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

  checkout = () => {
    if(this.getPriceTotal() < 50){
      return Alert.alert(__.t('Alert'), "该平台最低消费$50～")
    }
    let {customerInfo} = this.props
    if(customerInfo){
      this.props.getCoupon(this.state.couponCode, customerInfo.id)
      this.props.showShippingAddress()
    }else{
      this.isLogin = true
      this.props.signIn()
    }
  }

  componentWillReceiveProps(props) {
    if (props.type == ActionTypes.SIGN_IN_SUCCESS && this.isLogin == true) {
      this.isLogin = false
      this.props.showShippingAddress()
    }

  }

  signOut = () => {
    this.props.signOut()
  }

  componentDidMount = () => {
    this.setState({total: this.getPriceTotal()})
    this.onLogout = Global.EventEmitter.addListener(Constants.EventEmitterName.onLogout, this.signOut)
  }

  componentWillUnmount = () => {
    this.onLogout.remove()
  }

}

Carts.defaultProps = {
  type: false,
  cartType: false,
  customerInfo: null
}

function mapStateToProps({ cartsReducers, authReducers }) {
  return {
    carts: cartsReducers.carts,
    reload: cartsReducers.reload,
    coupon: cartsReducers.coupon,
    type: authReducers.type,
    cartType: cartsReducers.type,
    customerInfo: authReducers.customerInfo,
    isRequesting: authReducers.type == ActionTypes.GET_CUSTOMER_INFO_PENDING
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Carts)
