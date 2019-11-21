import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  WebView,
  ActivityIndicator,
  Dimensions,
  Image
} from 'react-native'
import styles from './style'
import {OrderItem} from '@components'
import {Constants, Icons} from '@common'
import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'
import { Header } from 'react-navigation'
import WebViewBridge from 'react-native-webview-bridge';

class ForgotPass extends React.Component {
  state = {
    url: "https://tuotuobuy.com/webview/resetpass.php",
    visible: true
  }

  render(){
    let {customerInfo, goBack} = this.props;
    let {height, width} = Dimensions.get('window');
    let productReviewUri = this.state.url
    return (
      <SafeAreaView style={styles.container}>
        <Image source={Icons.Logo} style={styles.logo} />
          <WebViewBridge
            ref="webviewbridge"
            onLoad={() => this.hideSpinner()}
            onBridgeMessage={this.onBridgeMessage.bind(this)}
            javaScriptEnabled={true}
            scalesPageToFit={true}
            source={{uri: productReviewUri}}/>
          {this.state.visible &&
          (<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height: height - Header.HEIGHT, width: width, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" />
          </View>)}
        <TouchableOpacity style={styles.btnClose} onPress={goBack}>
          <Image source={Icons.Close} style={styles.closeIcon} />
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  onBridgeMessage(message){}

  componentDidMount(){}

  hideSpinner() {
    this.setState({ visible: false });
  }

}


ForgotPass.defaultProps = {}

function mapStateToProps({authReducers}){
  return {
    customerInfo:authReducers.customerInfo
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ForgotPass)
