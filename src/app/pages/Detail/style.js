import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Constants } from '@common'
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  image: {
    marginTop: 10,
    height: 210,
    width: '100%',
    resizeMode: 'contain'
  },
  separator: {
    height: 0.5,
    backgroundColor: Colors.Gray
  },
  name: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  price: {
    marginHorizontal: 10,
    fontSize: 15,
    color: Colors.DrakGray
  },
  regular_price: {
    textDecorationLine:'line-through',
    marginHorizontal: 10,
    fontSize: 15,
    color: Colors.DrakGray
  },
  addCart: {
    color: '#fff',
    width:Dimensions.get('window').width/2,
    backgroundColor:Colors.AppColor,
    justifyContent:'center',
    alignItems:'center',
    height: 50,
    borderRadius: 0,
  },
  disabledCart: {
    backgroundColor: Colors.Gray
  },
  addCartText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18
  },
  shortDescription: {
    marginHorizontal: 10
  },
  description: {
    width: Dimensions.get('window').width,
  },
  attributes: {
    margin: 10,
    marginTop: 5,
    marginBottom: 5
  },
  titleAttributes: {
    fontSize: Constants.FontSize.medium,
    color: Colors.Gray
  },
  readMoreLink: {
    color: Colors.Blue,
    textDecorationLine: 'underline'
  },
  contentVendor: {
    paddingHorizontal: 10
  },
  productRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  reviewText: {
    color: Colors.Blue
  },
  addCartBox: {
    flexDirection:'row',
    height:50,
    justifyContent:'space-between',
    backgroundColor:'#454c54',
    zIndex: 999,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  shareBtn:{
    width:Dimensions.get('window').width/6,
    justifyContent:'center',
    alignItems:'center',
    height: 50,
    borderRadius: 0,
    color: 'white'
  },
  reviewBtn:{
    width:Dimensions.get('window').width/6,
    justifyContent:'center',
    alignItems:'center',
    height: 50,
    borderRadius: 0,
    color: 'white'
  },
  wishlistBtn:{
    width:Dimensions.get('window').width/6,
    justifyContent:'center',
    alignItems:'center',
    height: 50,
    borderRadius: 0,
    color: 'white'
  },
  icon:{
    width:22,
    height:22,
    margin:4,
    resizeMode:'contain',
    tintColor:Colors.Gray
  },
  scrollView:{
    paddingHorizontal:5
  }
})
