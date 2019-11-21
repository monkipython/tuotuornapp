import React from 'react'
import {Home} from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons,Constants,Global} from '@common'

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: <NavTitle />,
    headerLeft: <NavButton icon={Icons.Search} style={{marginLeft:10}} onPress={()=>navigation.navigate(Constants.Screen.Search)}/>,

  })

  render(){
    const {navigation} = this.props
    return <Home
            navigation={navigation}
            showDetail={(product)=>navigation.navigate(Constants.Screen.Detail,{product})}
            openProductsByCategory={(category)=>navigation.navigate(Constants.Screen.ProductsByCategory,{category})}/>
  }

  componentDidMount(){
    this.openPageListener = Global.EventEmitter.addListener(Constants.EventEmitterName.OpenPage,this.openProductsByCategory)
    this.onLogin = Global.EventEmitter.addListener(Constants.EventEmitterName.onLogin, this.onLogin)
  }

  componentWillUnmount(){
    this.openPageListener.remove()
    this.onLogin.remove()
  }

  onLogin = () => {
    this.props.navigation.navigate(Constants.Screen.SignIn)
  }

  openProductsByCategory = (category)=>{
    this.props.navigation.navigate(Constants.Screen.ProductsByCategory,{category})
  }
}

export default HomeScreen
