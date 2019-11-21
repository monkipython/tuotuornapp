import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@common";

const product_width = Dimensions.get('window').width / 2;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LighterGray,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  content: {
    paddingBottom: 10
  },
  product: {
    width: product_width
  }
});
