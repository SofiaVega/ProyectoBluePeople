import React from 'react';
import {Text, Modal, View, Button} from 'react-native';

export default function ModalDesuscribir({confirmacionBaja, setConfirmacionBaja}) {

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

    return (
        <>
            <Modal visible={confirmacionBaja} transparent={true} animationType='fade'>
                <View style={modalContainerStyle}>
                    <View style={modalStyle}>
                        <Text style={titleStyle}>Te has eliminado del tema exitosamente</Text>
                    </View>
                </View>
            </Modal>
        </>
    );
}