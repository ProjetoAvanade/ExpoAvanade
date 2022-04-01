import React, { Component } from 'react';
import { StyleSheet, Text, View, Select, Image, TouchableOpacity } from 'react-native';

export default class Perfil extends Component {

  realizarLogout = async () => {
    try {
      this.props.navigation.navigate('Login');
    } catch (error) {
      //console.warn(error);
    }
  }

  navegarPontos = async () => {
    this.props.navigation.navigate('Pagamento');
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.mainHeader}>
          <Text style={styles.mainHeaderText}>Perfil</Text>
          <View style={styles.mainHeaderLine} />
        </View>

        <View style={styles.mainBody}>
          <View style={styles.mainBodyInfo}>

            <Image style={styles.imgPerfil} source={require('../../assets/img/profile.png')} />

            <Text style={styles.mainBodyTitle}>Rosana Dolores</Text>
            <Text style={styles.mainBodyText}>rodolores@gmail.com</Text>
            <Text style={styles.mainBodyText}>Meus pontos: 15</Text>
            <Text style={styles.mainBodyText}>Saldo: R$2,00</Text>

            <TouchableOpacity style={styles.btn} onPress={this.navegarPontos}>
              <Text style={styles.btnPontosText}>Trocar meus pontos</Text>
            </TouchableOpacity>

            <View style={styles.mainLine} />
            <TouchableOpacity style={styles.btn} onPress={this.realizarLogout}>
              <Text style={styles.btnLogoutText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View >
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainHeaderText: {
    //fontFamily: '',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  mainHeaderLine: {
    width: 155,
    paddingTop: 8,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  }, 
  mainBody: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainBodyInfo: {
    alignItems: 'center',
  },
  imgPerfil: {
    borderColor: '#F3BC2C',
    borderRadius: 67,
    borderWidth: 3,
    /* marginBottom: 20, */
  },
  mainBodyTitle: {
    //fontFamily: '',
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
  },
  mainBodyText: {
    color: '#000',
    fontSize: 20,
  },
  mainLine: {
    width: 250,
    marginTop: '8%',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  btn: {
    marginTop: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 157,
    backgroundColor: '#F3BC2C',
    borderRadius: 5,
  },
  btnPontosText: {
    //fontFamily: '',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  btnLogoutText: {
    //fontFamily: '',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  mainTituloSpace: {
    width: 200,
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 110,
  },
  mainBtnVoltar: {
    width: 20,
    height: 20,
  },
  mainImagem: {
    marginTop: 5,
  },
});