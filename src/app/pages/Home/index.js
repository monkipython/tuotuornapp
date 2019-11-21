import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  LayoutAnimation,
  ActivityIndicator,
  RefreshControl,
  Alert
} from "react-native";
import styles from "./style";
import {
  SearchBar,
  Promotions,
  BrowserByCategory,
  Brands,
  Products
} from "@components";

import { connect } from "react-redux";
import { ActionCreators } from "@actions";
import { bindActionCreators } from "redux";
import * as ActionTypes from "@actions/ActionTypes";
import OneSignal from 'react-native-onesignal';
import { Config, Constants, Global } from "@common";

class Home extends React.Component {
  state = {
    loading: true,
    refreshing: false
  };

  render() {
    let {
      categories,
      homeProducts,
      showDetail,
      openProductsByCategory
    } = this.props;

    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
          <Promotions
            promotions={Config.Promotions}
            onPress={openProductsByCategory}
          />
          <Brands brands={Config.Brands} onPress={openProductsByCategory}/>
          {categories.length > 0 && (
            <BrowserByCategory
              categories={categories}
              onPress={openProductsByCategory}
            />
          )}
          {homeProducts.length > 0 &&
            homeProducts.map((item, index) => (
              <Products
                style={styles.product}
                key={index}
                seeAll={true}
                sectionTitle={item.categoryName}
                category={item.category}
                products={item.products}
                onPress={showDetail}
                onClickSeeAll={openProductsByCategory}
              />
            ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  componentDidMount() {
    
    OneSignal.init(Config.OneSignalAppId, {kOSSettingsKeyAutoPrompt : true});
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

    let {customerInfo} = this.props
    if(customerInfo)
      OneSignal.setEmail(customerInfo.email, (error) => {
          console.log("Sent email with error: ", error);
      });
    if (this.props.categories.length > 0) {
      this.props.getProductsForHome(this.props.categories);
    } else {
      this.syncing = false;
    }
    this.props.getCategories();
    this.onLogout = Global.EventEmitter.addListener(
      Constants.EventEmitterName.onLogout,
      this.signOut
    );
  }

  fetchData = () =>{
    if (this.props.categories.length > 0) {
      this.props.getProductsForHome(this.props.categories);
    } else {
      this.syncing = false;
    }
    this.props.getCategories();
    this.onLogout = Global.EventEmitter.addListener(
      Constants.EventEmitterName.onLogout,
      this.signOut
    );

    this.setState({refreshing: false});
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData();
  }

  signOut = () => {
    this.props.signOut();
  }

  componentWillUnmount = () => {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
    OneSignal.removeEventListener('emailSubscription', this.onEmailRegistrationChange);
    this.onLogout.remove();
  }

  onReceived(notification) {
    let messages = notification.payload.body
    console.log('Message: ', messages);
    //Alert.alert(__.t('Alert'), messages);
    //this.props.setOrderStatus(1)
  }

  onOpened(openResult) {
    //let messages = openResult.notification.payload.body
    // this.props.setOrderStatus(1)
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    // Alert.alert(__.t('Alert'), messages);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

   onEmailRegistrationChange(registration) {
      console.log("onEmailRegistrationChange: ", registration);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.homeProducts.length == 0 &&
      nextProps.categoriesType == ActionTypes.GET_CATEGORIES_SUCCESS &&
      this.syncing == false
    ) {
      this.syncing = true;
      this.props.getProductsForHome(nextProps.categories);
    }

    if (nextProps.productsType == ActionTypes.GET_PRODUCTS_FOR_HOME_SUCCESS) {
      this.setState({ loading: false });

      if (this.syncing != true) {
        this.syncing = true;
        this.props.getCategories();
      }
    }
  }
}

Home.defaultProps = {
  categories: [],
  products: [],
  homeProducts: []
};

function mapStateToProps({ cartsReducers, categoriesReducers, productsReducers }) {
  return {
    categories: categoriesReducers.categories,
    products: productsReducers.products,
    categoriesType: categoriesReducers.type,
    homeProducts: productsReducers.homeProducts,
    productsType: productsReducers.type,
    orderStatus: cartsReducers.orderStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
