import React from 'react'
import {
  View,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {Icons,Utils,Colors} from '@common'
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

class BrandItem extends React.Component {
  render(){
    let {item} = this.props
    return (
      <TouchableOpacity activeOpacity={0.75} onPress={()=>this.props.onPress(item)}>
        <Image source={{uri:item.image}} 
          indicator={Progress.Circle}
          indicatorProps={{
            size: 30,
            color: Colors.AppColor,
          }}
        style={styles.image} />
      </TouchableOpacity>
    )
  }
}

export default BrandItem
