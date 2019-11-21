import React from 'react'
import {ForgotPass} from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons} from '@common'

class ForgotPassScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header:null
  })

  render(){
    const {navigation} = this.props
    return <ForgotPass navigation={navigation} 
    		goBack={()=>navigation.goBack()}
    		/>
  }
}

export default ForgotPassScreen
