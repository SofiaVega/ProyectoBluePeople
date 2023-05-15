import React, { useState, useContext } from "react";
import { View, TextInput, Button, Alert, Pressable, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ngrok_url from "../constants/serverlink";
import AuthContext from "../components/context";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigator = useNavigation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const authContext = useContext(AuthContext);
  const handleRegister = async () => {
    try {
      const response = await fetch(ngrok_url + "/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });
      // const userId = response.data.userId;
      if (response.ok) {
        const data = await response.json();
        const userId = data.id.toString();
        console.log("REGISTERED USER: ", userId);
        await AsyncStorage.setItem("userId", userId);
        authContext.register(userId);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", "Registration failed. Please try again.");
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <Button title="Register" onPress={handleRegister} />
      <Pressable
        onPress={() => {
          navigator.navigate("zlogin");
        }}
      >
        <Text>Already registered? Login here</Text>
      </Pressable>
    </View>
  );
};

export default RegisterScreen;
