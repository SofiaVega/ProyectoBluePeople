import React, {useState } from 'react';
import {Text, Modal, View, Button, Alert } from 'react-native';
import ngrok_url from "../constants/serverlink";
import { useNavigation } from "@react-navigation/native";

export default function ModalDesuscribir({ setModal, tema, userId }) {
  const navigation = useNavigation();
  const modalContainerStyle = {
    flex: 1,
    justifyContent: "center",
  };

  const titleStyle = {
    color: "black",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  };

  const modalStyle = {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 16,
    paddingHorizontal: 30,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadious: 4,
    elevation: 5,
    alignItems: "center",
  };

  const containerButtonsStyle = {
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-between",
    marginVertical: 20,
  };

  const deleteSuscripcion = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-user-id": userId },
    };
    await fetch(
      ngrok_url + `/api/subscriptions/${userId}/${tema.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => console.log(res));
    Alert.alert('Alerta', 'Dejaste de seguir el tema', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
    navigation.navigate("home");
  };

  return (
    <>
      <Modal transparent={true} animationType="fade">
        <View style={modalContainerStyle}>
          <View style={modalStyle}>
            <Text style={titleStyle}>
              ¿Estás seguro que quieres desuscribirte?
            </Text>
            <View style={containerButtonsStyle}>
              <Button title="Sí" onPress={deleteSuscripcion}></Button>
              <Button title="No" onPress={() => setModal()}></Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
