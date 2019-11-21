import {StyleSheet, Dimensions} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:10,
    paddingVertical:10
  },
  title:{
    fontSize:18,
    color:Colors.DarkGray
  },
  seeAll:{
    fontSize:18,
    color:Colors.DarkGray
  }
})
