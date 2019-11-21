import React from "react";
import {
  Image,
  View,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  Platform,
  findNodeHandle
} from "react-native";
import styles from "./style";
import { Utils, Colors } from "@common";
import { BlurView, VibrancyView } from "react-native-blur";

import { connect } from "react-redux";
import { ActionCreators } from "@actions";
import { bindActionCreators } from "redux";
import * as ActionTypes from "@actions/ActionTypes";

import { Text } from "@components";

class UserInfo extends React.Component {

  state = { 
    viewRef: null,
  };

  render() {
    let { customerInfo, signOut, signIn, onSelectPhoto, getAvatar } = this.props;

    var name = "";
    if (
      customerInfo &&
      customerInfo.first_name != undefined &&
      customerInfo.first_name != "" &&
      customerInfo.last_name != undefined &&
      customerInfo.last_name != ""
    ) {
      name = customerInfo.first_name + " " + customerInfo.last_name;
    } else if (customerInfo) {
      name = customerInfo.email;
    }
    console.log("user info");
    return (
      <View style={styles.container}>
        {Utils.isNotEmpty(name) ? (
          <View style={styles.content}>
            <View style={{ marginTop: 20 }} />
            <TouchableOpacity onPress={onSelectPhoto}>
              <Image 
                source={{ uri: getAvatar }} 
                style={styles.avatar} />
            </TouchableOpacity>
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity
              style={styles.btnSign}
              activeOpacity={0.75}
              onPress={signOut}
            >
              <Text style={styles.txtButton}>
                {__.t("Sign Out").toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.content}>
            <Text style={styles.textWelcome}>{__.t("Welcome")}</Text>
            <TouchableOpacity
              style={styles.btnSign}
              activeOpacity={0.75}
              onPress={signIn}
            >
              <Text style={styles.txtButton}>
                {__.t("Sign In").toUpperCase()}
                {" / "}
                {__.t("Sign Up").toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

UserInfo.defaultProps = {
  customerInfo: null
};

function mapStateToProps({ authReducers }) {
  return {
    customerInfo: authReducers.customerInfo,
    message: authReducers.message
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
