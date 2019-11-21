import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {Input,Button} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class AddCoupon extends React.Component {

	state = {
		coupon: ""
	}

	render(){
	    let {type, showAddCoupon} = this.props

	    if (this.props.customerInfo == null) {
	      return <View />
	    }

	    return (
	      <SafeAreaView style={styles.container}>
	        <View style={styles.content}>
	        	<Input placeholder={__.t('Coupon Code')}
		            value={this.state.coupon}
		            onChangeText={(coupon)=>this.setState({coupon})}
		            />
	        </View>
	        <Button title={__.t('Submit')} style={styles.btnSubmit} onPress={this.onSubmit} loading={type == ActionTypes.ADD_COUPON}/>
	      </SafeAreaView>
	    )
	}

	onSubmit = () => {
		let {coupon} = this.state;
		this.props.addCoupon(coupon);
		this.props.getShippingAddress();
	}
}

AddCoupon.defaultProps = {
  customerInfo:{},
  addCoupon:"",
}

function mapStateToProps({cartsReducers,authReducers}){
  return {
    type:cartsReducers.type,
    message:cartsReducers.message,
    customerInfo:authReducers.customerInfo,
    addCoupon: cartsReducers.addCoupon
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AddCoupon)