import React from 'react'
import { View, Modal, TouchableOpacity, Image } from 'react-native'
import {Text} from '@components'
import styles from './styles'
import { Icons } from '@common'


class OrderDetails extends React.Component {

  render() {

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.showModal}
        onRequestClose={this.props.hideModal()}>
        <View style={styles.backgroundColor}>
          <View style={styles.content}>
            <Text style={styles.title}>{__.t('Order Details')}</Text>
            <View>
              
            </View>
            <TouchableOpacity style={styles.btnClose} onPress={() => this.props.hideModal() }>
              <Image source={Icons.SmallClose} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}

export default ModalFilter