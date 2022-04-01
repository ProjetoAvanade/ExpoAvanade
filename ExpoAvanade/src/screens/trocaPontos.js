import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

class TrocaPontos extends Component {
  goBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.mainHeader}>
          <View style={styles.mainTituloSpace}>
            <TouchableOpacity onPress={this.goBack}>
              <Image style={styles.mainBtnVoltar} source={require('../../assets/img/Icone_voltar.png')} />
            </TouchableOpacity>
            <Text style={styles.mainHeaderText}>Trocar pontos</Text>
          </View>

          <View style={styles.mainHeaderLine} />
        </View>

        <View style={styles.mainBody}>
          <View style={styles.mainCards}>
            <View style={styles.cardPontos}>
              <View>
                <Text style={styles.cardPontosText}>15 pontos</Text>
                <Text style={styles.cardTextSaldo}>R$1,00</Text>
              </View>

              <TouchableOpacity style={styles.btnPontos}>
                <Text style={styles.cardPontosText}>Trocar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardPontos}>
              <View>
                <Text style={styles.cardPontosText}>30 pontos</Text>
                <Text style={styles.cardTextSaldo}>R$2,00</Text>
              </View>

              <TouchableOpacity style={styles.btnPontos}>
                <Text style={styles.cardPontosText}>Trocar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardPontos}>
              <View>
                <Text style={styles.cardPontosText}>45 pontos</Text>
                <Text style={styles.cardTextSaldo}>R$3,00</Text>
              </View>

              <TouchableOpacity style={styles.btnPontos}>
                <Text style={styles.cardPontosText}>Trocar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardPontos}>
              <View>
                <Text style={styles.cardPontosText}>60 pontos</Text>
                <Text style={styles.cardTextSaldo}>R$4,00</Text>
              </View>

              <TouchableOpacity style={styles.btnPontos}>
                <Text style={styles.cardPontosText}>Trocar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  mainHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTituloSpace: {
    width: 300,
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
  },
  mainCards: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingBottom: 150,
  },
  cardPontos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 300,
    height: 73,
    backgroundColor: '#FFF',
    borderColor: '#F3BC2C',
    borderWidth: 2,
  },
  cardPontosText: {
    fontSize: 20,
    //fontFamily: '',
    color: '#000',
  },
  cardTextSaldo: {
    fontSize: 14,
    //fontFamily: '',
    color: '#333',
  },
  btnPontos: {
    backgroundColor: '#F3BC2C',
    width: 116,
    height: 37,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TrocaPontos;