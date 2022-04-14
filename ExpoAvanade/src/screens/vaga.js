import React, { Component } from 'react';
import { StyleSheet, Text, View, Select, Image, TouchableOpacity, TextInput } from 'react-native';

export default class Vaga extends Component {
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.mainHeader}>
          <View style={styles.mainTitleSpace}>
            <TouchableOpacity style={styles.btnBackSpace} onPress={() => this.props.navigation.goBack()}>
              <Image style={styles.mainBtnBack} source={require('../../assets/img/Icone_voltar.png')} />
            </TouchableOpacity>

            <Image style={styles.mainLogo} source={require('../../assets/img/icon.png')} />
          </View>
        </View>

        <Text style={styles.title}>Qual vaga você está usando?</Text>

        <View style={styles.mainBody}>
          <View style={styles.selectVaga}>
          <TextInput
              style={styles.mainInput}
              placeholder='Selecionar'
              placeholderTextColor='#000000'
              keyboardType="email-address"
              onChangeText={Email => this.setState({ Email })}
            />
          </View>

          <TouchableOpacity style={styles.btnConfirm} onPress={() => this.props.navigation.navigate('TutorialTrava')}>
            <Text style={styles.btnConfirmText}>Confirmar</Text>
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
    /* fontFamily: 'Open Sans', */
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
});