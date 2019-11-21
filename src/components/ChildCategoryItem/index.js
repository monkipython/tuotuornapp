import React from 'react'
import {
  View,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {Icons,Utils,Constants,Colors} from '@common'
import {Text} from '@components'
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

class CategoryItem extends React.Component {

  render(){
    let {item,onPress} = this.props
    let disabled = typeof item.children == 'undefined' || item.children == null || item.children.length == 0
    return (
      <TouchableOpacity onPress={()=>onPress(item)} disabled={disabled}>
        <Image 
          source={{uri:Utils.getCategoryImageUrl(item)}} 
          indicator={Progress.Circle}
          indicatorProps={{
            size: 30,
            color: Colors.AppColor,
          }}
          style={styles.image} />
        <View style={styles.bottomView}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
        </View>
      </TouchableOpacity>

    )
  }


}

export default CategoryItem
