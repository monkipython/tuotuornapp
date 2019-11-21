import React from 'react'
import { Reviews } from '@pages'

class ReviewsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: __.t("Reviews")
  })

  render() {
    const { navigation } = this.props
    return <Reviews navigation={navigation} />
  }
}

export default ReviewsScreen