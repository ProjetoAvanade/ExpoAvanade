import React, { Component } from 'react';
import { StyleSheet, Text, View, Select, Image, TouchableOpacity, StatusBar } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default class TutorialTrava extends Component {
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
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../assets/img/icon_back.png')} style={styles.mainHeaderImage} />
            </TouchableOpacity>
            <Text style={styles.mainHeaderText}>Tutorial</Text>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.mainContentSpace}>
            <View style={styles.mainContentBox}>
              <Text style={styles.mainContentBoxTitle}>Siga essas instruções:</Text>
              <Text style={styles.mainContentBoxTextUnique}>Usar os nossos bicicletários é muito fácil! Siga as instruções abaixo:</Text>
            </View>
            <View style={styles.mainContentBox1}>

              <View style={styles.mainContentBoxRow}>
                <Text style={styles.mainContentBoxNumber}>1° -</Text>
                <Text style={styles.mainContentBoxText}> Aproxime sua tag no sensor</Text>
              </View>

              <View style={styles.mainContentBoxRow}>
                <Text style={styles.mainContentBoxNumber}>2° -</Text>
                <Text style={styles.mainContentBoxText}> Ao aproximar a tag, o cronometro será iniciado</Text>
              </View>

              <View style={styles.mainContentBoxRow}>
                <Text style={styles.mainContentBoxNumber}>3° -</Text>
                <Text style={styles.mainContentBoxText}> Ao finalizar o uso, aproxime sua tag novamente no sensor para encerrar o cronometro </Text>
              </View>
            </View>

          </View>
        </View>

        <View style={styles.mainContentTimer}>
          <TouchableOpacity style={styles.mainContentButton} onPress={() => this.props.navigation.navigate('Pagamento')}>
            <Text style={styles.mainContentButtonText}>Iniciar</Text>
          </TouchableOpacity>
        </View>

      </View >
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
  },
  mainHeaderSpace: {
    width: '60%',
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
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 25,
  },
  mainContent: {
    width: '100%',
    height: '70%',
    backgroundColor: '#676A69',
  },
  mainContentSpace: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  mainContentBox: {
    height: 138,
    width: 266,
    justifyContent: 'space-between'
  },
  mainContentBox1: {
    height: 247,
    width: 266,
    justifyContent: 'space-between'
  },
  mainContentBoxRow: {
    flexDirection: 'row'
  },
  mainContentBoxTitle: {
    fontSize: 25,
    fontFamily: 'ABeeZee_400Regular',
    color: '#ffffff',
    textAlign: 'center',

  },
  mainContentBoxNumber: {
    fontSize: 20,
    fontFamily: 'ABeeZee_400Regular',
    color: '#F3BC2C'
  },
  mainContentBoxText: {
    width: 220,
    fontSize: 20,
    fontFamily: 'ABeeZee_400Regular',
    color: '#ffffff',
    textAlign: 'justify',
  },
  mainContentBoxTextUnique: {
    width: 260,
    fontSize: 20,
    fontFamily: 'ABeeZee_400Regular',
    color: '#ffffff',
    textAlign: 'justify',
  },
  mainContentTimer: {
    width: '100%',
    height: '18%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContentButton: {
    width: '90%',
    height: '75%',
    backgroundColor: '#F3BC2C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  mainContentButtonText: {
    fontSize: 25,
    fontFamily: 'IBMPlexMono_700Bold',
  },
});