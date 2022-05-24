import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';

import MapView, { Callout, Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastrarReserva({ navigation, route }) {
    /* const idVaga = route.params.idVaga
    const [idReserva, setIdReserva] = useState()
    const [carregar, setCarregar] = useState(false);
    
    const listarReserva = async () => {
        const token = await AsyncStorage.getItem('userToken');
        const resposta = await api.get('/Reserva', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        const dadosDaApi = await resposta.data;
        setIdReserva(dadosDaApi.reverse()[0].idReserva);
        console.warn(idReserva)
    }
    
    const criarReserva = async () => {
        try {
            var token = await AsyncStorage.getItem('userToken');
            const resposta = await api.post('/Reserva', {
                idVaga: idVaga
            },
            {
                headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                if (resposta.status === 201) {
                    console.warn('Cadastrado com sucesso!')
                const resposta = await api.put(`/Vagas/${idVaga}`, {
                    statusVaga: 1
                },
                    {
                        headers: {
                            Authorization: 'Bearer ' + token,
                        },
                    })
                if (resposta.status === 204) {
                    console.warn('Atualizou a vaga')
                    /* setCarregar(true)
                    if(carregar == true){
                        listarReserva();
                        setCarregar(false)
                    } *
                }
            }
        } catch (error) {
            console.warn(resposta)
            console.warn(error);
        }
    };
    
    useEffect(() => {
        criarReserva();
        listarReserva();
    }); */
    
    
    return (
        <View style={styles.main}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor='#F3BC2C'
                hidden={false}
                />
            {console.warn(idReserva)}
            <View style={styles.mainGap}></View>
            <View style={styles.mainHeader}>
                <View style={styles.mainHeaderSpace}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/img/icon_back.png')} style={styles.mainHeaderImage} />
                    </TouchableOpacity>
                    <Text style={styles.mainHeaderText}>Reserva</Text>
                </View>
            </View>

            <View style={styles.mainContent}>
                <TouchableOpacity style={styles.mainContentFormButton} onPress={() => { navigation.navigate('Cartao', { idReserva: idReserva }) }}>
                    <Text style={styles.mainContentFormButtonText}>Finalizar reserva</Text>
                </TouchableOpacity>
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
    mainHeaderImage: {
        width: 25,
        height: 21.56,
    },
    mainHeaderSpace: {
        width: '59%',
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
    mainContent: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
        // marginTop: '10%'
    },
    mainContentFormButton: {
        // width: 157,
        width: '40%',
        // height: 60,
        height: '8%',
        borderRadius: 5,
        backgroundColor: '#F3BC2C',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '8%',
    },
    mainContentFormButtonText: {
        fontSize: 25,
        fontFamily: 'Poppins_700Bold',
        color: '#000000'
    },
});
/* const criarReserva = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const resposta = await api.post('/Reserva', {
            idVaga: idVaga
        },
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            if (resposta.status === 201) {
            //console.warn('Cadastrado com sucesso!')
        }
    } catch (error) {
        console.warn(resposta)
        console.warn(error);
    }
};

const listarReserva = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const resposta = await api.get('/Reserva', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        if (resposta.status === 200) {
            var dadosDaApi = await resposta.data;
            let arr = await dadosDaApi.reverse()
            setListaReserva(arr[0])
            console.warn(listaReserva)
        }
    } catch (error) {
        console.warn(resposta)
        console.warn(error);
    }
};

const atualizarReserva = async () => {
    try {
        let arr = await dadosDaApi.reverse()
        setIdReserva(arr[0].idReserva)
        console.warn(idReserva)
        const token = await AsyncStorage.getItem('userToken');
        const resposta = await api.put(`/Reserva/${listaReserva[0].idReserva}`, {
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
        console.warn(resposta)
        if (resposta.status === 200) {
            console.warn('Troca finalizada')
        }
    } catch (error) {
        console.warn(resposta)
        console.warn(error);
    }
}; */

/* const atualizarVaga = async () => {
    try {
        console.warn(vaga)
        const token = await AsyncStorage.getItem('userToken');
        const resposta = await api.put(`/Vaga/${idVaga}`, {
            statusVaga: 1
        },
        {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
        if (resposta.status === 204) {
            console.warn('Vaga atualizada')
        }
    } catch (error) {
        console.warn(resposta)
        console.warn(error);
    }
};


/*const atualizarPontos = async () => {
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
}; */

/* useEffect(() => {
    criarReserva();
    listarReserva();
}, []); */