import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {Text} from '@components'

class ShippingMethods extends React.Component {
  state = {
    selected:''
  }
  render(){
    let {shippingMethods} = this.props
    return (
      <View style={styles.container}>
        {shippingMethods.map((item,index)=>this.renderItem(item,index))}
      </View>
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

  renderItem = (item,index) => {
    if(item.id == 'free_shipping'){
      return (
        <TouchableOpacity key={index} onPress={()=>this.selectShippingMethod(item)} style={styles.item} activeOpacity={0.75}>
          <View style={{flex:1}}>
            <Text style={styles.name}>{item.title}</Text>
          </View>

          <Image source={this.state.selected == item.id ? Icons.CheckCircle : Icons.UncheckCircle} style={[styles.icon,this.state.selected && styles.selectedIcon]} />
        </TouchableOpacity>
      )
    }
  }

  selectShippingMethod = (item) => {
    this.setState({selected:item.id})
    this.props.onSelectShippingMethod(item)
  }
}

export default ShippingMethods
