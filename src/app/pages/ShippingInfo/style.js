import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.LighterGray
  },
  scrollContent:{
    paddingTop: 20,
    paddingBottom: 80,
  },
  content: {
    marginHorizontal: 10
  },
  btnSubmit: {
    position: 'absolute',
    left:0,
    bottom: 0,
    width: Dimensions.get('window').width,
    backgroundColor: Colors.AppColor,
    borderRadius: 0,
  }
});
