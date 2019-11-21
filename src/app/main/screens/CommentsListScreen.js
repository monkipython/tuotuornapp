import React from 'react'
import { CommentsList } from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons} from '@common'

class CommentsListScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: __.t('My Comments'),
  })

  render(){
    const {navigation} = this.props
    return <CommentsList navigation={navigation} />
  }
}

export default CommentsListScreen
