import { StyleSheet } from "react-native";
import { Colors } from "@common";

export default StyleSheet.create({
  container: {},
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
    marginTop: 3,
    height: 60
  },
  name: {
    fontSize: 17
  },
  carrier: {
    fontSize: 17,
    color: Colors.Gray,
    marginTop: 5
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: Colors.Gray
  },
  selectedIcon: {
    tintColor: Colors.AppColor
  },
  topcontainer: {
    height: 100
  },
  notice: {
    color: Colors.Gray,
  }
});
