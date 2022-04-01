import React, { Component } from 'react';
import { StyleSheet, Text, View, Select, Image, TouchableOpacity } from 'react-native';

export default class Vaga extends Component {
  goBack = () => {
    this.props.navigation.goBack();
  }

  navegarTutorial = async () => {
    this.props.navigation.navigate('TutorialTrava');
  }
  
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.mainHeader}>
          <View style={styles.mainTituloSpace}>
            <TouchableOpacity style={styles.btnVoltarSpace} onPress={this.goBack}>
              <Image style={styles.mainBtnVoltar} source={require('../../assets/img/Icone_voltar.png')} />
            </TouchableOpacity>

            <Image style={styles.mainLogo} source={require('../../assets/img/icon.png')} />
          </View>
        </View>

        <Text style={styles.titulo}>Qual vaga você está usando?</Text>

        <View style={styles.mainBody}>
          <View style={styles.selecaoVaga}>
            <Text style={styles.numeroVaga}>1</Text>
          </View>

          <TouchableOpacity style={styles.btnConfirmar} onPress={this.navegarTutorial}>
            <Text style={styles.btnConfirmarTexto}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  }
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
  mainTituloSpace: {
    width: 260,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 40,
  },
  mainBtnVoltar: {
    width: 20,
    height: 20,
  },
  btnVoltarSpace: {
    marginBottom: 80,
    marginRight: 60,
  },
  mainLogo: {
    width: 231,
    height: 168,
  },
  mainBody: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 80,
  },
  titulo: {
    fontSize: 34,
    /* fontFamily: 'Open Sans', */
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 39,
    maxWidth: 295,
    textAlign: 'center',
    marginBottom: 10,
  },
  selecaoVaga: {
    backgroundColor: '#fff',
    borderColor: '#F3BC2C',
    borderWidth: 3,
    borderRadius: 16,
    width: 242,
    height: 122,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroVaga: {
    fontSize: 36,
    color: '#000',
    /* fontFamily: 'Open Sans', */
  },
  btnConfirmar: {
    backgroundColor: '#F3BC2C',
    width: 157,
    height: 60,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnConfirmarTexto: {
    /* fontFamily: 'Open Sans', */
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000',
  },
});