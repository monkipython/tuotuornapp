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
import {Constants} from '@common'
import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'
import { Header } from 'react-navigation'
import WebViewBridge from 'react-native-webview-bridge';

class MyOrders extends React.Component {
  state = {
    url: "https://tuotuobuy.com/webview/myorder.php?customer_id=",
    visible: true
  }

  render(){
    let {customerInfo} = this.props;
    let {height, width} = Dimensions.get('window');
    let productReviewUri = this.state.url + customerInfo.id
    return (
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    )
  }

  onBridgeMessage(message){
    const { navigation } = this.props;
    const { webviewbridge } = this.refs;
    var json = JSON.parse(message);
    if(json.type == "view_order") {
        navigation.navigate(Constants.Screen.OrderInfo,{order_id:json.order_id});
    }
  }

  componentDidMount(){
    this.props.setOrderStatus(0)
    //this.props.getMyOrders(this.props.customerInfo.id,1)
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

}


MyOrders.defaultProps = {}

function mapStateToProps({cartsReducers,authReducers}){
  return {
    customerInfo:authReducers.customerInfo
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(MyOrders)
