import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {BrandItem,HeaderSection} from '@components'

class Brands extends React.Component {
  render(){
    let {brands,onPress} = this.props
    return (
      <View style={styles.container}>
        <HeaderSection title={__.t('Top Deals')} seeAll={false}/>
        <FlatList showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          keyExtractor={(item,index)=>`${index}`}
          data={brands}
          renderItem={({item})=><BrandItem item={item} onPress={onPress}/>}
          horizontal
          ItemSeparatorComponent={()=><View style={styles.separator}/>}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    )
  }
}

export default Brands
