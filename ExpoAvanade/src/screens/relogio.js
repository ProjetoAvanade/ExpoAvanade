import React, { useState, useEffect, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from 'react-native';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment"

export default class Relogio extends Component {
  state = {
    idVaga: this.props.route.params.idVaga,
    saldo: this.props.route.params.saldo,
    eventDate: moment.duration().add({ hours: this.props.route.params.horas, minutes: 0, seconds: 0 }), // add 9 full days
    hours: this.props.route.params.horas,
    mins: 0,
    secs: 0,
    horaAdicionada: 0,
    idReserva: 0,
    mensagemTempo: false,
  }

  //atualização do tempo do relógio a cada segundo
  atualizarRelogio = () => {
    const x = setInterval(() => {
      let { eventDate } = this.state

      if (eventDate <= 0) {
        clearInterval(
          this.setState(moment.duration().add({ hours: 0, minutes: 0, seconds: 0 })),
          //this.props.navigation.navigate('Cartao', { idReserva: this.state.idReserva, idVaga: this.state.idVaga })
        )
      } else {
        eventDate = eventDate.subtract(1, "s")
        const hours = eventDate.hours()
        const mins = eventDate.minutes()
        const secs = eventDate.seconds()

        this.setState({
          hours,
          mins,
          secs,
          eventDate
        })
      }
    }, 1000)
  }

  //Adiciona horas a reserva atual
  adicionarTempo = async () => {
    let { eventDate } = this.state
    //this.setState({ eventDate: moment.duration().add({ hours: 1, minutes: 0, seconds: 0 }) })
    eventDate = eventDate.add({ hours: this.state.horaAdicionada, minutes: 0, seconds: 0 })
    const hours = eventDate.hours() + this.state.horaAdicionada
    const mins = eventDate.minutes()
    const secs = eventDate.seconds()

    this.setState({
      hours,
      mins,
      secs,
      eventDate
    })
  }

  //Não funfa pra true apenas false
  atualizarVaga = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const resposta = await api.put(`/Vagas/${this.state.idVaga}`, {
        statusVagas: true
      },
        {
          headers: { Authorization: 'Bearer ' + token },
        })

      if (resposta.status == 204) {
        //console.warn('Vaga Atualizada');
      }
    } catch (error) {
      //console.warn(resposta)
      //console.warn(error);
    }
  };

  //Conseguir o id da última reserva
  listarReserva = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const resposta = await api.get('/Reserva', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    const dadosDaApi = resposta.data;

    //setando o idReserva como a última reserva cadastrada
    this.setState({ idReserva: dadosDaApi.reverse()[0].idReserva })
  }

  ////Criar uma reserva
  criarReserva = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const resposta = await api.post('/Reserva', {
        idVaga: this.state.idVaga
      },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
      if (resposta.status == 201) {
        //console.warn('Cadastrado com sucesso!')
        this.atualizarVaga();
        this.listarReserva();
      }
    } catch (error) {
      //console.warn(error);
    }
  };

  aumentarHoras = () => {
    if (this.state.horaAdicionada < 5) {
      this.setState({ horaAdicionada: this.state.horaAdicionada + 1 });
    }
    //console.log(this.state.horaAdicionada);
  };

  diminuirHoras = () => {
    if (this.state.horaAdicionada > 0) {
      this.setState({ horaAdicionada: this.state.horaAdicionada - 1 });
    }
    //console.log(this.state.horaAdicionada);
  };

  componentDidMount() {
    this.criarReserva()
    this.atualizarRelogio()
  }

  render() {
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
            <Text style={styles.mainHeaderText}>Reserva</Text>
          </View>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.mainClock}>
            <Text style={{ fontWeight: "bold", fontSize: 30 }}>{`${this.state.hours} : ${this.state.mins} : ${this.state.secs}`}</Text>
          </View>
          {this.state.eventDate <= 0 &&
            <View style={styles.mainClockAlign}>
              <Text style={styles.contentText}>
                Você poderá finalizar a reserva apenas quando acabar o tempo
              </Text>
              <TouchableOpacity style={styles.mainContentButton} onPress={() => { this.props.navigation.navigate('Cartao', { idReserva: this.state.idReserva, idVaga: this.state.idVaga, saldo: this.state.saldo }) }}>
                <Text style={styles.buttonTextFinish}>Finalizar reserva</Text>
              </TouchableOpacity>
            </View>
          }

          {this.state.eventDate != 0 &&
            <View style={styles.mainClockAlign}>
              <Text style={styles.contentText}>
                Você poderá finalizar a reserva apenas quando acabar o tempo
              </Text>
              <TouchableOpacity style={styles.mainButtonDisabled} disabled>
                <Text style={styles.buttonTextFinish}>Finalizar reserva</Text>
              </TouchableOpacity>
            </View>
          }

          <View style={styles.mainContentBox}>
            <Text style={styles.mainContentText}>Adicionar horas</Text>
            <View style={styles.mainContentHours}>
              <TouchableOpacity onPress={() => { this.setState({ mensagemTempo: false }), this.diminuirHoras() }}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.buttonTextHours}>
                {this.state.horaAdicionada}
              </Text>

              <TouchableOpacity onPress={() => { this.setState({ mensagemTempo: false }), this.aumentarHoras() }}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonConfirm} onPress={() => { this.setState({ mensagemTempo: true }), this.adicionarTempo() }}>
              <Text style={styles.buttonConfirmText}>Confirmar</Text>
            </TouchableOpacity>

            {this.state.mensagemTempo == true && this.state.horaAdicionada > 1 &&
              <View style={styles.mainConfirm}>
                <Text style={styles.mainConfirmText}>{this.state.horaAdicionada} horas adicionadas</Text>
              </View>
            }

            {this.state.mensagemTempo == true && this.state.horaAdicionada == 1 &&
              <View style={styles.mainConfirm}>
                <Text style={styles.mainConfirmText}>{this.state.horaAdicionada} hora adicionada</Text>
              </View>
            }
          </View>
        </View>
      </View>
    );
  }
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
    // height: 65,
    height: '7.6%',
    backgroundColor: '#F3BC2C',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainHeaderImage: {
    width: 25,
    height: 21.56,
  },
  mainHeaderSpace: {
    //width: '59%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // marginLeft: 18,
    //marginLeft: '4.7%',
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
    marginTop: '15%',
  },
  contentText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    maxWidth: '70%',
    textAlign: 'center',
    marginTop: '4%'
  },
  mainClock: {
    /*  width: 172,
     height: 175, */
    backgroundColor: '#F3BC2C',
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.48,
    height: Dimensions.get('window').width * 0.48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainClockAlign: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainContentButton: {
    width: 220,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#F3BC2C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%'
  },
  mainButtonDisabled: {
    width: 220,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#FFC327',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%'
  },
  buttonTextFinish: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    textAlign: 'center'
  },
  buttonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
  },
  buttonTextHours: {
    fontFamily: 'ABeeZee_400Regular',
    fontSize: 20,
  },
  buttonConfirm: {
    width: 150,
    height: 35,
    backgroundColor: '#F3BC2C',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonConfirmText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14
  },
  mainContentText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  mainContentBox: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 0.7,
    marginTop: '20%'
  },
  mainContentHours: {
    width: 118,
    height: 36,
    backgroundColor: '#F3BC2C',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '5%'
  },
  mainConfirm: {
    backgroundColor: '#DAF9DA',
    width: 200,
    height: 37,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%'
  },
  mainConfirmText: {
    fontFamily: 'ABeeZee_400Regular',
    fontSize: 16,
    color: '#06D106',
  }
});