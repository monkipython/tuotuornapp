import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import styles from './style'
import {Icons, Utils} from '@common'
import {Text, VariationItem, Quantity} from '@components'
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';

class AddToCartModal extends React.Component {

  onAddToCart = () =>{
    console.log("add to cart");
  }

  render(){
    let {categories,ref, isOpen, isClose, confirmAddToCart, onChangeProduct, onPress, product} = this.props

    let options = Utils.getAttribute(product.attributes);
    const optionGroup = options.map((item) => <VariationItem name={item.name} options={item.options} onChangeProduct={onChangeProduct}/>)

    return (
      <Modal 
          isOpen={isOpen}
          style={[styles.modal, styles.modal4]}
          swipeToClose={false}
          position={"bottom"}>
            <View style={styles.header}>
              <Text style={styles.title}>{__.t('Select Variation')}</Text>
            </View>
            <ScrollView>
              <View style={styles.insideScrollView}>
              {optionGroup}
              </View>
              {/*<View style={styles.row}>
                <Text style={styles.quantity} >{__.t('Quantity')}</Text>
              </View>*/}
              {/*<View style={styles.row}>
                <Quantity qty={qty} onChangeQuantity={onChangeQuantity} />
              </View>*/}
            </ScrollView>
            <View style={styles.addCartBox}>
              <Button onPress={isClose} style={styles.cancel}>取消</Button>
              <Button onPress={confirmAddToCart} style={styles.addCart}>确认</Button>
            </View>
        </Modal>
    )
  }

}

export default AddToCartModal
