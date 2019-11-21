import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import styles from './styles'

class Attributes extends React.Component {

  preData = (attrs) => {
    let data = attrs.map((item, index) => {
      let obj = {}
      obj.name = item.name
      obj.value = item.options.toString()
      return obj
    })
    return data
  }

  render() {
    const { attributes } = this.props
    if (attributes && attributes.length > 0) {
      const data = this.preData(attributes)
      return (
        <View style={styles.container}>
          {
            data.map((item, index) => {
              return (
                <View style={styles.content} key={index}>
                  <Text style={styles.flex3}>{item.name}</Text>
                  <Text style={styles.flex1}>{':'}</Text>
                  <Text style={styles.flex5}>{item.value}</Text>
                </View>
              )
            })
          }
        </View>
      )
    } else {
      return (
        <View />
      )
    }

  }
}

export default Attributes