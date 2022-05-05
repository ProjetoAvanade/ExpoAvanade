import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, TextInput } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default function Cartao({ navigation }) {
    const [cartao, setCartao] = useState('');
    const [quantidade, setQuantidade] = useState(10);
    const [validade, setValidade] = useState('');
    const [codigoSeguranca, setCodigoSeguranca] = useState('');
    const [marca, setMarca] = useState('');
    const [sucess, setSucess] = useState();

    const Pagar = async () => {
        var myHeaders = new Headers();
        myHeaders.append("MerchantId", "33976ff8-42cf-49dc-bc03-2d9583410eb1");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("MerchantKey", "STFUVFSECYOELJWCGZXXQGXXDCCMMNUPXUIHMZUZ");

        var raw = JSON.stringify({
            "MerchantOrderId": "2014111700",
            "Payment": {
                "Type": "CreditCard",
                "Amount": 15700,
                "Installments": 1,
                "SoftDescriptor": "123456789ABCD",
                "CreditCard": {
                    "CardNumber": "4024.0071.5376.3191",
                    "Holder": "Teste Holder",
                    "ExpirationDate": "12/2021",
                    "SecurityCode": "123",
                    "Brand": "Visa"
                }
            }
        });

        /* var raw = JSON.stringify({
            "MerchantOrderId": "2014111700",
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
        }); */

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        /* .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error)); */
        fetch("https://apisandbox.cieloecommerce.cielo.com.br/1/sales", requestOptions)
            /* /* .then(response => {
                console.warn('Pagamento Concluído')
                console.log(response)
                setSucess(true)
            })
            .catch(erro => {
                console.log(erro)
                setSucess(false)
            }) */
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

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
                    placeholder='XXXX XXXX XXXX XXXX'
                    placeholderTextColor='#000000'
                    keyboardType="email-address"
                    value={cartao}
                    onChange={(cartao) => setCartao(cartao)}>
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
                        onChange={(validade) => setValidade(validade)}>
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
                        onChange={(codigoSeguranca) => setCodigoSeguranca(codigoSeguranca)}>
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
                <Text style={styles.mainContentText}>Não foi possível realizar o pagamento!</Text>
            }

            {sucess == true &&
                <Text style={styles.mainContentText}>Pagamento realizado com sucesso!</Text>
            }
            <TouchableOpacity style={styles.mainContentModalBottomConfirmation} onPress={Pagar}>
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