import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, TextInput } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default function Cartao({ navigation, route }) {
    const idReserva = route.params.idReserva
    const [cartao, setCartao] = useState('4024.0071.5376.3191');
    const [quantidade, setQuantidade] = useState(10);
    const [validade, setValidade] = useState('12/2021');
    const [codigoSeguranca, setCodigoSeguranca] = useState('123');
    const [marca, setMarca] = useState('Visa');
    const [sucess, setSucess] = useState();

    const realizarPagamento = async () => {
        var myHeaders = new Headers();
        myHeaders.append("MerchantId", "33976ff8-42cf-49dc-bc03-2d9583410eb1");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("MerchantKey", "STFUVFSECYOELJWCGZXXQGXXDCCMMNUPXUIHMZUZ");

        var raw = JSON.stringify({
            "MerchantOrderId": "2014111710",
            "Payment": {
                "Type": "CreditCard",
                "Amount": quantidade,
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
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        setSucess(true)
    }

    const atualizarReserva = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.put(`/Reserva/${idReserva}`, {
                statusPagamento: true
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
            if (resposta.status === 204) {
                console.warn('Reserva finalizada')
            }
        } catch (error) {
            console.warn(resposta)
            console.warn(error);
        }
    };

    const atualizarPontos = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.put('/Reserva', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            if (resposta.status === 200) {
                console.warn('Atualizou os pontos')
            }
        } catch (error) {
            console.warn(resposta)
            console.warn(error);
        }
    };

    useEffect(() => {
        atualizarReserva();
        atualizarPontos();
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

            {sucess == false &&
                <Text style={styles.mainContentTextError}>Não foi possível realizar o pagamento!</Text>
            }

            {sucess == true &&
                <Text style={styles.mainContentTextSucess}>Pagamento realizado com sucesso!</Text>
            }
            <TouchableOpacity style={styles.mainContentModalBottomConfirmation} onPress={realizarPagamento()}>
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
        fontFamily: 'IBMPlexMono_700Bold',
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

});