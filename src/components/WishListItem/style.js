import {StyleSheet} from 'react-native'
import {Constants,Colors} from '@common'

export default StyleSheet.create({
  container:{
    backgroundColor:'white',
    flexDirection:'row',
    padding:10,
    marginHorizontal:10,
    marginTop:10,
    borderWidth:0.5,
    borderColor:Colors.Gray,
    borderRadius:5
  },
  image:{
    width:100,
    height:100,
  },
  content:{
    flex:1,
    marginLeft:10
  },
  name:{
    fontSize:14,
    color:Colors.DarkGray,
  },
  sale_price:{
    fontSize:15,
    marginTop:7,
    color:'black',
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    marginVertical:10
  },
  btnAdd:{
    paddingVertical: 10,
    height:40,
    width:75,
    borderRadius:3,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.Green,
    marginRight:10
  },
  btnView: {
    paddingVertical: 10,
    height:40,
    width:75,
    borderRadius:3,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.Gray,
    marginRight:10
  },
  add:{
    fontSize:14,
    fontWeight:'bold',
    color:'white'
  },
  icon:{
    width:25,
    height:25,
    resizeMode:'contain'
  }
})
