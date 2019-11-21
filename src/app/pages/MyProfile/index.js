import React from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
  Share,
  Linking,
  Alert
} from 'react-native'
import styles from './style'
import { Icons, Global, Constants, Config, Colors } from '@common'
var config = Config.WoocommerceConfig
import { UserInfo, SettingItem } from '@components'
import Mailer from 'react-native-mail';

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'
import OneSignal from 'react-native-onesignal';
import ImagePicker from 'react-native-image-picker';

// More info on all the options is below in the API Reference... just some common use cases shown here

class MyProfile extends React.Component {

  state = {
    avatar_url: "https://tuotuobuy.com/wp-content/uploads/2018/11/dc18ccf2aa4abfd2c516d52d065aa372-1.jpg",
  }

  render() {
    
    let { showCouponsList, showTerms, showNotification, showCommentsList, showWishList, showLanguages, showMyAddress, showFeedback, showMyOrders, customerInfo, signIn } = this.props

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <UserInfo signIn={signIn} getAvatar={this.state.avatar_url} onSelectPhoto={this.onSelectPhoto}/>
          <View style={styles.Group}>
            {customerInfo && <SettingItem icon={Icons.Shipping} title={__.t('My Orders')} onPress={showMyOrders} />}
            {customerInfo && <SettingItem icon={Icons.Address} title={__.t('My Address Book')} onPress={showMyAddress} />}
            <SettingItem icon={Icons.FavoriteSelected} title={__.t('My WishList')} onPress={showWishList} />
            {customerInfo && <SettingItem icon={Icons.Comments} title={__.t('My Comments')} onPress={showCommentsList} />}
             {customerInfo && <SettingItem icon={Icons.Coupons} title={__.t('Coupons')} onPress={showCouponsList} />}
          </View>
          <View style={styles.Group}>
            <SettingItem icon={Icons.Feedback} title={__.t('Support')} onPress={showFeedback} />
            {customerInfo && <SettingItem icon={Icons.Notification} title={__.t('Notification Setting')} onPress={showNotification} />}
          </View>
          <View style={styles.Group}>
            <SettingItem icon={Icons.Share} title={__.t('Share App')} onPress={this.shareApp} />
            <SettingItem icon={Icons.Star} title={__.t('Rate App')} onPress={this.rateApp} />
            <SettingItem icon={Icons.Info} title={__.t('Privacy Policy And Terms Of Service')} onPress={showTerms} />
            {customerInfo && <SettingItem icon={Icons.SignOut} title={__.t('Sign Out')} onPress={this.signOut} />}
          </View>
        </ScrollView>
        </SafeAreaView>
    )
  }

  shareApp = () => {
    Share.share({
      title: "Mr.TuoTuo",
      message: "Mr.TuoTuo作为北美最大华人线上生鲜超市，平台提供生鲜食 材，水果蔬菜，零食美妆，日用百货等优质商品。平台销售 的产品主要包括水果，肉类，海鲜，蔬菜，餐馆菜等。",
      url: "https://www.tuotuobuy.com/"
    })
  }

  rateApp = () => {
    Linking.openURL("https://www.tuotuobuy.com/")
  }

  signOut = () => {
    this.props.signOut()
    if(!this.props.customerInfo){
      OneSignal.logoutEmail((error) => {
          if (error) {
              console.log("Encountered error while attempting to log out: ", error);
          } else {
              console.log("Logged out successfully");
          }
      });
    }
  }

  componentDidMount = () => {
    let { customerInfo } = this.props
    if(customerInfo){
      this.setState({
        avatar_url: customerInfo.avatar_url
      });
    }
    
    this.onLogout = Global.EventEmitter.addListener(Constants.EventEmitterName.onLogout, this.signOut)
  }

  componentWillUnmount = () => {
    this.onLogout.remove()
  }

  onSelectPhoto = () => {
    
    const options = {
      title: __.t('Select Avatar'),
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        
        const fileURL = response.uri;
        const cleanURL = fileURL.replace("file://", "");
        
        var Extension = fileURL.substring(fileURL.lastIndexOf('.') + 1).toLowerCase();
        var filename = fileURL.substring(fileURL.lastIndexOf('/') + 1).toLowerCase();

        var fileType = "image/jpeg";

        if(Extension == "gif"){
          fileType = "image/gif";
        }else if(Extension == "png"){
          fileType = "image/png";
        }else if(Extension == "jpg"){
          fileType = "image/jpeg";
        }

        const data = new FormData();
        data.append('id', this.props.customerInfo.id); 
        data.append('file', {
          uri: cleanURL,
          type: fileType, 
          name: filename
        });

        var url = config.endpoint + "/wp-json/wp/v2/upload_avatar";

        this.requestUpdateAvatar(url, data);

      }
    });
  }

  async requestUpdateAvatar(url, data){

    const response = await fetch(url, {
      method: 'POST',
      body: data
    });

    const json = await response.json();

    console.log(json);

    if(json.success != undefined || json.success != false){
      this.setState({
        avatar_url: json.data.filename
      });
    }
  }
}

MyProfile.defaultProps = {
  customerInfo: false
}

function mapStateToProps({ authReducers, cartsReducers }) {
  return {
    orderStatus: cartsReducers.orderStatus,
    customerInfo: authReducers.customerInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)
