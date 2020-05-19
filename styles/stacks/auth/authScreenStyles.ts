import { StyleSheet } from "react-native";
import { dark } from "../../colors";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    backgroundColor: dark,
    padding: 15,
    height: "100%",
    marginTop: Constants.statusBarHeight,
  },
});
