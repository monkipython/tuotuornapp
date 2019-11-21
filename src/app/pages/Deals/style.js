import { StyleSheet } from "react-native";
import { Colors } from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LighterGray
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 10
  }
});
