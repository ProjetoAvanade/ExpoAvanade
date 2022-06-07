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
    Animated,
    Dimensions
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import MaskInput, { Masks } from 'react-native-mask-input'
import { TextInputMask } from 'react-native-masked-text'

export default function Cartao({ navigation, route }) {
    const idReserva = route.params.idReserva
    const saldo = route.params.saldo
    const idVaga = route.params.idVaga
    const [preco, setPreco] = useState(0);
    const [visible, setVisible] = useState(false);
    const [cartao, setCartao] = useState('');
    const [validade, setValidade] = useState('');
    const [codigoSeguranca, setCodigoSeguranca] = useState('');
    const [marca, setMarca] = useState('');
    const [sucess, setSucess] = useState();
    //const [tempoReserva, setTempoReserva] = useState(0);

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
                //console.warn('Pagamento finalizado')
            }
        } catch (error) {
            // console.warn(resposta)
            //console.warn(error);
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
                //console.warn('Vaga Atualizada')
            }
        } catch (error) {
            //console.warn(resposta)
            //console.warn(error);
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
                //console.warn('Reserva finalizada')
                listarReserva()
            }
        } catch (error) {
            //console.warn(resposta)
            //console.warn(error);
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
                    <View style={styles.modalRetangleAlignment}>
                        <View style={styles.modalRetangle} />
                    </View>
                    <View style={styles.modalPadding}>
                        <View style={styles.modalPointInfo}>
                            <Image style={styles.modalImage} source={require('../../assets/img/coins-solid.png')}></Image>
                            <View style={styles.modalTexts}>
                                {saldo >= preco &&
                                    <View>
                                        <View style={styles.modalInfos}>
                                            <Text style={styles.modalText}>Valor da reserva:</Text>
                                            <Text style={styles.modalTextInfo}>R${preco}</Text>
                                        </View>
                                        <View style={styles.modalInfos}>
                                            <Text style={styles.modalText}>Saldo:</Text>
                                            <Text style={styles.modalTextSaldo}>-R${saldo}</Text>
                                        </View>
                                        <View style={styles.modalInfos}>
                                            <Text style={styles.modalText}>Total a ser pago:</Text>
                                            <Text style={styles.modalTextInfo}>R$0</Text>
                                        </View>
                                    </View>
                                }

                                {saldo < preco &&
                                    <View>
                                        <View style={styles.modalInfos}>
                                            <Text style={styles.modalText}>Valor da reserva:</Text>
                                            <Text style={styles.modalTextInfo}>R${preco}</Text>
                                        </View>
                                        <View style={styles.modalInfos}>
                                            <Text style={styles.modalText}>Saldo:</Text>
                                            <Text style={styles.modalTextSaldo}>-R${saldo}</Text>
                                        </View>
                                        <View style={styles.modalInfos}>
                                            <Text style={styles.modalText}>Total a ser pago:</Text>
                                            <Text style={styles.modalTextInfo}>R${preco - saldo}</Text>
                                        </View>
                                    </View>
                                }
                            </View>
                            <Text style={styles.modalClose} onPress={() => setVisible(false)}>X</Text>
                        </View>

                        <View style={styles.modalBtnView}>
                            <TouchableOpacity style={styles.modalBtn} onPress={() => { setVisible(false), Pagar() }}>
                                <Text style={styles.modalTextTitle}>Pagar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ModalPoup >
        );
    }

    //Preciso alterar a validação da função ainda
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

        const resposta = await fetch("https://apisandbox.cieloecommerce.cielo.com.br/1/sales", requestOptions)
        if (resposta.status == 201) {
            setSucess(true),
                atualizarPagamento(),
                atualizarVaga()
            navigation.navigate('ModalPagamento')
        } else {
            setSucess(false)
        }
    }

    useEffect(() => {
        atualizarReserva();
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

            <Text style={styles.textInstruction}>Por favor insira os dados do seu cartão para efetuar o pagamento</Text>

            <View style={styles.mainContentInputSpace}>
                <Text style={styles.mainContentText}>Numero do cartão</Text>
                <MaskInput
                    style={styles.mainContentInput}
                    placeholder='XXXX XXXX XXXX XXXX'
                    placeholderTextColor='#000000'
                    showObfuscatedValue
                    obfuscationCharacter="#"
                    keyboardType="numeric"
                    value={cartao}
                    onChangeText={(masked, unmasked, obfuscated) => setCartao(unmasked)}
                    mask={Masks.CREDIT_CARD}
                />
            </View>

            <View style={styles.mainContentInputSpace}>
                <Text style={styles.mainContentText}>Nome da marca do cartão</Text>
                <TextInput
                    style={styles.mainContentInput}
                    placeholder='Visa ou MasterCard'
                    placeholderTextColor='#000000'
                    keyboardType="email-address"
                    value={marca}
                    maxLength={10}
                    onChangeText={(marca) => setMarca(marca)}>
                </TextInput>
            </View>

            <View style={styles.mainContentSpace}>
                <View style={styles.mainContentInputSpace}>
                    <Text style={styles.mainContentText}>Validade</Text>
                    <TextInputMask
                        style={styles.mainContentInputValidate}
                        placeholder='MM/AA'
                        placeholderTextColor='#000000'
                        keyboardType="numeric"
                        type={'datetime'}
                        options={{
                            format: 'MM/YYYY'
                        }}
                        maxLength={7}
                        value={validade}
                        onChangeText={(validade) => setValidade(validade)}
                    />
                </View>
                <View style={styles.mainContentInputSpace}>
                    <Text style={styles.mainContentText}>Código de segurança</Text>
                    <TextInput
                        style={styles.mainContentInputSecurity}
                        placeholder='XXX'
                        placeholderTextColor='#000000'
                        keyboardType="numeric"
                        maxLength={3}
                        value={codigoSeguranca}
                        onChangeText={(codigoSeguranca) => setCodigoSeguranca(codigoSeguranca)}>
                    </TextInput>
                </View>
            </View>

            <ModalInfoReserva />

            {sucess == false &&
                <Text style={styles.mainContentTextError}>Não foi possível efetuar o pagamento!</Text>
            }

            {sucess == true &&
                <Text style={styles.mainContentTextSucess}>Pagamento efetuado com sucesso!</Text>
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
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginRight: '27%',
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
    textInstruction: {
        fontFamily: 'ABeeZee_400Regular',
        fontSize: 16,
        paddingTop: '6%',
        marginLeft: '4%',
        marginRight: '4%'
    },
    mainContentText: {
        fontFamily: 'ABeeZee_400Regular',
        fontSize: 14
    },
    mainContentTextSucess: {
        fontFamily: 'ABeeZee_400Regular',
        fontSize: 16,
        color: 'green'
    },
    mainContentTextError: {
        fontSize: 14,
        fontFamily: 'ABeeZee_400Regular',
        color: '#ff0000',
    },
    mainContentInput: {
        width: 345,
        height: 60,
        borderWidth: 2,
        borderColor: '#F3BC2C',
        borderRadius: 5,
        paddingLeft: 23,
    },
    mainContentInputValidate: {
        width: 182,
        height: 60,
        borderWidth: 2,
        borderColor: '#F3BC2C',
        borderRadius: 5,
        paddingLeft: 23
    },
    mainContentInputSecurity: {
        width: 145,
        height: 60,
        borderWidth: 2,
        borderColor: '#F3BC2C',
        borderRadius: 5,
        paddingLeft: 23
    },
    mainContentSpace: {
        width: 360,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    mainContentInputSpace: {
        marginTop: 20
    },
    mainContentModalBottomConfirmation: {
        width: '87%',
        height: 50,
        backgroundColor: '#F3BC2C',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '70%',
    },
    mainContentModalBottomConfirmationText: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 20
    },
    modalPoint: {
        backgroundColor: '#F5F5F5',
        height: 232,
        borderRadius: 5,
        //marginTop: 462
        marginTop: Dimensions.get('screen').height / 1.5,
    },
    modalPadding: {
        flex: 1,
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
        marginBottom: '4%',
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
        paddingLeft: '5%',
        justifyContent: 'space-around'
    },
    modalInfos: {
        paddingTop: '5%',
        paddingBottom: '5%'
    },
    modalText: {
        fontFamily: 'ABeeZee_400Regular',
        fontSize: 14,
        color: '#000'
    },
    modalTextSaldo: {
        fontFamily: 'ABeeZee_400Regular',
        fontSize: 14,
        color: '#DD3434'
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
    modalClose: {
        fontFamily: 'ABeeZee_400Regular',
        fontSize: 30,
        color: '#000',
        marginLeft: Dimensions.get('screen').height / 6,
        marginBottom: Dimensions.get('screen').height / 22,
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
