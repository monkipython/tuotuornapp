import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  ScrollView
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {ShippingMethods,Button} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class ShippingInfo extends React.Component {
  state = {
    shippingMethod:null,
  }

  render(){
    let {shippingMethods,type} = this.props
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <ShippingMethods shippingMethods={shippingMethods} onSelectShippingMethod={this.onSelectShippingMethod} />
        </View>
        </ScrollView>
        <Button title={__.t('Submit')} style={styles.btnSubmit} onPress={this.onSubmit} loading={type == ActionTypes.GET_PAYMENT_METHODS_PENDING}/>
      </SafeAreaView>
    )
  }

  onSelectShippingMethod = (item) => {
    this.setState({shippingMethod:item})
  }

  onSubmit = ()=>{
    let {shippingMethod} = this.state
    let {shippingAddress} = this.props

    if (shippingMethod == null) {
      return Alert.alert(__.t('Alert'), __.t('Please choose shipping method'))
    }

    this.props.setShippingMethod(shippingMethod)
    this.props.getPaymentMethods()
  }

  componentWillReceiveProps(props){
    if (props.type == ActionTypes.GET_PAYMENT_METHODS_FAIL) {
      Alert.alert(__.t('Alert'), props.message)
    }

    if (props.type == ActionTypes.GET_PAYMENT_METHODS_SUCCESS) {
      this.props.showPaymentInfo()
    }
  }

  componentDidMount(){
  }
}

ShippingInfo.defaultProps = {
  shippingMethods:[]
}

function mapStateToProps({cartsReducers,authReducers}){
  return {
    type:cartsReducers.type,
    message:cartsReducers.message,
    shippingMethods:cartsReducers.shippingMethods,
    shippingAddress:cartsReducers.shippingAddress,
    salesTax:cartsReducers.salesTax,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ShippingInfo)
