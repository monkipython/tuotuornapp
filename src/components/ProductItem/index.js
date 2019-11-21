import React from 'react'
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Share
} from 'react-native'
import styles from './style'
import { Icons, Utils, Constants, Config } from '@common'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { Text } from '@components'

const ItemWidth = ((Constants.ScreenSize.width - 10) / 2) - 10
const ItemHeight = ItemWidth + 120

class ProductItem extends React.Component {

  static defaultProps = {
    wishlist: [],
    isVertical: false
  }

  render() {
    let { item, onPress, wishlist, isVertical } = this.props
    let percent = 1 - item.price / item.regular_price

    var verticalStyle = {}
    if (isVertical) {
      verticalStyle = {
        width: ItemWidth,
        height: ItemHeight,
        marginLeft: 10,
        marginTop: 10
      }
    }

    let currentPrice = Utils.getCurrentPrice(item)

    var rate = Math.round(item.average_rating)

    return (
      <TouchableOpacity style={[styles.container, verticalStyle]} onPress={() => onPress(item)}>
        <ImageBackground source={{ uri: Utils.getProductImageUrl(item) }} style={[styles.image, isVertical && { width: ItemWidth - 1, height: ItemWidth - 1 }]} resizeMode='contain'>
          {percent > 0 && (
            <View style={styles.percent}>
              <Text style={styles.percentText}>{Math.ceil(percent * 100)}% OFF</Text>
            </View>
          )}
        </ImageBackground>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
        {
          Utils.isNotEmpty(item.regular_price) &&
          <Text style={styles.price}>{Config.Currency.symbol}{item.price} {item.regular_price != item.price && <Text style={styles.regular_price}>{item.regular_price}</Text>}</Text>
        }
        {
          !Utils.isNotEmpty(item.regular_price) &&
          <Text style={styles.price}><Text style={styles.price}>{Config.Currency.symbol}{item.price}</Text></Text>
        }
        <Text style={styles.rating} >{rate.toFixed(1)}</Text>

        <View style={{ flex: 1 }} />
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={this.shareApp}>
            <Image source={Icons.Share} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addToCart}>
            <Image source={Icons.Cart} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addToWishList}>
            <Image source={wishlist.indexOf(item) > -1 ? Icons.FavoriteSelected : Icons.Favorite} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  addToWishList = () => {
    if (this.props.wishlist.indexOf(this.props.item) > -1) {
      this.props.removeToWishList(this.props.item)
    } else {
      this.props.addToWishList(this.props.item)
    }
  }

  addToCart = () => {
    var product = this.props.item
    product.qty = 1
    this.props.addToCart(product)
  }

  shareApp = () => {
    Share.share({
      title: "Mr.TuoTuo",
      message: "Mr.TuoTuo作为北美最大华人线上生鲜超市，平台提供生鲜食 材，水果蔬菜，零食美妆，日用百货等优质商品。平台销售 的产品主要包括水果，肉类，海鲜，蔬菜，餐馆菜等。",
      url: "https://www.tuotuobuy.com/"
    })
  }
}

function mapStateToProps({ productsReducers }) {
  return {
    wishlist: productsReducers.wishlist,
    reload: productsReducers.reload,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)
