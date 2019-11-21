import React from 'react'
import { SafeAreaView, StatusBar, I18nManager, Button, Text, View, NetInfo, Dimensions, Alert } from 'react-native'
import Router from './Router'
import { Languages, Constants, Global, Colors } from '@common'
import I18n from 'react-native-i18n'
import Drawer from '@libs/drawer'
import { LeftMenu } from '@components'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.setupI18n()
    
    StatusBar.setBarStyle('light-content', true)
    
    this.state = {
      show: false,
      isConnected: true,
    }
  }

  render() {
    //this.forceUpdate()
    if(this.state.isConnected){
      return (
          <Router />
      ) 
    }

    return (
      <View style={refreshStyles.middleView}>
        <View style={refreshStyles.navigationBar} />
        <Text style={refreshStyles.msgView}>无法访问网络</Text>
        <Button style={refreshStyles.refreshBtn} onPress={this.refreshHandler.bind(this)}
        title="刷新">
          <Text style={refreshStyles.btnTxt}>刷新</Text>
        </Button>
        <View style={refreshStyles.footerBar} />
      </View>
    )
  }

  refreshHandler(){
    this.setState({isConnected: true});
    this.forceUpdate()
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      let isConn = (isConnected ? true : false);
      this.setState({isConnected: isConn});
    });
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange.bind(this)
    );
    this.dawerOpenListener = Global.EventEmitter.addListener(Constants.EventEmitterName.OpenDrawer, this.openDawer)
  }

  handleFirstConnectivityChange(isConnected) {
    let isConn = (isConnected ? true : false);
    this.setState({isConnected: isConn});
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange.bind(this)
    );
  }

  componentWillUnmount() {
    this.dawerOpenListener.remove()
  }

  openDawer = () => {
    this.setState({ show: true })
  }

  onClose = () => {
    this.setState({ show: false })
  }

  onOpenPage = (item) => {
    this.setState({ show: false }, () => {
      Global.EventEmitter.emit(Constants.EventEmitterName.OpenPage, item)
    })
  }

  onLogout = () => {
    this.setState({ show: false }, () => {
      Global.EventEmitter.emit(Constants.EventEmitterName.onLogout)
    })
  }

  onLogin = () => {
    this.setState({ show: false }, () => {
      Global.EventEmitter.emit(Constants.EventEmitterName.onLogin)
    })
  }

  setupI18n = () => {
    I18n.fallbacks = true
    I18n.translations = Languages
    global.__ = I18n
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#333', shadowOpacity: 0.6, shadowRadius: 0 },
  main: { paddingLeft: 3 },
}
const refreshStyles = {
  middleView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  navigationBar: {
    height: 70,
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    backgroundColor: '#e1e1e1'
  },
  footerBar:{
    height: 60,
    position: "absolute",
    left: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    backgroundColor: '#e1e1e1'
  },
  msgView: {
    textAlign: "center",
    fontSize: 18,
    color: "#BDBDBD"
  },
  refreshBtn: {
    marginTop: 10,
    color: Colors.AppColor,
    height: 45,
    alignSelf:'center'
  },
  btnTxt: {
    fontSize: 16,
    color: Colors.AppColor
  }
}
export default App
