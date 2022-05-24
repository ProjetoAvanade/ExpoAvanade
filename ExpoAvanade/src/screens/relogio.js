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

  aumentarHoras = () => {
    if (this.state.horaAdicionada < 5) {
      this.setState({ horaAdicionada: this.state.horaAdicionada + 1 });
    }
    console.log(this.state.horaAdicionada);
  };

  diminuirHoras = () => {
    if (this.state.horaAdicionada > 0) {
      this.setState({ horaAdicionada: this.state.horaAdicionada - 1 });
    }
    console.log(this.state.horaAdicionada);
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

          {this.state.eventDate <= 0 &&
            <View>
              <Text style={styles.buttonText}>Agora você poderá finalizar a reserva</Text>
              <TouchableOpacity style={styles.mainContentButton} onPress={() => { this.props.navigation.navigate('Cartao', { idReserva: this.state.idReserva, idVaga: this.state.idVaga, saldo: this.state.saldo }) }}>
                <Text style={styles.buttonText}>Finalizar reserva</Text>
              </TouchableOpacity>
            </View>
          }

          {
            this.state.eventDate != 0 &&
            <View>
              <Text style={styles.buttonText}>
                Você poderá finalizar a reserva apenas quando acabar o tempo
              </Text>
              <TouchableOpacity style={styles.mainButtonDisabled} disabled>
                <Text style={styles.buttonText}>Finalizar reserva</Text>
              </TouchableOpacity>
            </View>
          }

          <Text style={styles.buttonText}>Adicionar horas</Text>

          <View style={styles.mainContentHours}>
            <TouchableOpacity onPress={this.diminuirHoras}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.buttonText}>
              {this.state.horaAdicionada}
            </Text>

            <TouchableOpacity onPress={this.aumentarHoras}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => { this.setState({ mensagemTempo: true }), this.adicionarTempo() }}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>

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
    marginTop: '30%',
  },
  mainContentButton: {
    width: 157,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#F3BC2C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%'
  },
  mainButtonDisabled: {
    width: 157,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#F5D617',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'ABeeZee_400Regular',
    color: '#000000'
  },
  mainContentHours: {
    width: 80,
    height: 35,
    backgroundColor: '#F3BC2C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainTextSucess: {
    fontSize: 20,
    fontFamily: 'ABeeZee_400Regular',
    color: '#00ff00',
    marginTop: 40
  }
});