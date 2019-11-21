import { StyleSheet } from 'react-native'
import { Constants, Colors } from '@common'

export default StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  label: {
    marginHorizontal: 15
  },
  trackStyle: {
    height: 5,
    backgroundColor: Colors.LightGray
  },
  selectedStyle: {
    height: 5,
    backgroundColor: Colors.AppColor
  },
  sliderWrap: {
    alignItems: 'center'
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  }
})
