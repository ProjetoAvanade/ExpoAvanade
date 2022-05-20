import React, { useState, useEffect, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment"

export default class Relogio extends Component {
  state = {
    eventDate: moment.duration().add({ hours: this.props.route.params.horas, minutes: 0, seconds: 0 }), // add 9 full days
    hours: 0,
    mins: 0,
    secs: 0,
    idVaga: this.props.route.params.idVaga,
    saldo: this.props.route.params.saldo,
    idReserva: 0,
    adicionaTempo: false,
    horaAdicionada: 0,
    mensagemTempo: false,
    saldo : this.props.route.params.saldo,
  }

  //atualização do tempo do relógio a cada segundo
  atualizarRelogio = () => {
    const x = setInterval(() => {
      let { eventDate } = this.state

      if (eventDate <= 0) {
        clearInterval(
          this.setState(moment.duration().add({ hours: 0, minutes: 0, seconds: 0 })),
          this.props.navigation.navigate('Cartao', { idReserva: this.state.idReserva, idVaga: this.state.idVaga })
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
    eventDate = eventDate.add({ hours: this.state.adicionaTempo, minutes: 0, seconds: 0 })
    const hours = eventDate.hours() + this.state.adicionaTempo
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
        statusVaga: true
      },
        {
          headers: { Authorization: 'Bearer ' + token },
        })

      if (resposta.status == 204) {
        console.warn('Vaga Atualizada');
      }
    } catch (error) {
      console.warn(resposta)
      console.warn(error);
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
        console.warn('Cadastrado com sucesso!')
        this.atualizarVaga();
        this.listarReserva();
      }
    } catch (error) {
      console.warn(error);
    }
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
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#50010C" }}>Em breve</Text>
          <Text style={{ fontWeight: "bold", fontSize: 50, marginBottom: 50 }}>{`${this.state.hours} : ${this.state.mins} : ${this.state.secs}`}</Text>

          <TouchableOpacity style={styles.mainContentFormButton} onPress={() => { this.props.navigation.navigate('Cartao', { idReserva: this.state.idReserva, idVaga: this.state.idVaga, saldo : this.state.saldo }) }}>
            <Text style={styles.mainContentFormButtonText}>Finalizar reserva</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.mainContentFormButton} onPress={() => this.adicionarTempo()}>
                        <Text style={styles.mainContentFormButtonText}>Adicionar mais tempo</Text>
                    </TouchableOpacity> */}
          <TouchableOpacity style={styles.mainContentFormButton} onPress={() => this.setState({ adicionaTempo: true })}>
            <Text style={styles.mainContentFormButtonText}>Adicionar mais tempo</Text>
          </TouchableOpacity>

          {this.state.adicionaTempo == true &&
            <View>
              <Text style={styles.mainContentFormButtonText}>Quanto tempo você deseja adicionar</Text>
              <Text style={styles.mainContentFormButtonText}
                onPress={() => {
                  this.setState({ adicionaTempo: false, horaAdicionada: 1, mensagemTempo: true }),
                    this.adicionarTempo()
                }}>1</Text>
            </View>
          }

          {this.state.mensagemTempo == true &&
            <Text style={styles.mainTextSucess}>{this.state.horaAdicionada} horas adicionada</Text>
          }
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
    height: '4.3%',
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
    marginTop: '30%'
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
  mainTextSucess: {
    fontSize: 20,
    fontFamily: 'ABeeZee_400Regular',
    color: '#00ff00',
    marginTop: 40
  }
});