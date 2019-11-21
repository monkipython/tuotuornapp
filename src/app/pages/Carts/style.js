import {StyleSheet, Dimensions} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flex:1,
  },
  list:{
    paddingBottom:10
  },
  btnCheckout:{
    fontSize: 20,
    borderRadius:0,
    backgroundColor:Colors.AppColor,
    marginBottom:0,
    marginHorizontal:0,
    height: 50
  },
  wrapper:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  },
  message:{
    fontSize:18,
    textAlign:'center',
    marginHorizontal:20,
    fontWeight:'bold',
    color:Colors.Gray
  },
  couponView: {
    height: 50,
    paddingHorizontal:12,
    backgroundColor: 'white',
    borderRadius: 2,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
  validCoupon:{
    borderWidth: 2,
    borderColor: Colors.Green
  },
  inValidCoupon:{
    borderWidth: 0,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
  couponInput: {
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    height: 50
  },
  totalContainer: {
    borderTopColor: '#f6f6f6',
    borderTopWidth: 1,
    backgroundColor: 'rgb(242,242,242)'
  },
  totalContent: {
    flexDirection:'row',
    height:50,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  totalLabel: {
    paddingLeft:15,
    paddingRight:5,
    fontSize:16,
    fontWeight:'bold',
    textAlign: 'right',
    width:Dimensions.get('window').width/2,
    justifyContent:'center',
    alignItems:'center',
  },
  new_totalLabel:{
    paddingLeft:15,
    paddingRight:5,
    fontSize:16,
    fontWeight:'bold',
    textAlign: 'right',
    width:Dimensions.get('window').width/2.5,
    justifyContent:'center',
    alignItems:'center',
  },
  total:{
    paddingVertical:15,
    fontSize:16,
    fontWeight:'bold',
  },
  old_total:{
    paddingVertical:15,
    fontSize:16,
    fontWeight:'bold',
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
  },
  new_total: {
    paddingLeft:10,
    paddingRight:5,
    fontSize:16,
    fontWeight:'bold',
    color: Colors.Red,
  }
})
