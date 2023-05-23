import React, { useState, useContext } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet, Pressable, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ngrok_url from "../constants/serverlink";
import AuthContext from "../components/context";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

const LoginAdminScreen = () => {
    const navigator = useNavigation();
    const [email, setEmail] = useState("");


    return(
        <View
        style={{
            backgroundColor: "#263750",
            padding: 20,
            flex: 1,
          }}
        >
            <View style={{paddingTop: 20,}}>
                <Image
                source={require("./../assets/images/Union.png")}
                style={styles.logo}
                />
            </View>
            
            <Text style={{flexDirection: 'row', alignSelf: 'center', paddingTop: 20,}}>
                <Text style={styles.notify}>Notify </Text> <Text style={styles.admin}>admin</Text>
            </Text>

            <Text style={styles.titleInput}>Ingresa tu correo electrónico:</Text>
            <TextInput placeholder="Correo electrónico" placeholderTextColor='grey' style={styles.input} onChangeText={setEmail} value={email} autoCapitalize='none'/>

            <View style={{paddingTop: 25}}>
                <Pressable style={styles.buttonContainer} >
                    <Text style={styles.textoButton}>Inicia Sesión</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#4577BB",
        padding: 15,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#fdfdfd",
        fontSize: 10,
        width: "70%",
        alignItems: "center",
        justifyContent: "center",
        color: "#fdfdfd",
        alignSelf: 'center',
      },
      textoButton: {
        fontSize: 15,
        lineHeight: 24,
        textAlign: "center",
        color: "#fdfdfd",
        fontWeight: "bold",
        fontFamily: "PoppinsSemiBold",
      },
      input: {
        borderRadius: 20,
        borderWidth: 1,
        padding:10,
        height: 40,
        margin: 12,
        borderColor: '#fdfdfd',
        backgroundColor: "#fdfdfd",
        fontFamily: 'PoppinsLight',
        color: 'black',
      },
      titleInput: {
        fontFamily: "PoppinsRegular",
        padding: 5,
        paddingStart: 15,
        paddingTop: 40,
        color: "#fdfdfd",
      },
      logo: {
        width: 120, 
        height: 100,
        alignSelf: 'center',
      },
      notify: {
        color: '#fdfdfd',
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'PoppinsBold',
        padding: 10,
        alignSelf: 'center',
      },
      admin: {
        color: '#fdfdfd',
        fontSize: 20,
        fontFamily: 'PoppinsLight',
        padding: 10,
        alignSelf: 'center',
      },

});

export default LoginAdminScreen;