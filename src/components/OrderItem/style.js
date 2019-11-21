import {StyleSheet} from 'react-native'
import {Constants,Colors} from '@common'

export default StyleSheet.create({
  container:{
    backgroundColor:'white',
    marginHorizontal:8,
    borderRadius:3,
    marginTop:8,
    padding:10,
  },
  leftcontainer:{
    height: 80,
    width: 200
  },
  rightcontainer:{
    height: 80, 
    width: 100
  },
  code:{
    fontSize:15,
    fontWeight:'bold',
  },
  text:{
    fontSize:14,
    color:Colors.DarkGray,
    flex: 1
  },
  righttext:{
    position: 'absolute',
    right: 10,
    bottom: 10
  }
})
