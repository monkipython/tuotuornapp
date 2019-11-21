import React from 'react'
import { CouponsList } from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons} from '@common'

class CouponsListScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: __.t('Coupons'),
  })

  render(){
    const {navigation} = this.props
    return <CouponsList navigation={navigation} />
  }
}

export default CouponsListScreen
