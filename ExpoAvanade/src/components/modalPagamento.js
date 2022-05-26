import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Button,
    Modal,
    Image,
    Text,
    TouchableOpacity,
    Animated,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api'

const ModalPoup = ({ visible, children }) => {
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    useEffect(() => {
        toggleModal();
    }, [visible]);
    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
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

const ModalPagamento = ({ navigation }) => {
    const [visible, setVisible] = useState(true);
    const [pontos, setPontos] = useState(0);

    const buscarInfoPerfil = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.get('/Usuario', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            if (resposta.status == 200) {
                const dadosDaApi = resposta.data;
                setPontos(dadosDaApi.pontos)
            }
        } catch (error) {
            //console.warn(resposta)
            //console.warn(error);
        }
    };

    const atualizarPontos = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.put('/Reserva', {}, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            if (resposta.status === 200) {
                console.warn('Pontos atualizados')
                buscarInfoPerfil();
            }
        } catch (error) {
            //console.warn(resposta)
            //console.warn(error);
        }
    };

    useEffect(() => {
        atualizarPontos();
    }, []);

    return (
        <ModalPoup visible={visible}>
            <View style={{ alignItems: 'center' }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {setVisible(false), navigation.navigate('Mapa')}}>
                        <Image
                            source={require('../../assets/icon.png')}
                            style={{ height: 30, width: 30 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={require('../../assets/icon.png')}
                    style={{ height: 100, width: 150, marginVertical: 10 }}
                />
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20, }}>
                <Text style={{ fontSize: 14, textAlign: 'center', paddingHorizontal: 20 }}>
                    Pagamento concluído
                </Text>

                <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingHorizontal: 20 }}>
                    Você possui agora {pontos} rodas
                </Text>

                <TouchableOpacity style={styles.btn} onPress={() => {setVisible(false), navigation.navigate('Mapa')}}>
                    <Text style={styles.btnLogoutText}>OK</Text>
                </TouchableOpacity>
            </View>
        </ModalPoup>
    );
};

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 40
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        /* paddingHorizontal: 20,
        paddingVertical: 30, */
        borderRadius: 20,
        elevation: 20,
    },
    header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    btn: {
        marginTop: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 100,
        backgroundColor: '#F3BC2C',
        borderRadius: 5,
    },
    btnLogoutText: {
        fontSize: 14,
        color: '#000',
    },
});

export default ModalPagamento;