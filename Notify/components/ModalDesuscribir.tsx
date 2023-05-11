import React, {useState } from 'react';
import {Text, Modal, View, Button } from 'react-native';
import ngrok_url from "../constants/serverlink";

export default function ModalDesuscribir({isModalOpen, setIsModalOpen}) {
    const [temasID, settemasID] = useState("");
    const [subscriptorID, setsubscriptorID] = useState("");

    const modalContainerStyle = {
        flex: 1,
        justifyContent: 'center'
    }

    const titleStyle = {
        color: 'black',
        fontSize: 15,
        textAlign: 'ceter',
        fontWeight: 'bold',
    }

    const modalStyle = {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 16,
        paddingHorizontal: 30,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadious: 4,
        elevation: 5,
        alignItems: 'center',
    }

    const containerButtonsStyle = {
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'space-between',
        marginVertical: 20,
    }

    const deleteSuscripcion = async (e) => {
        e.preventDefault();

        const data = { temas_id: temasID, suscriptor_id: subscriptorID };

        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "x-user-id": "4"},
            body: JSON.stringify(data),
        };
        await fetch(
            ngrok_url+`/api/subscriptions/${subscriptorID}/${temasID}`,
            requestOptions
        )
        .then((response) => response.json())
        .then((res) => console.log(res));
        alert("Dejaste de seguir al tema")
        setIsModalOpen(!setIsModalOpen)
    }

        return (
            <>
                <Modal visible={isModalOpen} transparent={true} animationType='fade'>
                    <View style={modalContainerStyle}>
                        <View style={modalStyle}>
                            <Text style={titleStyle}>¿Estás seguro que quieres desuscribirte?</Text>
                            <View style={containerButtonsStyle}>
                                <Button title='Sí' onPress={deleteSuscripcion}></Button>
                                <Button title='No' onPress={() => setIsModalOpen(!setIsModalOpen)}></Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </>
        );
}