import {StyleSheet} from 'react-native'
import {Colors} from '@common'
export default StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    backgroundColor: Colors.LighterGray
  },
  logo:{
    width:250,
    height:150,
    resizeMode:'contain',
    position:'absolute',
    top:100,
    alignSelf:'center',
    tintColor: Colors.AppColor
  },
  content:{
    backgroundColor:'white',
    marginHorizontal:10
  },
  separator:{
    height:0.5,
    backgroundColor:Colors.LightGray
  },
  btnSubmit:{
    position:'absolute',
    bottom:30,
    left:10,
    right:10,
    borderRadius:5,
    backgroundColor: Colors.ButtonSuccess
  }
})
