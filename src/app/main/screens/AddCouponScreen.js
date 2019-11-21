import React from 'react'
import {ShippingAddress} from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons,Constants} from '@common'

class AddCouponScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: "优惠卷",
  })

  render(){
    const {navigation} = this.props
    return <AddCouponScreen navigation={navigation} showShippingAddress={() => navigation.navigate(Constants.Screen.ShippingAddress)} />
  }
}

export default AddCouponScreen
