import React from "react";
import { View, Text } from "react-native";

interface IAccountScreenProps {
  navigation: {
    navigate: (arg: string) => void;
  };
}
export default (props: IAccountScreenProps) => {
  return (
    <View>
      <Text>Account Screen</Text>
    </View>
  );
};
