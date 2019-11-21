import { StyleSheet } from "react-native";
import { Colors } from "@common";

export default StyleSheet.create({
  container: {},
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 3,
    marginTop: 3,
    height: 60
  },
  name: {
    fontSize: 12
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: Colors.Gray
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 10
  },
  selectedIcon: {
    tintColor: Colors.AppColor
  }
});
