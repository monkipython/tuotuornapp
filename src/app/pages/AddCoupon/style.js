import { StyleSheet } from "react-native";
import { Colors } from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.LighterGray
  },
  content: {
    backgroundColor: "white",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3
  },
  btnSubmit: {
    marginTop: 20,
    backgroundColor: Colors.AppColor,
    borderRadius: 2,
    marginHorizontal: 10
  }
});