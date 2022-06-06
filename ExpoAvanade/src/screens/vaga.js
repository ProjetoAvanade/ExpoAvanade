import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, Modal, Animated, Dimensions
} from 'react-native';

import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Vaga({ navigation, route }) {
  const idBicicletario = route.params.idBicicletario
  const [saldo, setSaldo] = useState(0);
  const [qntdVagaTotal, setqntdVagaTotal] = useState();
  const [qntdVagaDisponivel, setqntdVagaDisponivel] = useState([]);
  const [idVaga, setIdVaga] = useState(0);
  const [visible, setVisible] = useState(false);
  const [horas, setHoras] = useState(0);
  const data = new Date();
  const previsaoHora1 = adicionarHora(1, data).toLocaleTimeString().slice(0);
  const previsaoHora2 = adicionarHora(2, data).toLocaleTimeString().slice(0);
  const [btnSelecionado, setBtnSelecionado] = useState(0)

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
        setSaldo(dadosDaApi.saldo)
        //console.log(dadosDaApi)
      }
    } catch (error) {
      //console.warn(resposta)
      console.warn(error);
    }
  };

  function adicionarHora(numeroHora, data = new Date()) {
    const dataCopiada = new Date(data.getTime());

    dataCopiada.setTime(dataCopiada.getTime() + numeroHora * 60 * 60 * 1000);

    return dataCopiada;
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

  const ConfirmacaoTempo = () => {
    return (
      <ModalPoup visible={visible}>
        <View style={styles.modalPoint}>
          <View style={styles.modalTitleAlign}>
            <Text style={styles.modalTextTitle}>Confirme o tempo</Text>
            <Text style={styles.modalTextTitle} onPress={() => setVisible(false)}>X</Text>
          </View>

          <View style={styles.modalBackGrounds}>
            <TouchableOpacity style={btnSelecionado == 1 ? styles.modalBackGroundYellow : styles.modalBackGroundGray} onPress={() => { setHoras(1), setBtnSelecionado(1) }}>
              <Text style={styles.modalTextTitle}>R$ 3,75</Text>
              <Text style={styles.modalText}>1 Hora</Text>
              <Text style={styles.modalTextInfo}>Válido até {previsaoHora1}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={btnSelecionado == 2 ? styles.modalBackGroundYellow : styles.modalBackGroundGray} onPress={() => { setHoras(2), setBtnSelecionado(2) }}>
              <Text style={styles.modalTextTitle}>R$ 6,50</Text>
              <Text style={styles.modalText}>2 Hora</Text>
              <Text style={styles.modalTextInfo}>Válido até {previsaoHora2}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalAlignSaldo}>
            <Text style={styles.modalTextInfo}>Saldo: R${parseFloat(saldo)}</Text>
          </View>

          <View style={styles.modalBtnView}>
            <TouchableOpacity style={styles.modalBtn} onPress={() => { setVisible(false), navigation.navigate('Relogio', { idVaga: idVaga, horas: horas, saldo: saldo }) }}>
              <Text style={styles.modalTextTitle}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPoup>
    );
  }

  useEffect(() => {
    buscarVagasPonto();
    buscarInfoPerfil();
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.mainHeader}>
        <View style={styles.mainTitleSpace}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/img/icon_back.png')} style={styles.mainHeaderImage} />
          </TouchableOpacity>

          <Image style={styles.mainLogo} source={require('../../assets/img/logo_black.png')} />
        </View>
      </View>

      <Text style={styles.title}>Qual vaga você quer utilizar?</Text>

      <View style={styles.mainBody}>

        <View style={styles.mainBodyVaga}>
          {qntdVagaDisponivel.map((item) => {
            return (
              <View key={item.idVaga} style={styles.vagaCardAlign}>
                <TouchableOpacity key={item.idVaga} style={styles.vagaCard} onPress={() => setIdVaga(item.idVaga)}>
                  <Text style={styles.vagaCardText}>{item.idVaga}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View style={styles.mainBtn}>
          <TouchableOpacity style={styles.btnConfirm} onPress={() => setVisible(true)}>
            <Text style={styles.btnConfirmText}>Confirmar</Text>
          </TouchableOpacity>

          {idVaga != 0 &&
            <View style={styles.mainConfirm}>
              <Text style={styles.mainConfirmText}>Vaga {idVaga} selecionada</Text>
            </View>
          }
        </View>
        <ConfirmacaoTempo />
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
  mainHeaderImage: {
    width: 25,
    height: 21.56,
    marginBottom: '400%'
  },
  mainTitleSpace: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    width: 300,
    height: 78,
    marginTop: '10%',
    marginRight: '4%'
  },
  mainBody: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 80,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Poppins_700Bold',
    color: '#000',
    lineHeight: 39,
    maxWidth: 295,
    textAlign: 'center',
    marginBottom: 10,
  },
  numberVaga: {
    fontSize: 36,
    color: '#000',
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
  mainBtn: {
    flex: 0.39,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  btnConfirm: {
    backgroundColor: '#F3BC2C',
    width: 180,
    height: 60,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnConfirmText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#000',
  },
  mainBodyVaga: {
    flex: 0.53,
    flexDirection: 'row',
  },
  vagaCardAlign: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  vagaCard: {
    backgroundColor: '#06D106',
    width: 60,
    height: 64,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vagaCardText: {
    fontSize: 18,
    fontFamily: 'ABeeZee_400Regular',
    color: '#fff',
  },
  modalPoint: {
    backgroundColor: '#F5F5F5',
    //height: 270,
    height: Dimensions.get('screen').height / 3,
    borderRadius: 5,
    marginTop: Dimensions.get('screen').height / 1.6,
  },
  modalPointInfo: {
    alignItems: 'center',
    flex: 0.3,
    flexDirection: 'row',
    maxWidth: 200
  },
  modalBtnView: {
    alignItems: 'center'
  },
  modalBtn: {
    width: '94%',
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
  modalTitleAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginLeft: '14%'
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
  modalAlignSaldo: {
    marginLeft: '3.5%'
  },
  modalClose: {
    fontFamily: 'ABeeZee_400Regular',
    fontSize: 30,
    color: '#000',
  },
  modalPointTime: {
    backgroundColor: '#F5F5F5',
    width: '100%',
    height: 253,
    borderRadius: 5,
    marginTop: 375
  },
  modalBackGrounds: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  modalBackGroundGray: {
    backgroundColor: '#DBDBDB',
    borderRadius: 5,
    paddingLeft: '3%',
    justifyContent: 'center',
    //width: 175,
    width: '46%',
    height: '68.5%'
  },
  modalBackGroundYellow: {
    backgroundColor: '#F3BC2C',
    borderRadius: 5,
    paddingLeft: '3%',
    justifyContent: 'center',
    //width: 175,
    width: '46%',
    height: '68.5%'
  },
  mainConfirm: {
    backgroundColor: '#DAF9DA',
    width: 217,
    height: 37,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainConfirmText: {
    fontFamily: 'ABeeZee_400Regular',
    fontSize: 16,
    color: '#06D106',
  }
});