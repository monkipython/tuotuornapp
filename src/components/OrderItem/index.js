import React from 'react'
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './style'
import {Icons,Utils} from '@common'
import {Text} from '@components'

class OrderItem extends React.Component {
  render(){
    let {item, onOrderDetail} = this.props
    var timeform = new Date(item.date_created);
     
    return (
      <TouchableOpacity onPress={onOrderDetail}>
        <View style={styles.container}>
          <Text style={styles.code} >{__.t('Order Number')}: {item.number}</Text>
          <Text style={styles.text} >{__.t('Price')}: {item.total} {item.currency}</Text>
          <Text style={styles.text} >{__.t('Created')}: {timeform.toLocaleDateString()}</Text>
          <Text style={styles.text} >{__.t('Status')}: {item.status}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default OrderItem
