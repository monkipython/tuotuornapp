import React from 'react'
import { Terms } from '@pages'

class TermsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: __.t("Privacy Policy And Terms Of Service"),
  })

  render() {
    const { navigation } = this.props
    return <Terms navigation={navigation} />
  }
}

export default TermsScreen