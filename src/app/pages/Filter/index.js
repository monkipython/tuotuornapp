import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { ItemFilter, Text, Divider, Button, MultiSlider, ActionSheet } from '@components'
import { Global, Constants } from '@common'
import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import * as ActionTypes from '@actions/ActionTypes'
import { bindActionCreators } from 'redux'

import styles from './styles'

class Filter extends React.Component {
  state = {
    minValue: Constants.MIN_PRICE,
    maxValue: Constants.MAX_PRICE,
    prices: [],
    price: null,
    ratings: [],
    rating: null,
    onsales: [],
    onsale: null,
    categories: [],
    category: null,
    tags: [],
    tag: null
  }

  render() {
    const { ratings, rating, onsales, onsale, prices, price, categories, category, tags, tag } = this.state
    const nameCategory = category ? category.name : __.t('None')
    const nameTag = tag ? tag.name : __.t('None')
    const namePrice = price ? price.name : __.t('None')
    const nameRating = rating ? rating.name : __.t('None')
    const nameOnSales = onsale ? onsale.name : __.t('None')
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View>
            <View style={styles.viewPadding}></View>
            <View style={styles.item}>
              <View style={styles.title}>
                <Text style={styles.textTitle}>{"类别"}</Text>
                <Divider style={styles.divider} />
              </View>
              <ItemFilter title={nameCategory} onPress={() => this.refs.categories.show()} />
            </View>
            <View style={styles.viewPadding}></View>
            <View style={styles.item}>
              <View style={styles.title}>
                <Text style={styles.textTitle}>{"标签"}</Text>
                <Divider style={styles.divider} />
              </View>
              <ItemFilter title={nameTag} onPress={() => this.refs.tags.show()} />
            </View>
            <View style={styles.viewPadding}></View>
            <View style={styles.item}>
              <View style={styles.title}>
                <Text style={styles.textTitle}>{"价格范围"}</Text>
                <Divider style={styles.divider} />
              </View>
              <MultiSlider
                min={Constants.MIN_PRICE}
                max={Constants.MAX_PRICE}
                onValuesChange={(e) => this.changeSlider(e)}
                minValue={this.state.minValue}
                maxValue={this.state.maxValue} />
            </View>
            <View style={styles.item}>
              <View style={styles.title}>
                <Text style={styles.textTitle}>{"价格排序"}</Text>
                <Divider style={styles.divider} />
              </View>
              <ItemFilter title={namePrice} onPress={() => this.refs.prices.show()} />
            </View>
            <View style={styles.item}>
              <View style={styles.title}>
                <Text style={styles.textTitle}>{"评价排序"}</Text>
                <Divider style={styles.divider} />
              </View>
              <ItemFilter title={nameRating} onPress={() => this.refs.ratings.show()} />
            </View>
            <View style={styles.item}>
              <View style={styles.title}>
                <Text style={styles.textTitle}>{"是否优惠价？"}</Text>
                <Divider style={styles.divider} />
              </View>
              <ItemFilter title={nameOnSales} onPress={() => this.refs.onsales.show()} />
            </View>
          </View>
          <View style={styles.action}>
            <Button
              title={__.t('Apply')}
              onPress={this.onApply} />
          </View>
          <ActionSheet
            title={__.t("Categories")}
            ref='categories'
            itemKey={'name'}
            items={categories}
            onSelect={this.onSelectCategory} />
          <ActionSheet
            title={__.t("Tags")}
            ref='tags'
            itemKey={'name'}
            items={tags}
            onSelect={(tag) => this.setState({ tag })} />
          <ActionSheet
            title={__.t("Price Sort")}
            ref='prices'
            itemKey={'name'}
            items={prices}
            onSelect={(price) => this.setState({ price })} />
          <ActionSheet
            title={__.t("Rating Sort")}
            ref='ratings'
            itemKey={'name'}
            items={ratings}
            onSelect={(rating) => this.setState({ rating })} />
          <ActionSheet
            title={__.t("On Sales?")}
            ref='onsales'
            itemKey={'name'}
            items={onsales}
            onSelect={(onsale) => this.setState({ onsale })} />
        </View>
      </SafeAreaView>
    )
  }

  componentDidMount = () => {
    this.props.getCategories()
    this.props.getTags()

  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.type == ActionTypes.GET_CATEGORIES_SUCCESS) {
      this.setState({ categories: nextProps.categories })
    }

    if (nextProps.typeTags === ActionTypes.GET_TAGS_SUCCESS) {
      this.setState({ tags: nextProps.tags })
    }

    this.setState({
      prices:[{name: "从高至低", orderby: "price", sortby: "desc"},{name: "从低至高", orderby: "price", sortby: "asc"}] 
    })

    this.setState({
      ratings:[{name: "从高至低", orderby: "average_rating", sortby: "desc"},{name: "从低至高", orderby: "average_rating", sortby: "asc"}] 
    })

    this.setState({
      onsales:[{name: "是", orderby: "on_sale", sortby: "yes"},{name: "否", orderby: "on_sale", sortby: "no"}] 
    })

    if (nextProps.typeFilter === ActionTypes.APPLY_FILTER) {
      if (nextProps.dataFilter) {
        let data = nextProps.dataFilter
        const minValue = data.minValue ? data.minValue : Constants.MIN_PRICE
        const maxValue = data.maxValue ? data.maxValue : Constants.MAX_PRICE
        this.setState({ tag: data.tag, category: data.category, minValue, maxValue, price: data.price, rating: data.rating, onsale: data.onsale })
      }
    }

  }

  changeSlider = (data) => {
    this.setState({ minValue: data[0] ? data[0] : 0, maxValue: data[1] ? data[1] : 0 });
  }

  onSelectCategory = (category) => {
    this.setState({ category })
  }

  onApply = () => {
    const { price, rating, onsale, minValue, maxValue, category, tag } = this.state;
    const param = {
      minValue,
      maxValue,
      categoryId: category ? category.id : null,
      tagId: tag ? tag.id : null,
      price: price ? price : null,
      rating: rating ? rating : null,
      onsale: onsale ? onsale : null
    };
    let dataFilter = {}
    dataFilter.tag = tag ? tag : null
    dataFilter.category = category ? category : null
    dataFilter.price    = price ? price : null
    dataFilter.rating   = rating ? rating : null
    dataFilter.onsale   = onsale ? onsale : null
    dataFilter.minValue = minValue
    dataFilter.maxValue = maxValue
    this.props.applyFilter(dataFilter)
    Global.EventEmitter.emit(Constants.EventEmitterName.onFilter, param);
    this.props.onSearch();
  }

}


function mapStateToProps({ categoriesReducers, tagsReducers, settingsReducers }) {
  return {
    type: categoriesReducers.type,
    categories: categoriesReducers.categories,
    typeTags: tagsReducers.type,
    tags: tagsReducers.tags,
    dataFilter: settingsReducers.filter,
    typeFilter: settingsReducers.type
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)