import React from "react";
import { View, Text } from "react-native";

interface IPostFormScreenProps {
  navigation: {
    navigate: (arg: string) => void;
  };
}
export default (props: IPostFormScreenProps) => {
  return (
    <View>
      <Text>Form Screen</Text>
    </View>
  );
};
