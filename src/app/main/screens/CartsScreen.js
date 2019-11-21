import React from 'react'
import { Carts } from '@pages'
import { NavButton, NavTitle, TabBarItem } from '@components'
import { Icons, Constants, Global } from '@common'

class CartsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavTitle />,
  })

  componentDidMount = () => {
    this.onLogin = Global.EventEmitter.addListener(Constants.EventEmitterName.onLogin, this.onLogin)
  }

  componentWillUnmount = () => {
    this.onLogin.remove()
  }

  onLogin = () => {
    this.props.navigation.navigate(Constants.Screen.SignIn)
  }

  render() {
    const { navigation } = this.props
    return <Carts
      navigation={navigation}
      signIn={() => navigation.navigate(Constants.Screen.SignIn)}
      showShippingAddress={() => navigation.navigate(Constants.Screen.ShippingAddress)} />
  }
}

export default CartsScreen
