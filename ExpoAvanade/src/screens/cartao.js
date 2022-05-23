import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
    StatusBar,
    Modal,
    Animated
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default function Cartao({ navigation, route }) {
    const idReserva = route.params.idReserva
    const saldo = route.params.saldo
    const idVaga = route.params.idVaga
    const [preco, setPreco] = useState(0);
    const [visible, setVisible] = useState(false);
    const [cartao, setCartao] = useState('4024.0071.5376.3191');
    const [validade, setValidade] = useState('12/2021');
    const [codigoSeguranca, setCodigoSeguranca] = useState('123');
    const [marca, setMarca] = useState('Visa');
    const [sucess, setSucess] = useState();
    //const [tempoReserva, setTempoReserva] = useState(0);

    const atualizarSaldo = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.put(`/Usuario`, {
                saldo: preco - saldo
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
            if (resposta.status === 200) {
                console.warn('saldo alterado')
            }
        } catch (error) {
            console.warn(resposta)
            console.warn(error);
        }
    };

    const atualizarPagamento = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.put(`/Reserva/${idReserva}/status`, {
                statusPagamento: true
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
            if (resposta.status === 204) {
                console.warn('Pagamento finalizado')
            }
        } catch (error) {
            console.warn(resposta)
            console.warn(error);
        }
    };

    const atualizarVaga = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.put(`/Vagas/${idVaga}`, {
                statusVaga: false
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
            if (resposta.status === 204) {
                console.warn('Vaga Atualizada')
            }
        } catch (error) {
            console.warn(resposta)
            console.warn(error);
        }
    };


    const atualizarReserva = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.put(`/Reserva/${idReserva}`, {},
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
            if (resposta.status === 204) {
                console.warn('Reserva finalizada')
                listarReserva()
            }
        } catch (error) {
            console.warn(resposta)
            console.warn(error);
        }
    };

    const listarReserva = async () => {
        const token = await AsyncStorage.getItem('userToken');
        const resposta = await api.get('/Reserva', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        const dadosDaApi = resposta.data;

        //setar preço certo depois e tempo de duração da reserva
        setPreco(dadosDaApi.reverse()[0].preco)
    }

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

    const ModalInfoReserva = () => {
        return (
            <ModalPoup visible={visible}>
                <View style={styles.modalPoint}>
                    {saldo >= preco &&
                        <View style={styles.modalPointInfo}>
                            <Text style={styles.modalText}>Preço:</Text>
                            <Text style={styles.modalTextInfo}>{preco}</Text>
                            <Text style={styles.modalText}>Saldo:</Text>
                            <Text style={styles.modalTextInfo}>{saldo}</Text>
                            <Text style={styles.modalText}>Total:</Text>
                            <Text style={styles.modalTextInfo}>0</Text>
                            <Text style={styles.modalClose} onPress={() => setVisible(false)}>X</Text>
                        </View>
                    }

                    {saldo < preco &&
                        < View style={styles.modalPointInfo}>
                            <Text style={styles.modalText}>Preço:</Text>
                            <Text style={styles.modalTextInfo}>{preco}</Text>
                            <Text style={styles.modalText}>Saldo:</Text>
                            <Text style={styles.modalTextInfo}>{saldo}</Text>
                            <Text style={styles.modalText}>Total:</Text>
                            <Text style={styles.modalTextInfo}>{preco - saldo}</Text>
                            <Text style={styles.modalClose} onPress={() => setVisible(false)}>X</Text>
                        </View>
                    }
                    <TouchableOpacity style={styles.modalBtn} onPress={() => { setVisible(false), Pagar() }}>
                        <Text style={styles.modalTextTitle}>Prosseguir</Text>
                    </TouchableOpacity>
                </View>
            </ModalPoup >
        );
    }


    const Pagar = async () => {
        var myHeaders = new Headers();
        myHeaders.append("MerchantId", "33976ff8-42cf-49dc-bc03-2d9583410eb1");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("MerchantKey", "STFUVFSECYOELJWCGZXXQGXXDCCMMNUPXUIHMZUZ");

        var raw = JSON.stringify({
            "MerchantOrderId": "2014111710",
            "Payment": {
                "Type": "CreditCard",
                "Amount": preco,
                "Installments": 1,
                "SoftDescriptor": "123456789ABCD",
                "CreditCard": {
                    "CardNumber": cartao,
                    "Holder": "Teste Holder",
                    "ExpirationDate": validade,
                    "SecurityCode": codigoSeguranca,
                    "Brand": marca
                }
            }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://apisandbox.cieloecommerce.cielo.com.br/1/sales", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result),
                setSucess(true))
                //atualizarPagamento(),
                //atualizarVaga(),
                //atualizarPontos())
            .catch(error => console.log('error', error));
            navigation.navigate('ModalPagamento')
    }

    const atualizarPontos = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.put('/Reserva', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            console.warn(resposta)
            if (resposta.status === 200) {
                console.warn('Troca finalizada')
            }
        } catch (error) {
            console.warn(resposta)
            console.warn(error);
        }
    };

    useEffect(() => {
        //atualizarReserva();
        //atualizarSaldo();
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
                    <Text style={styles.mainHeaderText}>Novo cartão</Text>
                </View>
            </View>

            <Text style={styles.mainContentText}>Por favor insira os dados do seu cartão para realizar o pagamento</Text>

            <View style={styles.mainContentInputSpace}>
                <Text style={styles.mainContentText}>Numero do cartão</Text>
                <TextInput
                    style={styles.mainContentInput}
                    placeholder='XXXX.XXXX.XXXX.XXXX'
                    placeholderTextColor='#000000'
                    value={cartao}
                    onChangeText={(cartao) => setCartao(cartao)}>
                </TextInput>
            </View>

            <View style={styles.mainContentInputSpace}>
                <Text style={styles.mainContentText}>Nome da marca do cartão</Text>
                <TextInput
                    style={styles.mainContentInput}
                    placeholder='Nome do cartão'
                    placeholderTextColor='#000000'
                    keyboardType="email-address"
                    value={marca}
                    onChangeText={(marca) => setMarca(marca)}>
                </TextInput>
            </View>

            <View style={styles.mainContentSpace}>
                <View style={styles.mainContentInputSpace}>
                    <Text style={styles.mainContentText}>Validade</Text>
                    <TextInput
                        style={styles.mainContentInputValidate}
                        placeholder='MM/AA'
                        placeholderTextColor='#000000'
                        keyboardType="email-address"
                        value={validade}
                        onChangeText={(validade) => setValidade(validade)}>
                    </TextInput>
                </View>
                <View style={styles.mainContentInputSpace}>
                    <Text style={styles.mainContentText}>Código de segurança</Text>
                    <TextInput
                        style={styles.mainContentInputSecurity}
                        placeholder='XXX'
                        placeholderTextColor='#000000'
                        keyboardType="email-address"
                        value={codigoSeguranca}
                        onChangeText={(codigoSeguranca) => setCodigoSeguranca(codigoSeguranca)}>
                    </TextInput>
                </View>
            </View>

            {/* <View style={styles.mainContentInputSpace}>
                <Text style={styles.mainContentText}>CPF do titular do cartão</Text>
                <TextInput
                    style={styles.mainContentInput}
                    placeholder='XXX.XXX.XXX-XX'
                    placeholderTextColor='#000000'
                    keyboardType="email-address">
                </TextInput>
            </View> */}

            <ModalInfoReserva />

            {sucess == false &&
                <Text style={styles.mainContentTextError}>Não foi possível realizar o pagamento!</Text>
            }

            {sucess == true &&
                <Text style={styles.mainContentTextSucess}>Pagamento realizado com sucesso!</Text>
            }
            <TouchableOpacity style={styles.mainContentModalBottomConfirmation} onPress={() => setVisible(true)}>
                <Text style={styles.mainContentModalBottomConfirmationText}>Prosseguir</Text>
            </TouchableOpacity>
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
        fontFamily: 'Poppins_700Bold',
        fontSize: 25,
    },
    mainContentText: {
        fontSize: 12
    },
    mainContentTextSucess: {
        fontSize: 16,
        color: 'green'
    },
    mainContentTextError: {
        fontSize: 16,
        color: '#ff0000'
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
