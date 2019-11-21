import React from 'react'
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Picker,
  Share,
  Alert
} from 'react-native'
import styles from './style'
import { Text, Products, Attributes, Divider, StockItem, VendorItem, SpecificationItem, ReviewsItem, ProductImageSlider, AddToCartModal } from '@components'
import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { Utils, Config, Icons } from '@common'
import HTML from 'react-native-render-html'

class Detail extends React.Component {
  state = {
    attribute: '',
    isOpen: false,
    options: [],
    isActive: false,
    qty: 1
  }

  render() {
    let { products, navigation, wishlist, showDetail, vendorInfo, showSpecification, showReviews, showVendor } = this.props
    let product = navigation.state.params.product
    let vendor = {}
    if (vendorInfo && product) {
      vendor = vendorInfo
      if (product.store) {
        vendor.nameStore = product.store.name
      }
    }

    var rating_score = parseFloat(product.average_rating);
    rating_score     = rating_score.toFixed(1);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <ProductImageSlider images={product.images} />
          {/* <Image source={{ uri: Utils.getProductImageUrl(product, "image") }} style={styles.image} /> */}
          <View style={styles.separator} />
          <Text style={styles.name}>{product.name}</Text>
          {
            Utils.isNotEmpty(product.regular_price) && product.regular_price != product.price &&
            <Text style={styles.regular_price}>{Config.Currency.symbol}{product.regular_price}</Text>
          }
          {
            Utils.isNotEmpty(product.price) &&
            <Text style={styles.price}>{Config.Currency.symbol}{product.price}</Text>
          }
          {
            !Utils.isNotEmpty(product.price) &&
            <Text style={styles.price}>{__.t('Coming Soon')}</Text>
          }
          <View style={styles.productRow}>
            <StockItem product={product} />
            <ReviewsItem onPress={() => showReviews(this._getReviews())} rateScore={rating_score} />
            {/*<SpecificationItem onPress={() => showSpecification(this._getObjSpecification())} />*/}
          </View>
          {
            (Config.EnabledDoken && product) &&
            <View>
              <Divider />
              <View style={styles.attributes}>
                <VendorItem item={vendorInfo} name={product.store ? product.store.name : ''} onPress={() => showVendor(vendor)} />
              </View>
              <Divider />
            </View>
          }
          <HTML html={product.short_description} containerStyle={styles.shortDescription} imagesMaxWidth={Dimensions.get('window').width} />
          {products.length > 0 && <Products sectionTitle={__.t('Sponsored')} products={products} seeAll={false} onPress={showDetail} />}
          <HTML html={product.description} containerStyle={styles.description} imagesMaxWidth={Dimensions.get('window').width} />
        </ScrollView>
        {(!this.state.isOpen) && <View style={styles.addCartBox}>
            <TouchableOpacity style={styles.reviewBtn} onPress={() => showReviews(this._getReviews())}>
                <Image source={Icons.Feedback} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn} onPress={this.shareApp}>
                <Image source={Icons.Share} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.wishlistBtn} onPress={this.addToWishList}>
                <Image source={wishlist.indexOf(product) > -1 ? Icons.FavoriteSelected : Icons.Favorite} style={styles.icon} />
            </TouchableOpacity>
            {product.variations.length > 0 &&
            <TouchableOpacity style={[styles.addCart, !product.in_stock && styles.disabledCart]} onPress={this.openCartModal} disabled={!product.in_stock && !Utils.isNotEmpty(product.price)}>
              <Text style={styles.addCartText}>{__.t('Add to Cart')}</Text>
            </TouchableOpacity>}
            {product.variations.length <= 0 &&
            <TouchableOpacity style={[styles.addCart, !product.in_stock && styles.disabledCart]} onPress={this.addToCart} disabled={!product.in_stock && !Utils.isNotEmpty(product.price)}>
              <Text style={styles.addCartText}>{__.t('Add to Cart')}</Text>
            </TouchableOpacity>}
        </View>}
        <AddToCartModal isClose={this.closeCartModal} isOpen={this.state.isOpen} product={product} confirmAddToCart={this.confirmAddToCart} onChangeProduct={this.onChangeProduct}/>
      </SafeAreaView>
    )
  }

  onChangeProduct = (item) =>{
    console.log("onChangeProduct");
    console.log(item);
    let item_options = this.state.options;
    console.log("onChangeProduct state options");
    console.log(item_options);
    let indexof = item_options.indexOf(item);
    if(indexof == -1){
      item_options.push(item)
    }else{
      item_options[indexof] = item
    }
    if(this.state.option_count == this.state.options.length){
      this.setState({isActive : true});
    }
    this.setState({options: item_options});
  }
  
  // onChangeQuantity = (qty) => {
  //   this.setState({qty: 1})
  // }

  addToWishList = () => {
    if (this.props.wishlist.indexOf(this.props.navigation.state.params.product) > -1) {
      this.props.removeToWishList(this.props.navigation.state.params.product)
    } else {
      this.props.addToWishList(this.props.navigation.state.params.product)
    }
  }

  shareApp = () => {
    Share.share({
      title: "Mr.TuoTuo",
      message: "Mr.TuoTuo作为北美最大华人线上生鲜超市，平台提供生鲜食 材，水果蔬菜，零食美妆，日用百货等优质商品。平台销售 的产品主要包括水果，肉类，海鲜，蔬菜，餐馆菜等。",
      url: "https://www.tuotuobuy.com/"
    })
  }

  attributeHandler = (itemValue) => {
    this.setState({attribute: itemValue});
  }

  _getReviews = () => {
    let product = this.props.navigation.state.params.product
    if (product !== undefined) {
      console.log("get reviews" + product.id);
      return product
    }
    return 0
  }

  _getObjSpecification = () => {
    let product = this.props.navigation.state.params.product
    let metaData = product.meta_data
    for (let i = 0; i < metaData.length; i++) {
      let data = metaData[i]
      if (data.key === '_specifications') {
        return data.value
      }
    }
    return null
  }

  openCartModal = () => {
    this.setState({isOpen: true});
  }

  closeCartModal = () => {
    this.setState({options: []});
    this.setState({isOpen: false});
  }

  addToCart = () =>{
    let product = this.props.navigation.state.params.product
    this.props.addToCart(product)
  }

  confirmAddToCart = () => {
    if(this.state.isActive == true){
      let {navigation} = this.props
      let product = navigation.state.params.product
      let options = this.state.options
      let new_product = Utils.getVariationProduct(product, options)
      this.props.addToCart(new_product)
      this.setState({isOpen: false})
    }else{
      Alert.alert(__.t('Please select your options'))
    }
  }

  componentDidMount() {
    let product = this.props.navigation.state.params.product
    let option_length = product.attributes.length <= 0 || typeof product.attributes == undefined ? 0: product.attributes.length;
    this.setState({option_count: option_length, qty: 1})
    let category_ids = Utils.getCustomAttribute(product.custom_attributes, "category_ids")
    if (category_ids && category_ids.length > 0) {
      this.props.getProductsByCategory(category_ids[0], "", 0)
    }
    if (Config.EnabledDoken) {
      this.props.getVendorInfo(product.store.id)
    }
  }

  componentWillUnmount(){

  }

  componentWillReceiveProps = (nextProps) => {
  }
}

Detail.defaultProps = {
  wishlist: [],
  products: [],
  vendorInfo: null
}

function mapStateToProps({ cartsReducers, productsReducers, productsByCategoryReducers, vendorReducers }) {
  return {
    carts: cartsReducers.carts,
    wishlist: productsReducers.wishlist,
    reload: cartsReducers.reload,
    products: typeof productsByCategoryReducers.productsByCategory != "undefined" ? productsByCategoryReducers.productsByCategory.products : [],
    vendorInfo: typeof vendorReducers.vendorInfo !== "undefined" ? vendorReducers.vendorInfo : null,
    typeVendor: vendorReducers.type
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
