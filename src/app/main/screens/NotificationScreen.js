import React from 'react'
import { Notification } from '@pages'

class NotificationScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: __.t("Notification Setting"),
  })

  render() {
    const { navigation } = this.props
    return <Notification navigation={navigation} />
  }
}

export default NotificationScreen