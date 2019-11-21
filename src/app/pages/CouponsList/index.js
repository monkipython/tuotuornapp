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

class CouponsList extends React.Component {
  state = {
    url: "https://tuotuobuy.com/webview/coupons.php?customer_id=",
    visible: true
  }

  render(){
    let {customerInfo} = this.props;
    if(!customerInfo){
      return (
        <View/>
      )
    }
    let {height, width} = Dimensions.get('window');
    let productReviewUri = this.state.url + customerInfo.id
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

  componentDidMount(){
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

}


CouponsList.defaultProps = {
  coupons:[],
}

function mapStateToProps({cartsReducers,authReducers}){
  return {
    customerInfo:authReducers.customerInfo
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CouponsList)
