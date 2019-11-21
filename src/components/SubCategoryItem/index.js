import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import styles from './styles'


class SubCategoryItem extends React.Component {
  render() {
    const { item, active, onPress } = this.props 
    let translate_name = item.name 
    if(item.name  == "ALL"){
    	translate_name = "全部";
	}
    return (
      <TouchableOpacity style={[styles.container, active && styles.active]} onPress={onPress} activeOpacity={0.75}>
        <Text style={[styles.text, active && styles.textActive]}>{translate_name}</Text>
      </TouchableOpacity>
    )
  }
}


export default SubCategoryItem