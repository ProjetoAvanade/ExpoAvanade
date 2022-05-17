import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar
} from 'react-native';

import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CountDown from 'react-native-countdown-component';

export default function Relogio({ navigation, route }) {
  //const horas = route.params.horas;
  const idVaga = route.params.idVaga;
  const [idReserva, setIdReserva] = useState()

  //listar as reservas para conseguir a última que foi cadastrada e utilizar ela
  const listarReserva = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const resposta = await api.get('/Reserva', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    const dadosDaApi = resposta.data;
    
    //consigo a última reserva cadastrada
    setIdReserva(dadosDaApi.reverse()[0].idReserva);
  }

   //atualizar vaga para ocupado
  const atualizarVaga = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const resposta = await api.put(`/Vagas/${idVaga}`, {
        statusVaga: true
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

  //criar uma reserva e realizar as funções relacionadas a vaga e reserva depois que cadastrado
  const criarReserva = async () => {
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
      if (resposta.status == 201) {
        console.warn('Cadastrado com sucesso!')
        atualizarVaga();
        listarReserva();
      }
    } catch (error) {
      //console.warn(error);
    }
  };

  useEffect(() => {
    criarReserva();
  }, []);

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
          <Text style={styles.mainHeaderText}>Reserva</Text>
        </View>
      </View>
      <View style={styles.mainContent}>
        <CountDown
          size={30}
          until={3600}
          onFinish={() => alert('Finished')}
          digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625' }}
          digitTxtStyle={{ color: '#1CC625' }}
          timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
          separatorStyle={{ color: '#1CC625' }}
          timeToShow={['H', 'M', 'S']}
          timeLabels={{ m: null, s: null }}
          showSeparator
        />

        <TouchableOpacity style={styles.mainContentFormButton} onPress={() => { navigation.navigate('Cartao', { idReserva: idReserva, idVaga : idVaga }) }}>
          <Text style={styles.mainContentFormButtonText}>Finalizar reserva</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainContentFormButton} onPress={() => { navigation.navigate('Cartao', { idReserva: idReserva, idVaga : idVaga }) }}>
          <Text style={styles.mainContentFormButtonText}>Adicionar mais tempo</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    alignItems: 'center',
    marginTop: '60%'
  },
  mainContentFormButton: {
    width: 157,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#F3BC2C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%'
  },
  mainContentFormButtonText: {
    fontSize: 18,
    fontFamily: 'ABeeZee_400Regular',
    color: '#000000'
  },
});