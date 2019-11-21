import React from "react";
import { MyProfile } from "@pages";
import { NavButton, NavTitle, TabBarItem } from "@components";
import { Icons, Constants, Global } from "@common";

class MyProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: __.t('My Profile')
  });

  componentDidMount = () => {
    this.onLogin = Global.EventEmitter.addListener(
      Constants.EventEmitterName.onLogin,
      this.onLogin
    );
  };

  componentWillUnmount = () => {
    this.onLogin.remove();
  };

  onLogin = () => {
    this.props.navigation.navigate(Constants.Screen.SignIn);
  };

  render() {
    const { navigation } = this.props;
    return (
      <MyProfile
        navigation={navigation}
        signIn={() => navigation.navigate(Constants.Screen.SignIn)}
        showWishList={() => navigation.navigate(Constants.Screen.MyWishList)}
        showCouponsList={() => navigation.navigate(Constants.Screen.CouponsList)}
        showCommentsList={() => navigation.navigate(Constants.Screen.CommentsList)}
        showMyAddress={() => navigation.navigate(Constants.Screen.MyAddress)}
        showFeedback={() => navigation.navigate(Constants.Screen.Feedback)}
        showTerms={() => navigation.navigate(Constants.Screen.Terms)}
        showMyOrders={() => navigation.navigate(Constants.Screen.MyOrders)}
        showNotification={()=> navigation.navigate(Constants.Screen.Notification)}
      />
    );
  }
}

export default MyProfileScreen;
