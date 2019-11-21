import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flexDirection:'row',
    borderColor:Colors.LighterGray,
    borderWidth:0,
    borderLeftWidth:0,
    height:45
  },
  RightIcon:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'flex-end',
  },
  LeftIconStyle:{
    tintColor:Colors.AppColor,
    width:25,
    height:25,
    resizeMode:'contain',
    marginVertical:8

  },
  textItem:{
    fontSize:16,
    marginHorizontal:15,
    marginVertical:10


  },
  RightIconStyle:{
    tintColor:Colors.AppColor,
    width:25,
    height:25,
    resizeMode:'contain',
    marginVertical:8


  },
  badge:{
    width:10,
    height:10,
    borderRadius:4,
    backgroundColor:Colors.Red,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:16,
    right:30
  },
  text:{
    fontSize:10,
    color:'white'
  }
})
