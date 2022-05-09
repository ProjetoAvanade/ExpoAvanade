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
            //IsLoading: false,
        };
    }

    buscarLocalizacao = async () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            setErroMensagem('Permissão para acessar a localização negada!')
            return;
        }
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErroMensagem('Permissão para acessar a localização negada!')
            return;
        };

        const location = await Location.getCurrentPositionAsync({});
        this.setState({
            latitude: parseFloat(location.coords.latitude),
            longitude: parseFloat(location.coords.latitude)
        });
    };

    buscarPontosProximos = async () => {
        try {
            /* const location = await Location.getCurrentPositionAsync({});
            setLongitude(parseFloat(location.coords.longitude))
            setLatitude(parseFloat(location.coords.latitude)) */
            console.log(this.state.latitude, this.state.longitude)
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.get(`/Localizacao?Latitude=${this.state.latitude}&Longitude=${this.state.longitude}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            if (resposta.status === 200) {
                const dadosDaApi = resposta.data;
                console.warn(dadosDaApi)
                this.setState({
                    listaBicicletario : dadosDaApi
                });
            }
        } catch (error) {
            //console.warn(resposta)
            //console.warn(error);
        }
    };

    componentDidMount() {
        this.buscarLocalizacao();
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

                        <Text style={styles.mainHeaderText}>Lista de pontos</Text>
                    </View>
                </View>

                <ScrollView style={styles.mainScroll}>
                    {this.state.listaBicicletario.map((item) => {
                        return (
                            <View key={item.idBicicletario}>
                                <TouchableOpacity style={styles.mainCard} onPress={() => this.props.navigation.navigate('TrocaRodas')}>
                                    <Image source={require('../../assets/img/icon_locationYellow.png')} style={styles.mainCardImage} />
                                    <View>
                                        <Text style={styles.mainCardsTextName}>{item.nome}</Text>
                                        <Text style={styles.mainCardsTextEmail}>{item.rua}, {item.numero}</Text>
                                    </View>
                                    <Text style={styles.mainCardsTextTrade}>{parseFloat(parseFloat(item.distancia).toFixed() / 1000000).toFixed(1)}km</Text>
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
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // marginLeft: 18,
        // marginLeft: '4.7%',
    },
    mainHeaderImage: {
        width: 25,
        height: 21.56,
    },
    mainHeaderText: {
        fontFamily: 'IBMPlexMono_700Bold',
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
        marginLeft: 30,
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
    },
    mainCardNext: {
        marginLeft: 5,
        width: 20
    },
    mainCardsTextTrade: {
        marginLeft: 115,
        fontSize: 14,
        color: '#000000',
        fontFamily: 'ABeeZee_400Regular',
        marginLeft: 30
    },
});
/* import React, { useState, useEffect } from 'react';
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

export default function PontoProximo({ navigation }) {
    const [listaBicicletario, setListaBicicletario] = useState([]);
    const [distancia, setDistancia] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const buscarLocalizacao = async () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            setErroMensagem('Permissão para acessar a localização negada!')
            return;
        }
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErroMensagem('Permissão para acessar a localização negada!')
            return;
        };

        const location = await Location.getCurrentPositionAsync({});
        setLongitude(parseFloat(location.coords.longitude))
        setLatitude(parseFloat(location.coords.latitude))
    };

    const buscarPontosProximos = async () => {
        try {
            /* const location = await Location.getCurrentPositionAsync({});
            setLongitude(parseFloat(location.coords.longitude))
            setLatitude(parseFloat(location.coords.latitude)) *
            console.log(latitude, longitude)
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.get(`/Localizacao?Latitude=${latitude}&Longitude=${longitude}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            if (resposta.status === 200) {
                const dadosDaApi = resposta.data;
                setListaBicicletario(dadosDaApi)
                console.warn(dadosDaApi[0].distancia)
            }
        } catch (error) {
            //console.warn(resposta)
            //console.warn(error);
        }
    };

    useEffect(() => {
        buscarLocalizacao();
        buscarPontosProximos();;
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

                    <Text style={styles.mainHeaderText}>Lista de pontos</Text>
                </View>
            </View>

            <ScrollView style={styles.mainScroll}>
                {listaBicicletario.map((item) => {
                    return (
                        <View key={item.idBicicletario}>
                            <TouchableOpacity style={styles.mainCard} onPress={() => navigation.navigate('TrocaRodas')}>
                                <Image source={require('../../assets/img/icon_locationYellow.png')} style={styles.mainCardImage} />
                                <View>
                                    <Text style={styles.mainCardsTextName}>{item.nome}</Text>
                                    <Text style={styles.mainCardsTextEmail}>{item.rua}, {item.numero}</Text>
                                </View>
                                <Text style={styles.mainCardsTextTrade}>{parseFloat(parseFloat(item.distancia).toFixed()/1000000).toFixed(1)}km</Text>
                                <Image source={require('../../assets/img/icon_next.png')} style={styles.mainCardNext} />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
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
    mainHeaderSpace: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // marginLeft: 18,
        // marginLeft: '4.7%',
    },
    mainHeaderImage: {
        width: 25,
        height: 21.56,
    },
    mainHeaderText: {
        fontFamily: 'IBMPlexMono_700Bold',
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
        marginLeft: 30,
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
    },
    mainCardNext: {
        marginLeft: 5,
        width: 20
    },
    mainCardsTextTrade: {
        marginLeft: 115,
        fontSize: 14,
        color: '#000000',
        fontFamily: 'ABeeZee_400Regular',
        marginLeft: 30
    },
}); */