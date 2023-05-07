import { StyleSheet, Button, Switch, Image, SafeAreaView, ScrollView, Pressable, TextInput } from 'react-native';
import { Feather } from "@expo/vector-icons";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ComponenteTemaConfig from '../components/ComponenteTemaConfig';
import { color } from '@rneui/themed/dist/config';
import ComponenteHeader from "../components/ComponenteHeader";
import { Link, Tabs } from "expo-router";
import React from 'react';
import QRCode from 'react-qr-code';
import { StatusBar } from 'expo-status-bar';

type Tema = {
  titulo: string;
  descripcion: string;
};


export default function QRGenerate() {
  const [QRvalue, setQRValue] = React.useState('');
  const [QRLogo, setQRLogo] = React.useState('');
  const [QRImage, setQRImage] = React.useState('');
  const ref = React.useRef();
  return (
    <SafeAreaView style={{ backgroundColor: "#E8F1F2" }}>
      <ComponenteHeader></ComponenteHeader>
      <View style={[styles.sectionContainer]}>
        <Text style={styles.sectionTitle}>Generate QRCode</Text>
        <View style={[styles.row, {flex: 1, alignItems:'center', justifyContent: 'center'}]}>
          {/* <TextInput 
            placeholder= "Add Value to QRCode"
            style={styles.textInput}
            autoCapitalize="none"
            value={QRvalue}
            onChangeText={setQRValue}
          />
          <TextInput 
            placeholder= "Add Logo URL"
            style={styles.textInput}
            autoCapitalize="none"
            value={QRLogo}
            onChangeText={setQRLogo}
          /> */}
          </View>
      <QRCode
      size={200}
      value="hola"
    />
    </View>
  </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: '#fdfdfd'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  highlight: {
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#fdfdfd'
    },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginRight: 20,
    marginVertical: 20,
    borderRadius: 20,
    width: 162,
    borderWidth: 1,
    borderStyle: 'solid',
  },
});

