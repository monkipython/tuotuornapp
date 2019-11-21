import {StyleSheet} from 'react-native'
import {Constants,Colors} from '@common'

export default StyleSheet.create({
  containerStyle: {
    flexDirection: 'row', 
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
  buttonContainer: {
    borderColor: Colors.AppColor,
    borderWidth: 2,
    backgroundColor: 'white',
    marginLeft: 6
  },
  buttonTextStyle:{
    color: Colors.AppColor
  },
  buttonTextActiveStyle:{
    color: 'white'
  },
  buttonContainerActiveStyle: {
    backgroundColor: Colors.AppColor, 
  },
  buttonContainerInactiveStyle: {
    borderColor: Colors.AppColor,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  buttonTextInActiveStyle:{
    color: Colors.AppColor
  },
  panelHeader: {
    fontSize: 16,
    padding: 5,
    marginBottom: 5
  }
})
