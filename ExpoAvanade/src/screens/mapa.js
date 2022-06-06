import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    StatusBar,
    Modal,
    Animated,
    LogBox,
    Dimensions
} from 'react-native';

import MapView, { Callout, Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Mapa({ navigation }) {
    const [listaBicicletarios, setListaBikes] = useState([]);
    const [idBicicletario, setIdBicicletario] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [imagem, setImagem] = useState('');
    const [horarioAberto, setHorarioAberto] = useState('');
    const [horarioFechado, setHorarioFechado] = useState('');
    const [nomePonto, setNomePonto] = useState('');
    const [visible, setVisible] = useState(false);
    const [qntdVagaTotal, setqntdVagaTotal] = useState(0);
    const [qntdVagaDisponivel, setqntdVagaDisponivel] = useState([]);

    // Função para buscar os bicicletários cadastrados, transformando eles em marcadores
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

    // Função para conseguir a localização do usuário logado
    const buscarLocalizacao = async () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            alert('Permissão para acessar a localização negada!')
            return;
        }
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permissão para acessar a localização negada!')
            return;
        };

        const location = await Location.getCurrentPositionAsync({});
        setLongitude(parseFloat(location.coords.longitude))
        setLatitude(parseFloat(location.coords.latitude))
    };

    // Função para conseguir as informações do usuário logado
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
                //setEmail(dadosDaApi.email);
                //setPontos(dadosDaApi.pontos);
                //setSaldo(dadosDaApi.saldo)
                let apiImg = 'https://api-avanade.azurewebsites.net'
                setImagem(`${apiImg}/StaticFiles/imagem/${dadosDaApi.imagem}`)
                //console.log(dadosDaApi)
            }
        } catch (error) {
            //console.warn(resposta)
            console.warn(error);
        }
    };

    // Função buscando as informações de um ponto específico
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

    // Função para mostrar o modal do ponto escolhido
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
                    <Animated.View
                        style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                        {children}
                    </Animated.View>
            </Modal>
        );
    };

    // Modal do ponto com elementos e estilização
    const ModalPonto = () => {
        return (
            <ModalPoup visible={visible} >
                <View style={styles.modalPoint} >
                    <View style={styles.modalRetangleAlignment}>
                        <View style={styles.modalRetangle} />
                    </View>
                    <View style={styles.modalPadding}>
                        <View style={styles.modalPointInfo}>
                            <Image style={styles.modalImagePoint} source={require('../../assets/img/icon_location.png')}></Image>
                            <View style={styles.modalTexts}>
                                <Text style={styles.modalText}>Nome do ponto:</Text>
                                <Text style={styles.modalTextInfo}>{nomePonto}</Text>
                            </View>
                            <Text style={styles.modalClose} onPress={() => setVisible(false)}>X</Text>
                        </View>

                        <View style={styles.modalPointInfo}>
                            <Image style={styles.modalImage} source={require('../../assets/img/icon_clock.png')}></Image>
                            <View style={styles.modalTexts}>
                                <Text style={styles.modalText}>Horário:</Text>
                                <Text style={styles.modalTextInfo}>{horarioAberto.slice(0, 5)} - {horarioFechado.slice(0, 5)}</Text>
                            </View>
                        </View>

                        <View style={styles.modalPointInfo}>
                            <Image style={styles.modalImage} source={require('../../assets/img/icon_spaces.png')}></Image>
                            <View style={styles.modalTexts}>
                                <Text style={styles.modalText}>Vagas:</Text>
                                <Text style={styles.modalTextInfo}>Disponiveis = {qntdVagaDisponivel.length}   |   Totais = {qntdVagaTotal}</Text>
                            </View>
                        </View>

                        <View style={styles.modalBtnView}>
                            <TouchableOpacity style={styles.modalBtn} onPress={() => { setVisible(false), navigation.navigate('Vaga', { idBicicletario: idBicicletario }) }}>
                                <Text style={styles.modalTextTitle}>Prosseguir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ModalPoup>
        );
    }

    // Função para buscar as vagas livres e ocupadas de um ponto específico
    const buscarVagasPonto = async () => {
        try {
            var arr = [];
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.get(`/Vagas/${idBicicletario}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            const listaVagas = resposta.data;
            setqntdVagaTotal(listaVagas.length)

            if (listaVagas != []) {
                listaVagas.forEach(function (b) {
                    if (b.statusVaga == false) {
                        arr.push(b)
                    }
                });
                //console.warn(arr)
            }
            setqntdVagaDisponivel(arr)
        } catch (error) {
            //console.warn(error);
        }
    };

    // Funções realizadas ao clicar em um marcador
    const funcoesPonto = () => {
        setVisible(true);
        buscarInfoPonto();
        buscarVagasPonto();
    }

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
                        {
                            imagem != '' &&
                            <Image
                                source={{ uri: imagem }}
                                style={styles.mainHeaderProfile} />
                        }

                        {
                            imagem == '' &&
                            <Image
                                source={require('../../assets/img/icon_mold.png')}
                                style={styles.mainHeaderProfile} />
                        }

                        <View style={styles.mainHeaderContent}>
                            <View>
                                <Text style={styles.mainHeaderText}>Olá,</Text>
                                <Text style={styles.mainHeaderText}>{nomeUsuario}</Text>
                            </View>
                            <Image source={require('../../assets/img/icon_next.png')} style={styles.mainHeaderNext} />
                        </View>
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
                            <Callout onPress={() => funcoesPonto()}>
                                <Text style={styles.calloutText}>{item.nome}</Text>
                                <Text style={styles.calloutText}>Rua {item.rua}, {item.numero}</Text>
                            </Callout>
                        </Marker>
                    );
                })}
            </MapView>

            <ModalPonto />

            <View style={styles.mainSearch}>
                <View style={styles.mainSearchInput}>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('Pesquisa', { listaBicicletarios: listaBicicletarios })}>
                        <Text style={styles.mainSearchInputText}>Para onde?</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => navigation.navigate('Teste')}>
                        <Text style={styles.mainSearchInputText}>Para onde?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}

//Não está sendo possível setar uma posição inicial antes da requisição de buscar a localização do usuário ser concluída
LogBox.ignoreLogs(['Warning: Failed prop type: The prop `initialRegion.latitude` is marked as required in `MapView`, but its value is `null`.']);
LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method."]);

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    mainGap: {
        height: '3.1%',
        backgroundColor: '#F3BC2C'
    },
    mainHeader: {
        width: '100%',
        height: '8.5%',
        backgroundColor: '#F3BC2C',
        justifyContent: 'center',
    },
    mainHeaderSpace: {
        width: 350,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: '8%',
    },
    mainHeaderProfile: {
        width: 50,
        height: 50,
        borderRadius: 67
    },
    mainHeaderContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: '8%'
    },
    mainHeaderText: {
        fontFamily: 'ABeeZee_400Regular',
        fontSize: 14,
    },
    mainHeaderNext: {
        width: 20,
        height: 20,
        marginTop: '15%',
        marginLeft: '8%'
    },
    mainMap: {
        width: '100%',
        height: '79%',
    },
    mainSearch: {
        width: '100%',
        height: '9%',
        backgroundColor: '#F3BC2C',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000000',
        borderBottomWidth: 1
    },
    mainSearchInput: {
        width: '80%',
        height: '60%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        justifyContent: 'center'
    },
    mainSearchInputText: {
        paddingLeft: 20,
    },
    modalPoint: {
        backgroundColor: '#F5F5F5',
        height: '33%',
        borderRadius: 5,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        //height: Dimensions.get('screen').height / 3.0,
        marginTop: Dimensions.get('screen').height / 1.8,
        //marginTop: 462
        //marginTop: '123%'
    },
    modalPadding: {
        flex: 1,
        paddingBottom: '3%',
        paddingTop: '3%',
    },
    modalPointInfo: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        paddingLeft: '5%'
    },
    modalBtnView: {
        alignItems: 'center'
    },
    modalBtn: {
        width: '90%',
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    modalTextTitle: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 20,
    },
    modalTexts: {
        paddingLeft: '5%'
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
    modalImage: {
        height: 30,
        width: 30
    },
    modalImagePoint: {
        height: 36,
        width: 30
    },
    modalClose: {
        fontFamily: 'ABeeZee_400Regular',
        fontSize: 30,
        color: '#000',
        marginLeft: Dimensions.get('screen').height / 7,
    },
    modalRetangle: {
        width: '14%',
        height: 5,
        backgroundColor: '#C4C4C4',
    },
    modalRetangleAlignment: {
        alignItems: 'center',
    },
});