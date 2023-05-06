import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Scanner2() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    const datos = { temas_id: data, suscriptor_id: 5 };
    console.log(datos)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": "5" },
      body: JSON.stringify(datos),
    };
    await fetch(
      `https://b4c9-2806-108e-13-636-d5d4-9d66-2340-3ac.ngrok-free.app/api/subscribe/${data}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => console.log(res));
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}
const styles = StyleSheet.create ({
    container: {
        flex:1,
        flexDirection:'column',
        justifyContent:'center'
    }
})