import React from 'react'
import { View, SafeAreaView, Platform, WebView, ActivityIndicator, Dimensions } from 'react-native'
import { Header } from 'react-navigation';
import styles from './styles'
import HTML from 'react-native-render-html'

class Reviews extends React.Component {
  state = {
    url: "https://tuotuobuy.com/webview/reviews.php?product_id=",
    visible: true
  }

  render() {
    let {height, width} = Dimensions.get('window');
    let productId = (this.props.navigation.state.params.reviews.id > 0 || this.props.navigation.state.params.reviews.id != undefined) ? this.props.navigation.state.params.reviews.id : 0;
    let productReviewUri = this.state.url + productId
    return (
      <SafeAreaView style={styles.container}>
          <WebView 
          onLoad={() => this.hideSpinner()}
          source={{ uri:productReviewUri }} 
          scalesPageToFit={true} />
          {this.state.visible &&
          (<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height: height - Header.HEIGHT, width: width, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" />
          </View>)}
      </SafeAreaView>
    )
  }

  hideSpinner() {
    this.setState({ visible: false });
  }
}

export default Reviews