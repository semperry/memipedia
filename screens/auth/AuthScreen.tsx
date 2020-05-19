import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

import textInputStyles from "../../styles/forms/textInputStyles";
const { textFieldWrapper, textField } = textInputStyles;
import authScreenStyles from "../../styles/stacks/auth/authScreenStyles";
import API from "../../utils/api";
import Button from "../../components/helpers/buttons/Button";

interface IAuthScreenInterfaceProps {
  navigation: {
    navigate: (arg: string) => void;
  };
}
export default (props: IAuthScreenInterfaceProps) => {
  const [formToShow, setFormToShow] = useState("LOGIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const screenTypeText = () => {
    if (formToShow === "LOGIN") {
      return "Need an account? Register";
    } else if (formToShow === "REGISTER") {
      return "Already have an account? Login";
    }
  };

  const handleAuthTypePress = () => {
    if (formToShow === "LOGIN") {
      setFormToShow("REGISTER");
    } else if (formToShow === "REGISTER") {
      setFormToShow("LOGIN");
    }
  };

  const buttonText = () => {
    if (formToShow === "LOGIN") {
      return "Login";
    } else if (formToShow === "REGISTER") {
      return "Register";
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const params = {
      auth: {
        email: email,
        password: password,
      },
    };

    API.post("/memipedia_user_token", params)
      .then((res) => {
        if (res.data.jwt) {
          props.navigation.navigate("Feed");
        } else {
          alert(
            "It looks like you typed in the wrong email or password, please try again"
          );
          setIsSubmitting(false);
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        alert(
          "It looks like you typed in the wrong email or password, please try again"
        );
      });
  };

  return (
    <View style={authScreenStyles.container}>
      <View style={textFieldWrapper}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
          style={textField}
          autoCapitalize="none"
          spellCheck={false}
        />
      </View>
      <View style={textInputStyles.textFieldWrapper}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          style={textInputStyles.textField}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        style={{ marginTop: 10, marginBottom: 20 }}
        onPress={handleAuthTypePress}
      >
        <Text style={{ color: "white" }}>{screenTypeText()}</Text>
      </TouchableOpacity>

      {isSubmitting ? (
        <Button text={"Submitting..."} onPress={handleSubmit} disabled={true} />
      ) : (
        <Button text={buttonText()} onPress={handleSubmit} />
      )}
    </View>
  );
};
