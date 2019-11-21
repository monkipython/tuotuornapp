import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    // marginTop:10,
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 2,
    borderBottomColor: '#f3f3f3' 
  },
  image:{
    width:85,
    height:85,
    borderRadius:42.5,
    marginLeft:10
  },
  content:{
    flex:1,
    marginHorizontal:10
  },
  text:{
    fontSize:16,
    marginTop:5
  },
})
