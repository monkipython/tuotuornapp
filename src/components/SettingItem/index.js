import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {Text} from '@components'
import { connect } from "react-redux";
import { ActionCreators } from "@actions";
import { bindActionCreators } from "redux";
import * as ActionTypes from "@actions/ActionTypes";

class SettingItem extends React.Component {
  render(){
    let {icon,title,onPress,orderStatus} = this.props
    return (

      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            <View >
                <Image source={icon} style={styles.LeftIconStyle}/>
            </View>
            <View >
                <Text style={styles.textItem}> {title} </Text>
            </View>
            <View style={styles.RightIcon}>
                <Image source={Icons.RightIcon} style={styles.RightIconStyle} />
            </View>
            {orderStatus > 0 && title == "我的订单" && (
              <View style={styles.badge}>
              </View>
            )}
        </View>
      </TouchableOpacity>
    )
  }
}

SettingItem.defaultProps = {}

function mapStateToProps({cartsReducers}){
  return {
    orderStatus:cartsReducers.orderStatus,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SettingItem)
