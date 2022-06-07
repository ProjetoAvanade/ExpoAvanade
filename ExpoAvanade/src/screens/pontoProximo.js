import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    Platform
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class PontoProximo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaBicicletario: [],
            latitude: 0,
            longitude: 0,
        };
    }

    buscarPontosProximos = async () => {
        try {
            const location = await Location.getCurrentPositionAsync({});
            this.setState({
                latitude: parseFloat(location.coords.latitude),
                longitude: parseFloat(location.coords.longitude)
            });
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.get(`/Localizacao?Latitude=${this.state.latitude}&Longitude=${this.state.longitude}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            if (resposta.status === 200) {
                const dadosDaApi = resposta.data;
                //console.warn(dadosDaApi)
                this.setState({
                    listaBicicletario: dadosDaApi
                });
            }
        } catch (error) {
            //console.warn(resposta)
            //console.warn(error);
        }
    };

    componentDidMount() {
        this.buscarPontosProximos();
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
                        <Text style={styles.mainHeaderText}>Pontos Próximos</Text>
                    </View>
                </View>

                <ScrollView style={styles.mainScroll}>
                    {this.state.listaBicicletario.map((item) => {
                        return (
                            <View key={item.idBicicletario}>
                                <TouchableOpacity style={styles.mainCard} onPress={() => this.props.navigation.navigate('Vaga', { idBicicletario: item.idBicicletario })}>
                                    <Image source={require('../../assets/img/icon_locationYellow.png')} style={styles.mainCardImage} />
                                    <View>
                                        <Text style={styles.mainCardsTextName}>{item.nome}</Text>
                                        <Text style={styles.mainCardsTextEmail}>{item.rua}, {item.numero}</Text>
                                    </View>
                                    <Text style={styles.mainCardsTextTrade}>{parseFloat(parseFloat(item.distancia).toFixed() / 1000).toFixed(1)}km</Text>
                                    <Image source={require('../../assets/img/icon_next.png')} style={styles.mainCardNext} />
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>
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
        height: '2.5%',
    },
    mainHeader: {
        width: '100%',
        height: '7.6%',
        backgroundColor: '#F3BC2C',
        justifyContent: 'center',
    },
    mainHeaderSpace: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainHeaderImage: {
        width: 25,
        height: 21.56,
        marginRight: '10%'
    },
    mainHeaderText: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 25,
    },
    mainScroll: {
        width: '100%',
    },
    mainCard: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#000000'
    },
    mainCardImage: {
        width: 25,
        marginLeft: '5%',
    },
    mainCardsTextName: {
        marginLeft: 15,
        fontSize: 14,
        color: '#000000',
        fontFamily: 'ABeeZee_400Regular',
    },
    mainCardsTextEmail: {
        marginLeft: 15,
        fontSize: 14,
        color: '#797979',
        fontFamily: 'ABeeZee_400Regular',
        maxWidth: '96%'
    },
    mainCardNext: {
        marginLeft: 5,
        width: 20
    },
    mainCardsTextTrade: {
        fontSize: 14,
        color: '#000000',
        fontFamily: 'ABeeZee_400Regular',
        marginLeft: 30
    },
});