import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import Container from "../components/layouts/Container";

import CurrentUserContext from "../contexts/CurrentUserContext";

interface IFeedScreenProps {
  navigation: {
    navigate: (arg: string) => void;
  };
}
export default (props: IFeedScreenProps) => {
  const { currentUser } = React.useContext(CurrentUserContext);

  return (
    <Container navigate={props.navigation.navigate}>
      <Text>Feed Screen</Text>
      <View style={{ marginTop: 20 }}>
        <Text>{JSON.stringify(currentUser)}</Text>
      </View>
    </Container>
  );
};
