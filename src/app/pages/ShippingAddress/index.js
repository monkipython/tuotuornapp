import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  ScrollView,
  AsyncStorage
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {Input,Button,CountriesModal,RegionsModal} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class ShippingInfo extends React.Component {
  constructor(props){
    super(props)

    if (props.customerInfo == null) {
      return
    }

    if (props.myAddress) {
      this.state = {
        email: props.customerInfo.email,
        firstname: props.myAddress.firstname,
        lastname: props.myAddress.lastname,
        telephone:props.myAddress.telephone,
        street:props.myAddress.street,
        country_id:props.myAddress.country_id,
        region_code: props.myAddress.region_code,
        city:props.myAddress.city,
        postcode:props.myAddress.postcode,
        regions:props.myAddress.regions,
        region:props.myAddress.region,
      }
    }else{
      this.state = {
        email: props.customerInfo.email,
        firstname: props.customerInfo.first_name,
        lastname: props.customerInfo.last_name,
        telephone:'',
        street:'',
        country_id:'US',
        region_code: '',
        city:'',
        postcode:'',
        regions:[],
        region:'',
      }
    }
  }


  render(){
    let {type} = this.props

    if (this.props.customerInfo == null) {
      return <View />
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Input
            placeholder={__.t('First Name')}
            value={this.state.firstname}
            onChangeText={(firstname)=>this.setState({firstname})}
            />
          <View style={styles.separator}/>
          <Input
            placeholder={__.t('Last Name')}
            value={this.state.lastname}
            onChangeText={(lastname)=>this.setState({lastname})}
            />
          <View style={styles.separator}/>
          <Input
            placeholder={__.t('Email')}
            value={this.state.email}
            onChangeText={(email)=>this.setState({email})}
            autoCapitalize="none"
            />
          <View style={styles.separator}/>
          <Input
            placeholder={__.t('Telephone')}
            value={this.state.telephone}
            onChangeText={(telephone)=>this.setState({telephone})}
            />
          <View style={styles.separator}/>
          <Input
            placeholder={__.t('Street')}
            value={this.state.street}
            onChangeText={(street)=>this.setState({street})}
            />

          {this.state.country_id != "" && <CountriesModal onSelectCountry={this.onSelectCountry} selectCountry={this.state.country_id}/>}
          {this.state.country_id == "" && <CountriesModal onSelectCountry={this.onSelectCountry} />}
          {this.state.region_code != "" && <RegionsModal regions={this.state.regions} selectRegion={this.state.region_code} onSelectRegion={this.onSelectRegion} />}
          {this.state.region_code == "" && <RegionsModal regions={this.state.regions} onSelectRegion={this.onSelectRegion} />}

          <Input
            placeholder={__.t('City')}
            value={this.state.city}
            onChangeText={(city)=>this.setState({city})}
            />
          <Input
            placeholder={__.t('Postcode')}
            value={this.state.postcode}
            onChangeText={(postcode)=>this.setState({postcode})}
            />
        </View>
        </ScrollView>
        <Button title={__.t('Submit')} style={styles.btnSubmit} onPress={this.onSubmit} loading={type == ActionTypes.GET_SHIPPING_METHODS_PENDING}/>
      </SafeAreaView>
    )
  }

  _storeData = async (name, values) => {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(values));
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  }

  _retrieveData = async (name) => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        // We have data!!
        return JSON.parse(value);
      }
     } catch (error) {
        return error;
       // Error retrieving data
     }
  }

  onSelectCountry = (item)=>{
    this.setState({country_id:item.countryShortCode,regions:item.regions})
  }

  onSelectRegion = (item) => {
    this.setState({region:item.name,region_code:item.shortCode})
  }

  onSubmit = ()=>{
    let {firstname,lastname,email,telephone,street,country_id,region_code,region,city,postcode} = this.state

    if (firstname == "" || lastname == "" || email == "" || telephone == "" || street == "" || country_id == "" || region_code == "" || city == "" || postcode == "") {
      return Alert.alert(__.t("Alert"), __.t('Please input all fields'))
    }

    const address = {
      first_name: firstname,
      last_name: lastname,
      phone: telephone,
      email,
      address_1: street,
      state: region_code,
      country: country_id,
      city,
      postcode
    }

    const weight = this.getWeight()
    this.props.setShippingAddress(address)
    this.props.getShippingRate(weight, address)
    this.props.getSalesTax(postcode, country_id)
    this.props.getShippingMethods()
  }

  componentWillReceiveProps(props){
    if (props.type == ActionTypes.GET_SHIPPING_METHODS_FAIL) {
      Alert.alert(__.t('Alert'), __.t('Please input all fields'))
    }

    if (props.type == ActionTypes.GET_SALESTAX_SUCCESS) {
      console.log("salestax");
      console.log(props.salesTax);
    }
    
    if (props.type == ActionTypes.GET_SHIPPING_RATE_SUCCESS) {
      console.log("shippingrate");
      console.log(props.shippingRate);
    }

    console.log(props.type == ActionTypes.GET_SHIPPING_RATE_SUCCESS)

    if (props.type == ActionTypes.GET_SHIPPING_METHODS_SUCCESS) {
      this.props.showShippingInfo()
    }

  }

  getWeight = () => {
    var weight = 0
    this.props.carts.forEach((item) => {
      weight += parseFloat(item.weight) * parseInt(item.qty)
    })
    return weight.toFixed(2);
  }
}

ShippingInfo.defaultProps = {
  myAddress:false,
  customerInfo:{},
}

function mapStateToProps({cartsReducers,authReducers}){
  return {
    type:cartsReducers.type,
    carts: cartsReducers.carts,
    message:cartsReducers.message,
    customerInfo:authReducers.customerInfo,
    salesTax:cartsReducers.salesTax,
    shippingRate:cartsReducers.shippingRate,
    myAddress:authReducers.myAddress
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ShippingInfo)
