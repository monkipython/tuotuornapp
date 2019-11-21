import React from 'react'
import { OrderInfo } from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons} from '@common'

class OrderInfoScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: __.t('Order Information'),
  })

  render(){
    const {navigation} = this.props
    return <OrderInfo navigation={navigation} />
  }
}

export default OrderInfoScreen
