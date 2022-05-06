import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';

import MapView, { Callout, Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastrarReserva({ navigation }) {
    const [idVaga, setIdVaga] = useState(16)
    const [idReserva, setIdReserva] = useState(6)

    const criarReserva = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.post('/Reserva', {
                idVaga: 16
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
            if (resposta.status === 201) {
                console.warn('Cadastro feito')
            }
        } catch (error) {
            console.warn(resposta)
            console.warn(error);
        }
    };

    const atualizarReserva = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.put('/Reserva/6', {
                statusPagamento: true
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
            if (resposta.status === 204) {
                console.warn('Reserva finalizada')
            }
        } catch (error) {
            console.warn(resposta)
            console.warn(error);
        }
    };

    const atualizarPontos = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.put('/Reserva', {
                headers: { Authorization: 'Bearer ' + token },
            })
            if (resposta.status === 200) {
                console.warn('Troca finalizada')
            }
        } catch (error) {
            console.warn(resposta)
            console.warn(error);
        }
    };

    useEffect(() => {
        //criarReserva();
    }, []);

    return (
        <View style={styles.main}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor='#F3BC2C'
                hidden={false}
            />

            <View style={styles.mainGap}></View>
            <View style={styles.mainHeader}>
                <View style={styles.mainHeaderSpace}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/img/icon_back.png')} style={styles.mainHeaderImage} />
                    </TouchableOpacity>
                    <Text style={styles.mainHeaderText}>Reserva</Text>
                </View>
            </View>

            <View style={styles.mainContent}>
                <TouchableOpacity style={styles.mainContentFormButton} onPress={() => {atualizarReserva(), atualizarPontos()}}>
                    <Text style={styles.mainContentFormButtonText}>Finalizar reserva</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    mainGap: {
        // height: 37,
        height: '4.3%',
    },
    mainHeader: {
        width: '100%',
        // height: 65,
        height: '7.6%',
        backgroundColor: '#F3BC2C',
        justifyContent: 'center',
    },
    mainHeaderImage: {
        width: 25,
        height: 21.56,
    },
    mainHeaderSpace: {
        width: '59%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        // marginLeft: 18,
        marginLeft: '4.7%',
    },
    mainHeaderImage: {
        width: 25,
        height: 21.56,
    },
    mainHeaderText: {
        fontFamily: 'IBMPlexMono_700Bold',
        fontSize: 25,
    },
    mainContent: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
        // marginTop: '10%'
    },
    mainContentFormButton: {
        // width: 157,
        width: '40%',
        // height: 60,
        height: '8%',
        borderRadius: 5,
        backgroundColor: '#F3BC2C',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '8%',
    },
    mainContentFormButtonText: {
        fontSize: 25,
        fontFamily: 'IBMPlexMono_700Bold',
        color: '#000000'
    },
});