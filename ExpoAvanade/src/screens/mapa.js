import React, { Component, useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    StatusBar,
    Modal,
    Animated
} from 'react-native';

import MapView, { Callout, Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Mapa({ navigation }) {
    const [listaBicicletarios, setListaBikes] = useState([]);
    const [idBicicletario, setIdBicicletario] = useState('');
    const [erroMensagem, setErroMensagem] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [nomeUsuario, setNomeUsuario] = useState('');
    /* const [email, setEmail] = useState('');
    const [pontos, setPontos] = useState(0);
    const [saldo, setSaldo] = useState(0); */
    const [horarioAberto, setHorarioAberto] = useState('');
    const [horarioFechado, setHorarioFechado] = useState('');
    const [nomePonto, setNomePonto] = useState('');
    const [infosPonto, setInfosPonto] = useState([])
    const [visible, setVisible] = useState(false);
    const [listaVagas, setListaVagas] = useState([]);
    const [qntdVagaTotal, setqntdVagaTotal] = useState(0);
    const [qntdVagaDisponivel, setqntdVagaDisponivel] = useState([]);

    const buscarBicicletarios = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.get('/Bicicletario', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            const dadosDaApi = resposta.data;
            setListaBikes(dadosDaApi)
            //console.warn(dadosDaApi) 
        } catch (error) {
            //console.warn(error);
        }
    };

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
        //console.warn(this.state.longitude, this.state.latitude);
    };

    const buscarInfoPerfil = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.get('/Usuario', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            if (resposta.status === 200) {
                const dadosDaApi = resposta.data;
                setNomeUsuario(dadosDaApi.nomeUsuario);
                setEmail(dadosDaApi.email);
                setPontos(dadosDaApi.pontos);
                setSaldo(dadosDaApi.saldo)
            }
        } catch (error) {
            //console.warn(resposta)
            //console.warn(error);
        }
    };

    const buscarInfoPonto = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.get(`/Bicicletario/${idBicicletario}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            if (resposta.status === 200) {
                const dadosDaApi = resposta.data;
                setNomePonto(dadosDaApi.nome);
                setHorarioAberto(dadosDaApi.horarioAberto);
                setHorarioFechado(dadosDaApi.horarioFechado);
                //console.warn(dadosDaApi)
            }
        } catch (error) {
            //console.warn(error);
        }
    };

    const ModalPoup = ({ visible, children }) => {
        const [showModal, setShowModal] = React.useState(visible);
        const scaleValue = React.useRef(new Animated.Value(0)).current;
        React.useEffect(() => {
            toggleModal();
        }, [visible]);
        const toggleModal = () => {
            if (visible) {
                setShowModal(true);
                Animated.spring(scaleValue, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }).start();
            } else {
                setTimeout(() => setShowModal(false), 200);
                Animated.timing(scaleValue, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                }).start();
            }
        };
        return (
            <Modal transparent visible={showModal}>
                <View style={styles.modalBackGround}>
                    <Animated.View
                        style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                        {children}
                    </Animated.View>
                </View>
            </Modal>
        );
    };

    const ModalLocalizacao = () => {
        return (
            <ModalPoup visible={visible}>
                <View style={styles.modalPoint}>
                    <View style={styles.modalPointInfo}>
                        <Image source={require('../../assets/img/icon_location.png')}></Image>
                        <Text style={styles.modalText}>Nome do ponto:</Text>
                        <Text style={styles.modalTextInfo}>{nomePonto}</Text>
                        <Text style={styles.modalClose} onPress={() => setVisible(false)}>X</Text>
                    </View>

                    <View style={styles.modalPointInfo}>
                        <Image source={require('../../assets/img/icon_clock.png')}></Image>
                        <Text style={styles.modalText}>Horário:</Text>
                        <Text style={styles.modalTextInfo}>{horarioAberto} - {horarioFechado}</Text>
                    </View>

                    <View style={styles.modalPointInfo}>
                        <Image source={require('../../assets/img/icon_spaces.png')}></Image>
                        <Text style={styles.modalText}>Vagas:</Text>
                        <Text style={styles.modalTextInfo}>Disponiveis = {qntdVagaDisponivel}   |   Totais = {qntdVagaTotal}</Text>
                    </View>

                    <TouchableOpacity style={styles.modalBtn} onPress={() => setVisible(false)}>
                        <Text style={styles.modalTextTitle}>Prosseguir</Text>
                    </TouchableOpacity>
                </View>
            </ModalPoup>
        );
    }

    const ConfirmacaoTempo = () => {
        return (
            <ModalPoup visible={visible}>
                <View style={styles.modalPoint}>
                    <Text style={styles.modalTextTitle}>Confirme o tempo</Text>
                    <View style={styles.modalBackGrounds}>
                        <View style={styles.modalBackGroundGray}>
                            <Text style={styles.modalTextTitle}>R$3,75</Text>
                            <Text style={styles.modalText}>1 Hora</Text>
                            <Text style={styles.modalTextInfo}>Válido até 10:30</Text>
                        </View>
                        <View style={styles.modalBackGroundYellow}>
                            <Text style={styles.modalTextTitle}>R$ 6,50</Text>
                            <Text style={styles.modalText}>2 Hora</Text>
                            <Text style={styles.modalTextInfo}>Válido até 11:30</Text>
                        </View>
                    </View>
                    <Text style={styles.modalTextInfo}>Saldo: R$0,00</Text>
                    <TouchableOpacity style={styles.modalBtn}>
                        <Text style={styles.modalTextTitle}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </ModalPoup>
        );
    }

    const buscarVagasPonto = async () => {
        try {
            var arr = [];
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.get(`/Vagas/${idBicicletario}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            const dadosDaApi = resposta.data;
            setListaVagas(dadosDaApi)
            setqntdVagaTotal(dadosDaApi.length)

            console.log(dadosDaApi)
            console.warn(qntdVagaTotal)

            if (listaVagas != []) {
                listaVagas.forEach(function (b) {
                    if (b.statusVaga == true) {
                        setqntdVagaDisponivel(arr.push(b))
                    }
                });
                //console.warn(arr)
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const Funcoes = () => {
        setVisible(true);
        buscarInfoPonto();
        buscarVagasPonto();
    }

    /* const Funcoess = () => {
        const timerRef = useRef(null);
        timerRef.current = setTimeout(() => 
        {setVisible(true);
            buscarInfoPonto();
            buscarVagasPonto()}, 1000)
        } */

    useEffect(() => {
        buscarLocalizacao();
        buscarBicicletarios();
        buscarInfoPerfil();
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
                <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                    <View style={styles.mainHeaderSpace}>
                        <Image source={require('../../assets/img/profile.png')} style={styles.mainHeaderProfile} />
                        <View>
                            <Text style={styles.mainHeaderText}>Olá,</Text>
                            <Text style={styles.mainHeaderText}>{nomeUsuario}</Text>
                        </View>
                        <Image source={require('../../assets/img/icon_next.png')} style={styles.mainHeaderNext} />
                    </View>
                </TouchableOpacity>
            </View>

            <MapView style={styles.mainMap}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.030,
                    longitudeDelta: 0.050,
                }}>
                {listaBicicletarios.map((item) => {
                    return (
                        <Marker
                            onPress={() => setIdBicicletario(item.idBicicletario)}
                            key={item.idBicicletario}
                            coordinate={{
                                latitude: parseFloat(item.latitude),
                                longitude: parseFloat(item.longitude),
                            }}
                            title={item.nomeBicicletario}
                            description={item.rua}
                        >
                            {/* <Callout onPress={() => navigation.navigate('Cadastro', { id: item })}> */}
                            <Callout onPress={() => Funcoes()}>
                                <Text style={styles.calloutText}>{item.nome}</Text>
                                <Text style={styles.calloutText}>Rua {item.rua}, {item.numero}</Text>
                            </Callout>
                        </Marker>
                    );
                })}
            </MapView>

            <ModalLocalizacao />
            <ConfirmacaoTempo />
            <View style={styles.mainSearch}>
                <View style={styles.mainSearchInput}>
                    <TouchableOpacity>
                        <Text style={styles.mainSearchInputText}>Para onde?</Text>
                    </TouchableOpacity>
                </View>
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
    mainHeaderSpace: {
        width: 350,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        // marginLeft: 18,
        marginLeft: '7%',
    },
    mainHeaderProfile: {
        width: 50,
        height: 50,
    },
    mainHeaderText: {
        fontFamily: 'IBMPlexMono_700Bold',
        fontSize: 14,
        // marginRight: 30,
    },
    mainHeaderNext: {
        width: 20,
        height: 20,
        marginRight: 30,
        marginTop: 20,
    },
    mainMap: {
        width: '100%',
        height: '79%',
    },
    mainSearch: {
        width: '100%',
        // height: 70,
        height: '9%',
        backgroundColor: '#F3BC2C',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000000',
        borderBottomWidth: 1

    },
    mainSearchInput: {
        width: '80%',
        // height: 45,
        height: '60%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        // alignItems: 'center',
        justifyContent: 'center'
    },
    mainSearchInputText: {
        paddingLeft: 20,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    modalPoint: {
        backgroundColor: '#F5F5F5',
        width: '100%',
        height: 232,
        borderRadius: 5,
        marginTop: 462
    },
    modalPointInfo: {
        alignItems: 'center',
        flex: 0.3,
        flexDirection: 'row',
        maxWidth: 200
    },
    modalBtn: {
        width: 373,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    modalTextTitle: {
        //fontFamily: ,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    modalText: {
        fontFamily: 'ABeeZee_400Regular',
        fontSize: 14,
        color: '#000'
    },
    modalTextInfo: {
        fontFamily: 'ABeeZee_400Regular',
        fontSize: 14,
        color: '#342C2C'
    },
    modalClose: {
        fontFamily: 'ABeeZee_400Regular',
        fontSize: 30,
        color: '#000',
        marginLeft: '25%'
    },
    modalPointTime: {
        backgroundColor: '#F5F5F5',
        width: '100%',
        height: 253,
        borderRadius: 5,
        marginTop: 375
    },
    modalBackGrounds: {
        flexDirection: 'row'
    },
    modalBackGroundGray: {
        backgroundColor: '#DBDBDB',
        width: 175,
        height: 75
    },
    modalBackGroundYellow: {
        backgroundColor: '#F3BC2C',
        width: 175,
        height: 75
    },
});