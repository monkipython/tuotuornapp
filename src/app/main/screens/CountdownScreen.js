import React from 'react'
import { Countdown } from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons} from '@common'

class CountdownScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: __.t('Countdown'),
  })

  render(){
    const {navigation} = this.props
    return <Countdown navigation={navigation} />
  }
}

export default CountdownScreen
