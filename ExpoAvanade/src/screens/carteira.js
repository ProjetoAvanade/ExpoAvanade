import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class Carteira extends Component {
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
                        <Text style={styles.mainHeaderText}>Adicionar saldo</Text>
                    </View>
                </View>

                <View style={styles.mainContent}>
                    <View style={styles.mainContentCard}>
                        <Text style={styles.mainContentCardTitle}>Saldo atual:</Text>
                        <Text style={styles.mainContentCardWallet}>R${this.state.saldo}</Text>
                    </View>
                </View>

                <View style={styles.mainContentModal}>
                    <View>
                        <Text >Adicione quantos créditos deseja comprar</Text>
                    </View>
                    <View>
                        <View>
                            <TouchableOpacity></TouchableOpacity>
                            <TouchableOpacity></TouchableOpacity>
                            <TouchableOpacity></TouchableOpacity>
                        </View>

                        <TouchableOpacity></TouchableOpacity>

                        <TouchableOpacity></TouchableOpacity>

                    </View>
                </View>
            </View>
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
        width: '70%',
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
        width: '100%',
        height: '50%',
        alignItems: 'center'
    },
    mainContentCard: {
        width: 337,
        height: 200,
        backgroundColor: '#F3BC2C',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    mainContentCardTitle: {
        fontSize: 20
    },
    mainContentCardWallet: {
        fontSize: 40
    },
    mainContentModal: {
        width: '100%',
        height: '50%',
    }
});