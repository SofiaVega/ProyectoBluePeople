import { View, Button} from 'react-native';
import {StyleSheet } from "react-native";
import React from 'react';

import { useNavigation } from 'expo-router';

export default function ScannerContainer(){
    const navigation = useNavigation();
    return (
        <View style = {styles.container}>
            <Button title = 'Scan' onPress={()=> navigation.navigate('Scanner')}>

            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#E8F1F2",
    },
  });
  