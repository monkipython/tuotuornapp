import React from 'react'
import {MyWishList} from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons,Constants} from '@common'

class MyWishListScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: __.t('My WishList'),
  })

  render(){
    const {navigation} = this.props
    return <MyWishList 
    	navigation={navigation} 
    	showDetail={(product) => navigation.navigate(Constants.Screen.Detail, { product })}
    	/>
  }
}

export default MyWishListScreen
