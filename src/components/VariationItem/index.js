import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import styles from './style'
import RadioGroup from 'react-native-custom-radio-group'

class VariationItem extends React.Component {
  render() {
    const { item, name, options, onChangeProduct, isBorderTop } = this.props
    return (
      <View style={[styles.container, styles.borderBottom, isBorderTop && styles.borderTop]}>
      	<Text style={styles.panelHeader}>{name}</Text>
      	<View style={styles.panelBody}>
      		<RadioGroup radioGroupList={options} 
      		containerStyle={styles.containerStyle}
      		buttonContainerStyle={styles.buttonContainer} 
      		buttonTextStyle={styles.buttonTextStyle} 
      		buttonContainerActiveStyle={styles.buttonContainerActiveStyle}
      		buttonContainerInactiveStyle={styles.buttonContainerInactiveStyle}
      		buttonTextActiveStyle={styles.buttonTextActiveStyle}
      		buttonTextInactiveStyle={styles.buttonTextInactiveStyle}
      		onChange={onChangeProduct}/>
      	</View>
      </View>
    )
  }
}

export default VariationItem