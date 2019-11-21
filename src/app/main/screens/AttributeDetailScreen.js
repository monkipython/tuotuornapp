import React from 'react'
import { AttributeDetail } from '@pages'

class AttributeDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: __.t("Attributes")
  })

  render() {
    const { navigation } = this.props
    return <AttributeDetail navigation={navigation} />
  }
}

export default AttributeDetailScreen