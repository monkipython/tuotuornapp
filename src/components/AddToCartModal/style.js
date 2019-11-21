import {StyleSheet, Dimensions} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  modal: {
    zIndex: 99999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f9f9f9",
  },

  modal4: {
    height: Dimensions.get('window').height - 200,
    width: Dimensions.get('window').width
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:6,
    marginBottom: 10,
    paddingLeft: 20,
  },
  quantity:{
    fontSize:16
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "#333",
    padding: 10
  },
  addCart: {
    color: '#fff',
    width:Dimensions.get('window').width/2,
    backgroundColor:Colors.Green,
    justifyContent:'center',
    alignItems:'center',
    height: 50,
    borderRadius: 0,
    padding: 20
  },
  cancel:{
    color: '#fff',
    width:Dimensions.get('window').width/2,
    backgroundColor:Colors.Gray,
    justifyContent:'center',
    alignItems:'center',
    height: 50,
    borderRadius: 0,
    padding: 20
  },
  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },
  closeBtn:{
    width:22,
    height:22,
    margin:4,
    resizeMode:'contain',
  },
  insideScrollView:{
    width: Dimensions.get('window').width,
    paddingLeft: 15
  },
  addToCartModalBox: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    height: Dimensions.get('window').height - 200,
    zIndex: 999999,
    width: Dimensions.get('window').width,
  },
  addCartBox:{
    flexDirection:'row',
    height:50,
    justifyContent:'space-between',
    zIndex: 9,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  header:{
    width: Dimensions.get('window').width,
    height: 50,
  },
  header: {
    width: Dimensions.get('window').width,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  title:{
    fontSize: 18,
    color: '#333',
    paddingTop: 5,
    paddingBottom: 5
  }
})
