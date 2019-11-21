import React from 'react'
import { View} from 'react-native'
import Swiper from 'react-native-swiper'
import styles from './styles'
import {Colors} from '@common'
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';


class ProductImageSlider extends React.Component {

  render() {
    const { images } = this.props
    return (
      <View style={styles.container}>
        <Swiper showsPagination={false} autoplay={true}>
          {images.map((item, index) => (
            <Image 
                key={index} 
                source={{ uri: item.src }} 
                indicator={Progress.Circle}
                indicatorProps={{
                  size: 20,
                  color: Colors.AppColor,
                }}
                style={styles.image} />
          ))}
        </Swiper>
      </View>
    )
  }
}

export default ProductImageSlider
