import React from 'react';
import {Text, Modal, View, Button} from 'react-native';

export default function ModalDesuscribir({isModalOpen, setIsModalOpen}) {

    const modalContainerStyle = {
        flex: 1,
        justifyContent: 'center'
    }

    const titleStyle = {
        color: 'black',
        fontSize: '1.5rem',
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
        width: '10%',
        justifyContent: 'space-between',
        marginVertical: 10,
    }

    return (
        <>
            <Modal visible={isModalOpen} transparent={true} animationType='fade'>
                <View style={modalContainerStyle}>
                    <View style={modalStyle}>
                        <Text style={titleStyle}>¿Estás seguro que quieres desuscribirte?</Text>
                        <View style={containerButtonsStyle}>
                            <Button title='Sí'></Button>
                            <Button title='No' onPress={() => setIsModalOpen(!setIsModalOpen)}></Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}