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
    Animated
} from 'react-native';

import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TestePagamento({ navigation }) {
    const [sucess, setSucess] = useState();


    const PagaLogo = async () => {
        fetch('https://apisandbox.cieloecommerce.cielo.com.br/1/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData,
        }).then(response => {
            console.warn('Pagamento')
            setSucess(true)
        }).catch(erro => {
            console.log(erro)
            setSucess(false)
        })
    }

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

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://apisandbox.cieloecommerce.cielo.com.br/1/sales", requestOptions)
            /* .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error)); */
            .then(response => {
                console.warn('Pagamento Concluído')
                setSucess(true)
            }).catch(erro => {
                console.log(erro)
                setSucess(false)
            })
    }

    /* .then(result => console.log(result), setSucess(true))
        .catch(error => console.log('error', error), setSucess(false)); */

    return (
        <View style={styles.main}>
            <TouchableOpacity style={styles.mainBtnLogin} onPress={Pagar}>
                <Text style={styles.mainBtnText}>Pagar</Text>
            </TouchableOpacity>

            {sucess == false &&
                <Text style={styles.mainBtnText}>Não foi possível realizar o pagamento!</Text>
            }

            {sucess == true &&
                <Text style={styles.mainBtnText}>Pagamento realizado com sucesso!</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainBtnLogin: {
        width: 157,
        height: 60,
        borderRadius: 5,
        backgroundColor: '#F3BC2C',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '8%',
    },
    mainBtnText: {
        fontSize: 18,
        fontFamily: 'IBMPlexMono_700Bold',
        color: '#000000'
    },
});