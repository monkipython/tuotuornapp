import React from 'react'
import { View, Modal, TouchableOpacity, Image } from 'react-native'
import {Text} from '@components'
import styles from './styles'
import { Icons } from '@common'


class ModalFilter extends React.Component {
  state = {
    isVisible: false
  }

  hide = () => {
    this.setState({ isVisible: false })
  }

  show = () => {
    this.setState({ isVisible: true })
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isVisible}
        onRequestClose={this.hide}>
        <View style={styles.backgroundColor}>
          <View style={styles.content}>
            <Text style={styles.title}>{__.t('Sort by')}</Text>
            <View>
              
            </View>
            <TouchableOpacity style={styles.btnClose} onPress={this.hide}>
              <Image source={Icons.SmallClose} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}

export default ModalFilter