import { Constants } from '@common'
import WService from './helper/WService'
var wservice = new WService()

export const getProductsByCategory = (categoryId, categoryName, page, category = null) => {
  return new Promise((resolve, reject) => {
    wservice.getProductsByCategory(categoryId, page, Constants.Api.Limit)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve({
            categoryId, categoryName, products: response.body, category
          })
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const getProductsById = (productId) => {
  return new Promise((resolve, reject) => {
    wservice.getProductsById(productId)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve({productId, product: response.body})
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}


export const getProductsForHome = (categories) => {
  return new Promise((resolve, reject) => {
    var list = []
    var count = 0
    categories.forEach((category) => {
      getProductsByCategory(category.id, category.name, 1, category)
        .then((item) => {
          list.push(item)
          count += 1
          if (count == categories.length) {
            resolve(list)
          }
        })
        .catch((error) => {
          count += 1
          if (count == categories.length) {
            resolve(list)
          }
        })
    })
  })
}

export const searchProducts = (text, filter, page) => {
  return new Promise((resolve, reject) => {
    wservice.searchProducts(text, page, Constants.Api.Limit, filter)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve({ items: response.body, total_count: response.body.length })
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const getProductForVendor = (storeId) => {
  return new Promise((resolve, reject) => {
    wservice.getProductVendor(storeId)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve({ items: response.body, total_count: response.body.length })
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const getProductReviews = (productId) => {
  return new Promise((resolve, reject) => {
    wservice.getProductReview(productId)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve({ items: response.body, total_count: response.body.length })
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}
