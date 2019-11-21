import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  WebView,
  ActivityIndicator,
  Dimensions
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import { Header } from 'react-navigation'

class Feedback extends React.Component {
  state = {
    url: "https://tuotuobuy.com/webview/support.php",
    visible: true
  }

  render(){
    let {height, width} = Dimensions.get('window');
    return (
      <SafeAreaView style={styles.container}>
        <WebView 
          onLoad={() => this.hideSpinner()}
          source={{ uri: this.state.url }} 
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

export default Feedback
