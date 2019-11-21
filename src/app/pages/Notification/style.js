import {StyleSheet, Dimensions} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  	container:{
    	flex:1,
  	},
  	list:{
    	paddingBottom:10
  	},
  	right:{
  		width:Dimensions.get('window').width/3,
	    justifyContent:'center',
	    alignItems:'center',
	    height: 60,
	    borderRadius: 0,
	    color: 'white',
	    textAlign: 'right'
	},
	left:{
		width: (Dimensions.get('window').width / 3) * 2,
	    justifyContent:'center',
	    alignItems:'center',
	    height: 60,
	    borderRadius: 0,
	    color: 'white',
	    textAlign: 'left'
	},
	group:{
		flexDirection:'row',
	    height:60,
	    marginTop: 10,
	    justifyContent:'space-between',
	    zIndex: 999,
	    backgroundColor: '#fff',
	    width: Dimensions.get('window').width,
	    alignItems: 'center',
	},
	text: {
    	fontSize: 18
	}
})
