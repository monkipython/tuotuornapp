import { Config } from '@common'
var config = Config.WoocommerceConfig
import NetworkHelper from './NetworkHelper'
// import SalesTax from '@dummyData/salestax'

function WService() {
	this.url = config.endpoint + "/wp-json/wc/v2/"
}

WService.prototype.makeUrl = function (resource, params = null) {
	var url = this.url + resource + "?consumer_key=" + config.consumer_key + "&consumer_secret=" + config.consumer_secret
	if (params) {
		url += "&" + params
	}
	console.log(url)
	return url
}

WService.prototype.makeV2Url = function (resource, params = null) {
	var url = config.endpoint + "/wp-json/wp/v2/" + resource + "?consumer_key=" + config.consumer_key + "&consumer_secret=" + config.consumer_secret
	if (params) {
		url += "&" + params
	}
	console.log(url)
	return url
}

WService.prototype.getSalesTax = function (postcode, country) {
	return NetworkHelper.requestPost(this.makeV2Url("get_tax", "postcode="+postcode+"&country="+country))
}

WService.prototype.getShippingRate = function (weight, address) {
	return NetworkHelper.requestPost(this.makeV2Url("shipping_rate", 
		"to_name="+address.first_name+
		"&to_company="+address.first_name+
		"&to_address="+address.address_1+
		"&to_city="+address.city+
		"&to_state="+address.state+
		"&to_country="+address.country+
		"&to_zipcode="+address.postcode+
		"&to_phone="+address.phone+
		"&to_email="+address.email+ "&length=10"+ "&height=10"+ "&width=10"+
		"&weight="+weight+
		"&distance_unit=in"+
		"&mass_unit=kg"
	))
}

WService.prototype.getCategories = function () {
	return NetworkHelper.requestGet(this.makeUrl("products/categories", "hide_empty=true&parent=0"))
}

WService.prototype.getSubCategories = function (parentId) {
	return NetworkHelper.requestGet(this.makeUrl('products/categories', 'hide_empty=true&parent=' + parentId))
}

WService.prototype.getCategoryById = function (categoryId) {
	return NetworkHelper.requestGet(this.makeUrl("products/categories/" + categoryId))
}

WService.prototype.getAllProducts = function (page, per_page) {
	return NetworkHelper.requestGet(this.makeUrl("products", "page=" + page + "&per_page=" + per_page))
}

WService.prototype.getProductsByCategory = function (categoryId, page, per_page) {
	return NetworkHelper.requestGet(this.makeUrl("products", "page=" + page + "&per_page=" + per_page + "&category=" + categoryId))
}

WService.prototype.getProductById = function (productId) {
	return NetworkHelper.requestGet(this.makeUrl("products/"+productId))
}

WService.prototype.getRelatedProducts = function (categoryId, productId, page, per_page) {
	return NetworkHelper.requestGet(this.makeUrl("products", "page=" + page + "&per_page=" + per_page + "&category=" + categoryId + "&exclude=[" + productId + "]"))
}

WService.prototype.getCoupon = function (couponCode, customer_id) {
	return NetworkHelper.requestGet(this.makeV2Url("check_coupon?code=" + couponCode + "&customer_id=" + customer_id))
}

WService.prototype.searchProducts = function (searchText, page, per_page, filter) {
	let filterParams = ''
	if (filter) {
		if (filter.minValue) {
			filterParams += '&min_price=' + filter.minValue
		}
		if (filter.maxValue) {
			filterParams += '&max_price=' + filter.maxValue
		}
		if (filter.categoryId) {
			filterParams += '&category=' + filter.categoryId
		}
		if (filter.tagId) {
			filterParams += '&tag=' + filter.tagId
		}
		if(filter.price) {
			filterParams += '&filter[orderby]=' + filter.price.orderby + "&order=" + filter.price.sortby
		}
		if(filter.rating) {
			filterParams += '&filter[orderby]=' + filter.rating.orderby + "&order=" + filter.rating.sortby
		}
		if(filter.onsale) {
			filterParams += '&filter[orderby]=' + filter.onsale.orderby + "&order=" + filter.onsale.sortby
		}
	}
	const url = this.makeUrl("products", "page=" + page + "&per_page=" + per_page + "&search=" + searchText + filterParams)
	return NetworkHelper.requestGet(url)
}

WService.prototype.getRecentProducts = function (per_page) {
	return NetworkHelper.requestGet(this.makeUrl("products", "page=1&per_page=" + per_page))
}

WService.prototype.getRecentProducts = function (per_page) {
	return NetworkHelper.requestGet(this.makeUrl("products", "page=1&per_page=" + per_page))
}

WService.prototype.getShippingMethods = function () {
	return NetworkHelper.requestGet(this.makeUrl("shipping_methods"))
}

WService.prototype.selectShippingMethod = function (id) {
	return NetworkHelper.requestGet(this.makeUrl("shipping_methods/"+id))
}

WService.prototype.getPaymentMethods = function () {
	return NetworkHelper.requestGet(this.makeUrl("payment_gateways"))
}

WService.prototype.signUp = function ({ email, first_name, last_name, password }) {
	return NetworkHelper.requestPost(this.makeUrl("customers"), { email, first_name, last_name, password })
}

WService.prototype.signIn = function (email, password) {
	return NetworkHelper.requestPost(config.endpoint + "/wp-json/jwt-auth/v1/token", { username: email, password })
}

WService.prototype.getUserId = function (token) {
	return NetworkHelper.requestGet(config.endpoint + "/wp-json/wp/v2/users/me", token)
}

WService.prototype.getUserInfo = function (userId) {
	return NetworkHelper.requestGet(this.makeUrl("customers/" + userId))
}

WService.prototype.createOrder = function (params) {
	consol.log(params);
	return NetworkHelper.requestPost(this.makeUrl("orders"), params)
}

WService.prototype.getMyOrders = function (customer, page, per_page) {
	return NetworkHelper.requestGet(this.makeUrl("orders", "page=" + page + "&per_page=" + per_page + "&customer=" + customer))
}

WService.prototype.getTags = function () {
	return NetworkHelper.requestGet(this.makeUrl('products/tags'))
}

WService.prototype.getVendorInfo = function (storeId) {
	return NetworkHelper.requestGet(config.endpoint + '/wp-json/dokan/v1/stores/' + storeId)
}

WService.prototype.getProductVendor = function (storeId) {
	return NetworkHelper.requestGet(config.endpoint + '/wp-json/dokan/v1/stores/' + storeId + '/products?page=1&per_page=10')
}

WService.prototype.signInFacebook = function (accessToken) {
	return NetworkHelper.requestGet(config.endpoint + '/api/user/fb_connect?access_token=' + accessToken);
}

WService.prototype.paymentStripe = function (data) {
	return NetworkHelper.requestPost(this.makeV2Url('stripe_payment', 
		"order_id="+data.order_id+
		"&payment_method="+data.order_id+
		"&payment_token="+data.payment_token+
		"&currency="+data.currency+
		"&total="+data.total+
		"&customer_email="+data.customer_email+
		"&api_sk_key="+data.api_sk_key
	));
}

WService.prototype.getProductReviews = function (productId){
	return NetworkHelper.requestGet(config.endpoint + '/wp-json/wp/v2/review_by_product_id?product_id='+productId);
}

module.exports = WService
