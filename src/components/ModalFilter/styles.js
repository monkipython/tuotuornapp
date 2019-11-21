import { StyleSheet } from 'react-native'
import { Constants } from '@common'
import { Header } from 'react-navigation'


export default StyleSheet.create({
  backgroundColor: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    paddingTop: Header.HEIGHT + 5
  },
  content: {
    width: Constants.ScreenSize.width - 40,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 5
  },
  btnClose: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    margin: 5
  },
  title:{
    fontSize: Constants.FontSize.small,
    fontWeight:'bold'
  },
  contentModal: {
    
  }
})