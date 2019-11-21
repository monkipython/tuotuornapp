import { StyleSheet, Dimensions} from "react-native";
import { Colors } from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.LighterGray
  },
  scrollContent: {
    paddingBottom: 80,
    paddingTop: 20
  },
  content: {
    backgroundColor: "white",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3
  },
  noteContent: {
    backgroundColor: Colors.LighterGray,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: 10,
    borderRadius: 3
  },
  note:{
    fontSize: 13,
    color: "#f1f1f1"
  },
  separator: {
    height: 0.5,
    backgroundColor: Colors.LightGray
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
