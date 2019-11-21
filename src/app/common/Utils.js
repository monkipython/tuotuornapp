import { Linking } from 'react-native'
import Config from './Config'
import moment from 'moment'

export const getCustomAttribute = (customAttributes, attribute) => {
  var value = null
  if (typeof customAttributes != 'undefined' && customAttributes.length > 0) {
    customAttributes.forEach((item) => {
      if (item.attribute_code == attribute) {
        value = item.value
        return
      }
    })
  }
  return value
}

export const getAttribute = (attributes) => {
  var variations = [];
  if (typeof attributes != 'undefined' && attributes.length > 0) {
    attributes.forEach((item) => {
        var options_Val = {name: item.name, options:[]};
        item.options.forEach((option)=>{
          var selectedOption = {key: item.name, value: option}
          options_Val.options.push({label: option, value: selectedOption});
        })
        variations.push(options_Val);
    })
  }
  return variations
}

export const getVariationProduct = (product, options) => {

  var variations_product = product;
  var opt1 = [];

  for(var i = 0; i < options.length; i++){
    opt1[i] = options[i].value;
  }

  product.variations.forEach((item) =>{
    var match = true;
    for(var a = 0; a < item.attributes.length; a++){
      if(opt1[a] !== item.attributes[a].option){
        match = false;
        break;
      }
    }
    if(match == true){
      variations_product = item;
    }
  })
  return variations_product
}

export const getProductImageUrl = (item, attribute = "thumbnail") => {
  if (item.images != undefined && item.images.length > 0) {
    return item.images[0].src
  }
  return "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"
}

export const getCategoryImageUrl = (item) => {
  if (item.image != null) {
    return item.image.src
  }
  return "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"
}

export const openUrl = (url) => {
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      alert('Can\'t handle url: ' + url);
    } else {
      return Linking.openURL(url);
    }
  }).catch(err => console.log('An error occurred', err));
}

export const getCurrentPrice = (product) => {
  if (product.on_sale) {
    return product.sale_price
  }
  return product.price
}


export const isNotEmpty = (str) => {
  return (str && str.length > 0) ? true : false 
}