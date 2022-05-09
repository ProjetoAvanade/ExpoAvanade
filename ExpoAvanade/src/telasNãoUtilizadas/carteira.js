import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class Carteira extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saldo: 0,
        };
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
              saldo: dadosDaApi.saldo,
            });
          }
        } catch (error) {
          //console.warn(resposta)
          //console.warn(error);
        }
      };

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
                    <View style={styles.mainContentModalTitle}>
                        <Text style={styles.mainContentModalTitleText} onPress={() => this.props.navigation.navigate('Cartao')}>Adicione quantos créditos deseja comprar</Text>
                    </View>
                    <View style={styles.mainContentModalBottom}>
                        <View style={styles.mainContentModalBottomSpace}>
                            <TouchableOpacity style={styles.mainContentModalBottomBtn}>
                                <Text>R$5,75</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.mainContentModalBottomBtn}>
                                <Text>R$11,50</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.mainContentModalBottomBtn}>
                                <Text>R$29,00</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.mainContentModalBottomPayment} onPress={() => this.props.navigation.navigate('Cartao')}>
                            <Text style={styles.mainContentModalTitleText}>Forma de pagamento</Text>
                            {/* <View styles={styles.mainContentModalBottomPaymentSpace}> */}
                                <Image source={require('../../assets/img/icon_card.png')} style={styles.mainContentModalBottomPaymentImage} />
                                <Text style={styles.mainContentModalTitleText}>Novo cartão</Text>
                                <Image source={require('../../assets/img/icon_next.png')} style={styles.mainContentModalBottomPaymentBack} />
                            {/* </View> */}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.mainContentModalBottomConfirmation}>
                            <Text style={styles.mainContentModalBottomConfirmationText}>Confirmar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
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
        height: '51%',
        alignItems: 'center',
        justifyContent: 'center'
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
        fontSize: 20,
        fontFamily: 'ABeeZee_400Regular',

    },
    mainContentCardWallet: {
        fontSize: 40
    },
    mainContentModal: {
        width: '100%',
        height: 450,
    },
    mainContentModalTitle: {
        width: '100%',
        backgroundColor: '#F3BC2C',
        height: 65,
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainContentModalBottom: {
        width: '100%',
        height: 205,
        backgroundColor: '#F5F5F5',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottomColor: '#000000',
        borderBottomWidth: 1
    },
    mainContentModalBottomBtn: {
        width: 120,
        height: 50,
        backgroundColor: '#F3BC2C',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // marginRight: 10
    },
    mainContentModalBottomSpace: {
        width: 373,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mainContentModalBottomConfirmation: {
        width: 373,
        height: 50,
        backgroundColor: '#F3BC2C',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainContentModalBottomConfirmationText: {
        fontSize: 20
    },
    mainContentModalBottomPaymentImage: {
        width: 30,
        height: 23.3
    },
    mainContentModalBottomPaymentNext: {
        width: 20,
        height: 20
    },
    mainContentModalBottomPayment: {
        width: 373,
        height: 50,
        backgroundColor: '#F3BC2C',
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    mainContentModalTitleText: {
        fontSize: 14,
        fontFamily: 'ABeeZee_400Regular',
    },
    mainContentModalBottomPaymentSpace: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column-reverse'
    }
});