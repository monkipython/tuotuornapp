import React from 'react'
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  WebView,
  ActivityIndicator,
  Dimensions
} from 'react-native'
import styles from './style'
import {Constants} from '@common'
import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'
import { Header } from 'react-navigation'
import WebViewBridge from 'react-native-webview-bridge';

class Terms extends React.Component {
  state = {
    url: "https://tuotuobuy.com/webview/terms.php",
    visible: true
  }

  render(){
    let {height, width} = Dimensions.get('window');
    let productReviewUri = this.state.url
    return (
      <SafeAreaView style={styles.container}>
          <WebViewBridge
            onLoad={() => this.hideSpinner()}
            javaScriptEnabled={true}
            scalesPageToFit={true}
            source={{uri: productReviewUri}}/>
          {this.state.visible &&
          (<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height: height - Header.HEIGHT, width: width, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" />
          </View>)}
      </SafeAreaView>
    )
  }

  componentDidMount(){

  }

  hideSpinner() {
    this.setState({ visible: false });
  }

}


Terms.defaultProps = {}

function mapStateToProps({cartsReducers,authReducers}){
  return {
    customerInfo:authReducers.customerInfo
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Terms)
