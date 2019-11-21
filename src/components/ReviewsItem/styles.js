import { StyleSheet } from 'react-native'
import { Colors } from '@common'

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  reviewText: {
    color: Colors.Blue,
    marginRight: 10,
    borderColor: Colors.Blue, 
    borderWidth: 1, 
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 3,
    paddingLeft: 3
  }
})