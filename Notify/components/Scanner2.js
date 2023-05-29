import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import ngrok_url from "../constants/serverlink";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../components/context";

export default function Scanner2({ user_id }) {
  console.log("Scanner user id: ", user_id);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const getName = async (tema_id) => {
    try {
      const data = await fetch(ngrok_url + `/api/getName/${tema_id}`, {
        method: "GET",
        headers: {
          "x-user-id": user_id,
          "Content-Type": "application/json",
        },
      });
      if (!data.ok) {
        console.error(`API responded with status ${data.status}`);
      }
      const jsonData = await data.json();
      console.log("new api call")
      console.log(jsonData)
      return jsonData;
    } catch (e) {
      console.log("owo");
      console.error(e);
    }
  };
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const datos = { temas_id: data, suscriptor_id: user_id };
    console.log(datos);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": user_id },
      body: JSON.stringify(datos),
    };
    await fetch(ngrok_url + `/api/subscribe/${user_id}/${data}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.hasOwnProperty("error")) {
          if (res["error"] === "User is already suscribed") {
            getName(data);
            Alert.alert("Aviso", `Ya estabas suscrito al canal ${data}`);
          } else {
            Alert.alert(
              "Error",
              `Error suscribiendote al canal ${data}. Este canal no existe.`
            );
          }
          setErrorMessage(true);
        } else {
          setErrorMessage(false);
          Alert.alert("Listo!", `Te suscribiste al canal ${data}`);
        }
        navigation.goBack();
        // error message if res is not success
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.qrScanner}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      {scanned ? (
        <Button
          title={"Click aqui para escanear de nuevo"}
          onPress={() => setScanned(false)}
        />
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  qrScanner: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
