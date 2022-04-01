import React, { Component } from 'react';
import { StyleSheet, Text, View, Select, Image, TouchableOpacity } from 'react-native';

export default class TutorialDestrava extends Component {
  goBack = () => {
    this.props.navigation.goBack();
  }

  navegarPagamento = () => {
    this.props.navigation.navigate('Pagamento');
  }
  
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.mainHeader}>
          <View style={styles.mainTituloSpace}>
            <TouchableOpacity onPress={this.goBack}>
              <Image style={styles.mainBtnVoltar} source={require('../../assets/img/Icone_voltar.png')} />
            </TouchableOpacity>

            <Text style={styles.mainHeaderText}>Tutorial</Text>
          </View>
        </View>

        <View style={styles.mainBody}>
          <View style={styles.mainBodyIntrucoes}>
            <Text style={styles.mainBodyTitle}>Siga essas instruções:</Text>
            <Text style={styles.mainBodyText}>Usar o sistema é muito fácil! Veja aqui algumas dicas para te ajudar.</Text>
          </View>

          <View style={styles.mainBodyPassos}>
            <View style={styles.passoInfo}>
              <View style={styles.mainBodyCircle}>
                <Text style={styles.mainBodyText}>1°</Text>
              </View>
              <Text style={styles.mainBodyText}>Lorem Ipsum is simply dummy</Text>
            </View>

            <View style={styles.passoInfo}>
              <View style={styles.mainBodyCircle}>
                <Text style={styles.mainBodyText}>2°</Text>
              </View>
              <Text style={styles.mainBodyText}>Lorem Ipsum is simply dummy text of the printing</Text>
            </View>

            <View style={styles.passoInfo}>
              <View style={styles.mainBodyCircle}>
                <Text style={styles.mainBodyText}>3°</Text>
              </View>
              <Text style={styles.mainBodyText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
            </View>
          </View>
        </View>

        <View style={styles.mainFooter}>
          <TouchableOpacity style={[styles.mainFooterBtn, styles.footerBtnShadow]} onPress={this.navegarPagamento}>
            <Text style={styles.footerBtnText}>Destravar</Text>
          </TouchableOpacity>

          <View style={styles.mainFooterMinutes}>
            <Text style={styles.footerMinutesText}>2:17:36</Text>
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
  mainTituloSpace: {
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 100,
  },
  mainBtnVoltar: {
    width: 20,
    height: 20,
  },
  mainHeaderText: {
    //fontFamily:
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  mainBody: {
    flex: 4,
    justifyContent: 'space-around',
    marginBottom: 110,
  },
  mainBodyTitle: {
    //fontFamily:
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  mainBodyIntrucoes: {
    maxWidth: 264,
    marginLeft: 20,
    marginBottom: 20,
  },
  mainBodyText: {
    //fontFamily:
    fontSize: 20,
    color: '#fff',
  },
  mainBodyPassos: {
    maxWidth: 300,
    marginRight: 20,
  },
  passoInfo: {
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
  },
  footerBtnShadow: {
    shadowColor: '#rgba(0, 0, 0, 0.25)',
    shadowOffset: {width: -3, height: -4},
    shadowOpacity: 1,
    shadowRadius: 4,
    /* shadowColor: 'rgba(132, 132, 156, 0.3)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4, */
  },
  footerBtnText: {
    //fontFamily:
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  mainFooterMinutes: {
    width: 109,
    height: 35,
    backgroundColor: '#F3BC2C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerMinutesText: {
    //fontFamily:
    fontSize: 18,
    color: '#000',
  },
});