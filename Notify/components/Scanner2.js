import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ngrok_url from "../constants/serverlink";

export default function Scanner2() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const datos = { temas_id: data, suscriptor_id: 5 };
    console.log(datos)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": "5" },
      body: JSON.stringify(datos),
    };
    await fetch(
      ngrok_url + `/api/subscribe/${data}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("RESSSS");
        console.log(res);
        console.log(res.error)
        if (res.hasOwnProperty("error")){
          if (res["error"] === "User is already suscribed"){
            alert(`Ya estabas suscrito al canal ${data}`);
          }else {
            alert(`Error suscribiendote al canal ${data}`);
          }
          setErrorMessage(true);
        }else{
          setErrorMessage(False);
          alert(`Te suscribiste al canal ${data}`);
        }
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
        {scanned ? <Text>Codigo invalido</Text> : null }
      
      <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
    </View>
  );
}
const styles = StyleSheet.create ({
    container: {
        flex:1,
        flexDirection:'column',
        justifyContent:'center'
    },
    qrScanner: {
        flex: 1,
        flexDirection:'column',
        justifyContent:'center'
    }
})