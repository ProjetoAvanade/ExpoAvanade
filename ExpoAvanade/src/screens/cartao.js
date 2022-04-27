import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, TextInput } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class Cartao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomeUsuario: '',
            email: '',
            pontos: 0,
            saldo: 0,
        };
    }

    realizarLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            this.props.navigation.navigate('Login');
        } catch (error) {
            //console.warn(error);
        }
    }

    buscarInfoPerfil = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.get('/Usuario', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            if (resposta.status === 200) {
                const dadosDaApi = resposta.data;
                this.setState({
                    nomeUsuario: dadosDaApi.nomeUsuario,
                    email: dadosDaApi.email,
                    pontos: dadosDaApi.pontos,
                    saldo: dadosDaApi.saldo,
                });
            }
        } catch (error) {
            //console.warn(resposta)
            //console.warn(error);
        }
    };

    componentDidMount() {
        this.buscarInfoPerfil();
    }

    render() {
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
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/img/icon_back.png')} style={styles.mainHeaderImage} />
                        </TouchableOpacity>
                        <Text style={styles.mainHeaderText}>Novo cartão</Text>
                    </View>
                </View>

                <View style={styles.mainContentInputSpace}>
                    <Text style={styles.mainContentText}>Numero do cartão</Text>
                    <TextInput
                        style={styles.mainContentInput}
                        placeholder='XXXX XXXX XXXX XXXX'
                        placeholderTextColor='#000000'
                        keyboardType="email-address">
                    </TextInput>
                </View>

                <View style={styles.mainContentInputSpace}>
                    <Text style={styles.mainContentText}>Nome do cartão</Text>
                    <TextInput
                        style={styles.mainContentInput}
                        placeholder='Nome do cartão'
                        placeholderTextColor='#000000'
                        keyboardType="email-address">
                    </TextInput>
                </View>

                <View style={styles.mainContentSpace}>
                    <View style={styles.mainContentInputSpace}>
                        <Text style={styles.mainContentText}>Validade</Text>
                        <TextInput
                            style={styles.mainContentInputValidate}
                            placeholder='MM/AA'
                            placeholderTextColor='#000000'
                            keyboardType="email-address">
                        </TextInput>
                    </View>
                    <View style={styles.mainContentInputSpace}>
                        <Text style={styles.mainContentText}>Código de segurança</Text>
                        <TextInput
                            style={styles.mainContentInputSecurity}
                            placeholder='XXX'
                            placeholderTextColor='#000000'
                            keyboardType="email-address">
                        </TextInput>
                    </View>
                </View>

                <View style={styles.mainContentInputSpace}>
                    <Text style={styles.mainContentText}>CPF do titular do cartão</Text>
                    <TextInput
                        style={styles.mainContentInput}
                        placeholder='XXX.XXX.XXX-XX'
                        placeholderTextColor='#000000'
                        keyboardType="email-address">
                    </TextInput>
                </View>
                <TouchableOpacity style={styles.mainContentModalBottomConfirmation}>
                    <Text style={styles.mainContentModalBottomConfirmationText}>Prosseguir</Text>
                </TouchableOpacity>

            </View >
        );
    }
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
    mainHeaderSpace: {
        width: '65%',
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
    mainContentText: {

    },
    mainContentInput: {
        width: 360,
        height: 60,
        borderWidth: 2,
        borderColor: '#F3BC2C',
        borderRadius: 5,
        paddingLeft: 23,
    },
    mainContentInputValidate: {
        width: 180,
        height: 60,
        borderWidth: 2,
        borderColor: '#F3BC2C',
        borderRadius: 5,
        paddingLeft: 23
    },
    mainContentInputSecurity: {
        width: 160,
        height: 60,
        borderWidth: 2,
        borderColor: '#F3BC2C',
        borderRadius: 5,
        paddingLeft: 23
    },
    mainContentSpace: {
        width: 360,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainContentInputSpace: {
        marginTop: 20
    },
    mainContentModalBottomConfirmation: {
        width: 360,
        height: 50,
        backgroundColor: '#F3BC2C',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 300,
    },
    mainContentModalBottomConfirmationText: {
        fontSize: 20
    },

});