import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  WebView,
  ActivityIndicator,
  Dimensions
} from 'react-native'
import styles from './style'
import {OrderItem} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'
import { Header } from 'react-navigation'
import WebViewBridge from 'react-native-webview-bridge';

class OrderInfo extends React.Component {
  state = {
    url: "https://tuotuobuy.com/webview/orderdetail.php",
    visible: true
  }

  render(){
    let {customerInfo, navigation} = this.props;
    let {height, width} = Dimensions.get('window');
    let order_id = navigation.state.params.order_id
    let orderDetailReviewUri = this.state.url + "?customer_id=" + customerInfo.id + "&order_id=" + order_id
    console.log(orderDetailReviewUri);
    return (
      <SafeAreaView style={styles.container}>
          <WebViewBridge
            ref="webviewbridge"
            onLoad={() => this.hideSpinner()}
            onBridgeMessage={this.onBridgeMessage.bind(this)}
            javaScriptEnabled={true}
            scalesPageToFit={true}
            source={{uri: orderDetailReviewUri}}/>
          {this.state.visible &&
          (<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height: height - Header.HEIGHT, width: width, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" />
          </View>)}
      </SafeAreaView>
    )
  }

  onBridgeMessage(message){
    console.log(message);
  }

  componentDidMount(){
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

}


OrderInfo.defaultProps = {
}

function mapStateToProps({cartsReducers,authReducers}){
  return {
    customerInfo:authReducers.customerInfo
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderInfo)
