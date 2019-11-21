import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { Text } from '@components'
import styles from './styles'

class ReviewsItem extends React.Component {

  render() {
    const { onPress, rateScore } = this.props

    return (
	<TouchableOpacity style={styles.reviewContainer} activeOpacity={0.75} onPress={onPress}>
		<Text style={styles.reviewText}>{rateScore} {__.t('Rating')}</Text>
	</TouchableOpacity>
	)
  }
}

export default ReviewsItem