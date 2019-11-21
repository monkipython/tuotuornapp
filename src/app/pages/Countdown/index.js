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
import styles from './styles'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'
import { Header } from 'react-navigation'
import { Constants } from '@common'
import WebViewBridge from 'react-native-webview-bridge';

class Countdown extends React.Component {

  state = {
    url: "https://tuotuobuy.com/webview/countdown.php",
    visible: true
  }

  render(){
    let { showDetail } = this.props; 
    let {height, width} = Dimensions.get('window');
    let productReviewUri = this.state.url
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
    if(json.type == "view_product") {
        console.log("countdown to details");
        console.log(json.product);
        json.product.name = json.product.title;
        navigation.navigate(Constants.Screen.Detail,{product:json.product});
    }else if(json.type == "success"){
        webviewbridge.sendToBridge("success");
    }
  }

  componentDidMount(){
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

}


Countdown.defaultProps = {
  products:[],
}

function mapStateToProps({productsByCategoryReducers,authReducers}){
  return {
    products: typeof productsByCategoryReducers.productsByCategory != "undefined" ? productsByCategoryReducers.productsByCategory.products : [],
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Countdown)
