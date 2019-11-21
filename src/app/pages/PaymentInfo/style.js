import { StyleSheet, Dimensions} from "react-native";
import { Colors } from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    justifyContent: "center",
    backgroundColor: Colors.LighterGray,
    width: Dimensions.get('window').width,
  },
  scrollContent:{
    paddingTop: 20,
    paddingBottom: 80,
  },
  content: {
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  btnSubmit: {
    position: 'absolute',
    left:0,
    bottom: 0,
    width: Dimensions.get('window').width,
    backgroundColor: Colors.AppColor,
    borderRadius: 0,
  },
  cartContent: {
    height: 400,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
    width: Dimensions.get('window').width - 10,
  },
  items: {
    paddingTop: 20,
    paddingRight: 20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width - 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F9F9F9',
    paddingHorizontal: 10,
  },
  leftText: {
    padding: 10,
    paddingTop: 15,
    width: (Dimensions.get('window').width / 2) - 20,
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
    height: 50,
    flex: 1,
    flexWrap: 'wrap',
  },
  rightText: {
    padding: 10,
    paddingTop: 15,
    width:(Dimensions.get('window').width / 2) - 20,
    fontSize: 16,
    textAlign: 'right',
    fontWeight: 'bold',
    height: 50,
    flex: 1,
    flexWrap: 'wrap',
  },
  list:{
    paddingBottom:10
  },
});
