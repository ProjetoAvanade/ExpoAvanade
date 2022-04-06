import React, { Component } from 'react';
import { StyleSheet, Text, View, Select, Image, TouchableOpacity } from 'react-native';

export default class TutorialTrava extends Component {
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.mainHeader}>
          <View style={styles.mainTitleSpace}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image style={styles.mainBtnBack} source={require('../../assets/img/Icone_voltar.png')} />
            </TouchableOpacity>

            <Text style={styles.mainHeaderText}>Tutorial</Text>
          </View>
        </View>

        <View style={styles.mainBody}>
          <View style={styles.mainBodyInstructions}>
            <Text style={styles.mainBodyTitle}>Siga essas instruções:</Text>
            <Text style={styles.mainBodyText}>Usar o sistema é muito fácil! Veja aqui algumas dicas para te ajudar.</Text>
          </View>

          <View style={styles.mainBodySteps}>
            <View style={styles.stepInfo}>
              <View style={styles.mainBodyCircle}>
                <Text style={styles.mainBodyText}>1°</Text>
              </View>
              <Text style={styles.mainBodyText}>Lorem Ipsum is simply dummy</Text>
            </View>

            <View style={styles.stepInfo}>
              <View style={styles.mainBodyCircle}>
                <Text style={styles.mainBodyText}>2°</Text>
              </View>
              <Text style={styles.mainBodyText}>Lorem Ipsum is simply dummy text of the printing</Text>
            </View>

            <View style={styles.stepInfo}>
              <View style={styles.mainBodyCircle}>
                <Text style={styles.mainBodyText}>3°</Text>
              </View>
              <Text style={styles.mainBodyText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
            </View>
          </View>
        </View>

        <View style={styles.mainFooter}>
          <TouchableOpacity style={[styles.mainFooterBtn, styles.footerBtnShadow]} onPress={() => this.props.navigation.navigate('TutorialDestrava')}>
            <Text style={styles.footerBtnText}>Travar</Text>
          </TouchableOpacity>

          <View style={styles.mainFooterMinutes}>
            <Text style={styles.footerMinutesText}>00:00</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#676A69',
  },
  mainHeader: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitleSpace: {
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 110,
  },
  mainBtnBack: {
    width: 20,
    height: 20,
    marginLeft: 25,
  },
  mainHeaderText: {
    fontFamily: 'IBMPlexMono_700Bold',
    marginLeft: 10,
    fontSize: 36,
    color: '#fff',
  },
  mainBody: {
    flex: 4,
    justifyContent: 'space-around',
    marginBottom: 110,
  },
  mainBodyTitle: {
    fontFamily: 'ABeeZee_400Regular',
    fontSize: 25,
    color: '#fff',
  },
  mainBodyInstructions: {
    maxWidth: 264,
    marginLeft: 20,
    marginBottom: 20,
  },
  mainBodyText: {
    fontFamily: 'ABeeZee_400Regular', 
    fontSize: 20,
    color: '#fff',
  },
  mainBodySteps: {
    maxWidth: 300,
    marginRight: 20,
  },
  stepInfo: {
    flexDirection: 'row',
    marginTop: 10,
  },
  mainBodyCircle: {
    width: 29,
    height: 31,
    borderRadius: 30 / 2,
    backgroundColor: '#AC9041',
    alignItems: 'center',
    marginRight: 7,
  },
  mainFooter: {
    flex: 1.5,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  mainFooterBtn: {
    width: 327,
    height: 54,
    backgroundColor: '#F3BC2C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  footerBtnShadow: {
    shadowColor: '#rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: -3, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    /* shadowColor: 'rgba(132, 132, 156, 0.3)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4, */
  },
  footerBtnText: {
    fontFamily: 'IBMPlexMono_700Bold', 
    fontSize: 24,
    color: '#000',
  },
  mainFooterMinutes: {
    width: 109,
    height: 35,
    backgroundColor: '#F3BC2C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,

  },
  footerMinutesText: {
    fontFamily: 'IBMPlexMono_700Bold', 
    fontSize: 18,
    color: '#000',
  },
});