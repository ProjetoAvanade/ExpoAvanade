import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Select, Image, TouchableOpacity } from 'react-native';

import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Vaga({ navigation, route }) {
  const idBicicletario = route.params.idBicicletario
  const [listaVagas, setListaVagas] = useState([])
  const [qntdVagaTotal, setqntdVagaTotal] = useState()
  const [qntdVagaDisponivel, setqntdVagaDisponivel] = useState([])
  const [idVaga, setIdVaga] = useState(0)
  //const [carregar, setCarregar] = useState(true);

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
      setListaVagas(dadosDaApi);
      setqntdVagaTotal(dadosDaApi.length)

      if (listaVagas != []) {
        listaVagas.forEach(function (b) {
          if (b.statusVaga == false) {
            arr.push(b)
          }
        });
        console.warn(arr)
      }
      setqntdVagaDisponivel(arr)
    } catch (error) {
      //console.warn(error);
    }
  };

  useEffect(() => {
    /* if (carregar == true) {
      buscarVagasPonto()
      setTimeout(function () { setCarregar(false) }, 5000)
    } */
    buscarVagasPonto();
  });

  return (
    <View style={styles.main}>
      <View style={styles.mainHeader}>
        <View style={styles.mainTitleSpace}>
          <TouchableOpacity style={styles.btnBackSpace} onPress={() => navigation.goBack()}>
            <Image style={styles.mainBtnBack} source={require('../../assets/img/Icone_voltar.png')} />
          </TouchableOpacity>

          <Image style={styles.mainLogo} source={require('../../assets/img/icon.png')} />
        </View>
      </View>

      <Text style={styles.title}>Qual vaga você quer utilizar?</Text>

      <View style={styles.mainBody}>

        <View>
          <Text style={styles.btnConfirmText}>Vagas:</Text>
          <Text style={styles.btnConfirmText}>Disponiveis = {qntdVagaDisponivel.length}</Text>
          <Text style={styles.btnConfirmText}>Totais = {qntdVagaTotal}</Text>
        </View>

        <View style={styles.mainBodyVaga}>
          {qntdVagaDisponivel.map((item) => {
            return (
              <View key={item.idVaga}>
                <TouchableOpacity style={styles.vagaCard} onPress={() => setIdVaga(item.idVaga)}>
                  <Text style={styles.vagaCardText}>{item.idVaga}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <TouchableOpacity style={styles.btnConfirm} onPress={() => { navigation.navigate('CadastrarReserva', { idVaga: idVaga }) }}>
          <Text style={styles.btnConfirmText}>Confirmar</Text>
        </TouchableOpacity>

        <Text>Vaga {idVaga} selecionada</Text>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
  },
  mainHeader: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitleSpace: {
    width: 260,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 40,
  },
  mainBtnBack: {
    width: 20,
    height: 20,
  },
  btnBackSpace: {
    marginBottom: 80,
    marginRight: 60,
  },
  mainLogo: {
    width: 140,
    marginRight: 30,
    marginTop: 20,
  },
  mainBody: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 80,
  },
  title: {
    fontSize: 34,
    fontFamily: 'IBMPlexMono_700Bold',
    color: '#000',
    lineHeight: 39,
    maxWidth: 295,
    textAlign: 'center',
    marginBottom: 10,
  },
  // selectVaga: {
  //   backgroundColor: '#fff',
  //   borderColor: '#F3BC2C',
  //   borderWidth: 3,
  //   borderRadius: 16,
  //   width: 242,
  //   height: 122,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  numberVaga: {
    fontSize: 36,
    color: '#000',
    //fontFamily: 'Open Sans',
  },
  mainInput: {
    borderWidth: 3,
    borderRadius: 16,
    width: 242,
    height: 122,
    paddingLeft: 70,
    fontSize: 24,
    backgroundColor: '#ffffff',
    borderColor: '#F3BC2C',
    marginTop: '8%',
  },
  btnConfirm: {
    backgroundColor: '#F3BC2C',
    width: 157,
    height: 60,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnConfirmText: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 24,
    color: '#000',
  },

  mainBodyVaga: {
    flexDirection: 'row',

  },

  vagaCard: {
    backgroundColor: 'green',
    width: 40,
    height: 60,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vagaCardText: {
    fontSize: 18,
    fontFamily: 'ABeeZee_400Regular',
    color: '#fff',
  }

});