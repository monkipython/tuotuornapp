import React from 'react'
import { Image } from 'react-native'
import { Dimensions, DeviceInfo, Platform } from 'react-native'
import { TabBarItem } from '@components'

import { createStackNavigator, createBottomTabNavigator, Header } from 'react-navigation'
import { Constants, Colors, Icons } from '@common'
import HomeScreen from './screens/HomeScreen'
import DealsScreen from './screens/DealsScreen'
import SearchScreen from './screens/SearchScreen'
import CartsScreen from './screens/CartsScreen'
import AddCouponScreen from './screens/AddCouponScreen'
import MyProfileScreen from './screens/MyProfileScreen'
import MyWishListScreen from './screens/MyWishListScreen'
import CouponsListScreen from './screens/CouponsListScreen'
import CommentsListScreen from './screens/CommentsListScreen'
import LanguagesScreen from './screens/LanguagesScreen'
import MyAddressScreen from './screens/MyAddressScreen'
import LaunchScreen from './screens/LaunchScreen'
import DetailScreen from './screens/DetailScreen'
import OrderInfoScreen from './screens/OrderInfoScreen'
import ProductsByCategoryScreen from './screens/ProductsByCategoryScreen'
import SetLanguageScreen from './screens/SetLanguageScreen'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import ForgotPassScreen from './screens/ForgotPassScreen'
import FeedbackScreen from './screens/FeedbackScreen'
import ShippingInfoScreen from './screens/ShippingInfoScreen'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import PaymentInfoScreen from './screens/PaymentInfoScreen'
import AddAddressScreen from './screens/AddAddressScreen'
import MyOrdersScreen from './screens/MyOrdersScreen'
import TermsScreen from './screens/TermsScreen'
import NotificationScreen from './screens/NotificationScreen'
import FilterScreen from './screens/FilterScreen'
import AttributeDetailScreen from './screens/AttributeDetailScreen'
import SpecificationScreen from './screens/SpecificationScreen'
import ReviewsScreen from './screens/ReviewsScreen'
import VendorScreen from './screens/VendorScreen'
import CountdownScreen from './screens/CountdownScreen'

const LANDSCAPE = 'landscape';
const PORTRAIT = 'portrait';

const getHeaderHeight = () => {
  let height;
  const orientation = getOrientation();
  height = getHeaderSafeAreaHeight();
  height += DeviceInfo.isIPhoneX_deprecated && orientation === PORTRAIT ? 24 : 0;

  return height;
};

const getPaddingTop = () => {
  let paddingTop;
  const orientation = getOrientation();
  paddingTop = !DeviceInfo.isIPhoneX_deprecated && orientation === PORTRAIT ? 30 : 0;
  // console.log(paddingTop);
  return paddingTop;
};

// This does not include the new bar area in the iPhone X, so I use this when I need a custom headerTitle component
const getHeaderSafeAreaHeight = () => {
  const orientation = getOrientation();
  if (Platform.OS === 'ios' && orientation === LANDSCAPE && !Platform.isPad) {
    return 32;
  }
  return Header.HEIGHT;
};

const getOrientation = () => {
  const { width, height } = Dimensions.get('window');
  return width > height ? LANDSCAPE : PORTRAIT;
};

const stackNavigatorConfiguration = {
  mode: 'card',
  navigationOptions: {
    headerStyle: { backgroundColor: Colors.AppColor, borderBottomWidth: 0, height: getHeaderHeight(), marginTop: 0, paddingTop: getPaddingTop()},
    headerTintColor: 'white',
    headerTitleStyle: { fontSize: 18, fontFamily: Constants.FontFamily, fontWeight: 'bold'},
    headerBackground: (<Image style={{ flex: 1, width: Constants.ScreenSize.width}} source={Icons.MenuBg} />)
  }
}

const homeTabScreens = {}
homeTabScreens[Constants.Screen.Home] = { screen: HomeScreen }
homeTabScreens[Constants.Screen.Search] = { screen: SearchScreen }
homeTabScreens[Constants.Screen.Filter] = { screen: FilterScreen }
homeTabScreens[Constants.Screen.Detail] = { screen: DetailScreen }
homeTabScreens[Constants.Screen.ProductsByCategory] = { screen: ProductsByCategoryScreen }
homeTabScreens[Constants.Screen.Reviews] = { screen: ReviewsScreen }
homeTabScreens[Constants.Screen.Specification] = { screen: SpecificationScreen }
homeTabScreens[Constants.Screen.Vendor] = { screen: VendorScreen }
const homeStack = createStackNavigator(homeTabScreens, stackNavigatorConfiguration)

const dealsTabScreens = {}
dealsTabScreens[Constants.Screen.Deals] = { screen: DealsScreen }
dealsTabScreens[Constants.Screen.Detail] = { screen: DetailScreen }
dealsTabScreens[Constants.Screen.ProductsByCategory] = { screen: ProductsByCategoryScreen }
dealsTabScreens[Constants.Screen.Reviews] = { screen: ReviewsScreen }
dealsTabScreens[Constants.Screen.Specification] = { screen: SpecificationScreen }
dealsTabScreens[Constants.Screen.AttributeDetail] = { screen: AttributeDetailScreen }
dealsTabScreens[Constants.Screen.Vendor] = { screen: VendorScreen }
const dealsStack = createStackNavigator(dealsTabScreens, stackNavigatorConfiguration)

const countdownTabScreens = {}
countdownTabScreens[Constants.Screen.Countdown] = { screen: CountdownScreen }
countdownTabScreens[Constants.Screen.Detail] = { screen: DetailScreen }
countdownTabScreens[Constants.Screen.Reviews] = { screen: ReviewsScreen }
countdownTabScreens[Constants.Screen.Specification] = { screen: ReviewsScreen }
countdownTabScreens[Constants.Screen.Vendor] = { screen: VendorScreen }
const countdownStack = createStackNavigator(countdownTabScreens, stackNavigatorConfiguration)

const cartsTabScreens = {}
cartsTabScreens[Constants.Screen.Carts] = { screen: CartsScreen }
cartsTabScreens[Constants.Screen.ShippingAddress] = { screen: ShippingAddressScreen }
cartsTabScreens[Constants.Screen.ShippingInfo] = { screen: ShippingInfoScreen }
cartsTabScreens[Constants.Screen.PaymentInfo] = { screen: PaymentInfoScreen }
const cartsStack = createStackNavigator(cartsTabScreens, stackNavigatorConfiguration)

const profileTabScreens = {}
profileTabScreens[Constants.Screen.MyProfile] = { screen: MyProfileScreen }
profileTabScreens[Constants.Screen.MyWishList] = { screen: MyWishListScreen }
profileTabScreens[Constants.Screen.Detail]    = { screen: DetailScreen }
profileTabScreens[Constants.Screen.CouponsList] = { screen: CouponsListScreen }
profileTabScreens[Constants.Screen.CommentsList] = { screen: CommentsListScreen }
profileTabScreens[Constants.Screen.Languages] = { screen: LanguagesScreen }
profileTabScreens[Constants.Screen.MyAddress] = { screen: MyAddressScreen }
profileTabScreens[Constants.Screen.Feedback] = { screen: FeedbackScreen }
profileTabScreens[Constants.Screen.Notification] = { screen: NotificationScreen}
profileTabScreens[Constants.Screen.AddAddress] = { screen: AddAddressScreen }
profileTabScreens[Constants.Screen.MyOrders] = { screen: MyOrdersScreen }
profileTabScreens[Constants.Screen.Terms] = { screen: TermsScreen }
profileTabScreens[Constants.Screen.OrderInfo] = { screen: OrderInfoScreen }
const profileStack = createStackNavigator(profileTabScreens, stackNavigatorConfiguration)

const tabScreens = {}
tabScreens[Constants.Screen.Home] = { screen: homeStack }
tabScreens[Constants.Screen.Deals] = { screen: dealsStack }
tabScreens[Constants.Screen.Countdown] = { screen: countdownStack }
tabScreens[Constants.Screen.Carts] = { screen: cartsStack }
tabScreens[Constants.Screen.MyProfile] = { screen: profileStack }

const screens = {}
screens[Constants.Screen.Launch] = { screen: LaunchScreen }
screens[Constants.Screen.SignIn] = { screen: SignInScreen }
screens[Constants.Screen.SignUp] = { screen: SignUpScreen }
screens[Constants.Screen.ForgotPass] = { screen: ForgotPassScreen }
screens[Constants.Screen.SetLanguage] = { screen: SetLanguageScreen }

const mainTab = createBottomTabNavigator(tabScreens, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state
      var icon = null
      switch (routeName) {
        case Constants.Screen.Home:
          icon = Icons.Home
          break;
        case Constants.Screen.Deals:
          icon = Icons.Deals
          break;
        case Constants.Screen.Countdown:
          icon = Icons.Countdown
          break;
        case Constants.Screen.Carts:
          icon = Icons.Cart
          break;
        case Constants.Screen.MyProfile:
          icon = Icons.User
          break;
        default:
          return null
      }

      return <TabBarItem icon={icon} tintColor={tintColor} routeName={routeName} />
    }
  }),
  tabBarOptions: {
    showLabel: false,
    activeTintColor: Colors.AppColor,
  }
})

export default createStackNavigator({
  ...screens,
  default: {
    screen: mainTab
  }
}, {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
    cardStyle: { backgroundColor: 'transparent' }
  })
