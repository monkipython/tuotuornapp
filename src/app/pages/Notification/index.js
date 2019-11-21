import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Text
} from 'react-native'
import styles from './style'
import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import {Icons,Utils,Colors} from '@common'
import {NotificationItem} from '@components'
import * as ActionTypes from '@actions/ActionTypes'
import OneSignal from 'react-native-onesignal';
import ToggleSwitch from 'toggle-switch-react-native'

class Notification extends React.Component {

  state ={
    notificationStatus: true,
  }

  render(){
    let {customerInfo} = this.props

    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.group}>
            <View style={styles.left}>
              <Text style={styles.text}>{__.t('Turn on/off notification')}</Text>
            </View>
            <View style={styles.right}>
              <ToggleSwitch
                isOn={this.state.notificationStatus}
                onColor={Colors.AppColor}
                offColor={Colors.gray}
                onToggle={ (isOn) => this.updateNotificationStatus(isOn)} />
            </View>
          </View>
      </SafeAreaView>
    )
  }

  updateNotificationStatus = (status)=>{
    let {customerInfo} = this.props
    this._storeNotificationSetting(status);
    if(status == true){
      OneSignal.setEmail(customerInfo.email, (error) => {
          console.log("Sent email with error: ", error);
      });
    }else{
      OneSignal.logoutEmail((error) => {
          if (error) {
              console.log("Encountered error while attempting to log out: ", error);
          } else {
              console.log("Logged out successfully");
          }
      });
    }
  }

  componentdidmount(){
    this._retrieveNotificationSetting();
  }

  _retrieveNotificationSetting = async () => {
    try {
      const value = await AsyncStorage.getItem('notification_isOn');
      if (value !== null) {
        // We have data!!
        this.setState({notificationStatus: JSON.parse(value)});
      }
     } catch (error) {
       // Error retrieving data
       console.log(error);
     }
  }

  _storeNotificationSetting = async (isOn) => {
    try {
      this.setState({notificationStatus: isOn});
      await AsyncStorage.setItem('notification_isOn', JSON.stringify(isOn));
      // We have data!!
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }
}


Notification.defaultProps = {
  customerInfo:null,
}

function mapStateToProps({authReducers}){
  return {
    customerInfo:authReducers.customerInfo,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Notification)
