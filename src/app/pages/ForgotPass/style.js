import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flex:1,
    justifyContent: "center",
    backgroundColor: 'white',
  },
  list:{
    paddingBottom:10
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  btnClose: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 20
  },
  closeIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: '#404040'
  },
})
