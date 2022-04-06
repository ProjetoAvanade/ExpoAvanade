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
          <View style={styles.mainTitleSpace}>
            <TouchableOpacity onPress={this.goBack}>
              <Image style={styles.mainBtnBack} source={require('../../assets/img/Icone_voltar.png')} />
            </TouchableOpacity>
            <Text style={styles.mainHeaderText}>Trocar pontos</Text>
          </View>

          <View style={styles.mainHeaderLine} />
        </View>

        <View style={styles.mainBody}>
          <View style={styles.mainCards}>
            <View style={styles.cardPoints}>
              <View>
                <Text style={styles.cardPointsText}>15 pontos</Text>
                <Text style={styles.cardTextBalance}>R$1,00</Text>
              </View>

              <TouchableOpacity style={styles.btnPoints}>
                <Text style={styles.cardPointsBtnText}>Trocar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardPoints}>
              <View>
                <Text style={styles.cardPointsText}>30 pontos</Text>
                <Text style={styles.cardTextBalance}>R$2,00</Text>
              </View>

              <TouchableOpacity style={styles.btnPoints}>
                <Text style={styles.cardPointsBtnText}>Trocar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardPoints}>
              <View>
                <Text style={styles.cardPointsText}>45 pontos</Text>
                <Text style={styles.cardTextBalance}>R$3,00</Text>
              </View>

              <TouchableOpacity style={styles.btnPoints}>
                <Text style={styles.cardPointsBtnText}>Trocar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardPoints}>
              <View>
                <Text style={styles.cardPointsText}>60 pontos</Text>
                <Text style={styles.cardTextBalance}>R$4,00</Text>
              </View>

              <TouchableOpacity style={styles.btnPoints}>
                <Text style={styles.cardPointsBtnText}>Trocar</Text>
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
  mainTitleSpace: {
    width: 300,
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
  mainHeaderText: {
    fontFamily: 'IBMPlexMono_700Bold',    fontSize: 36,
    color: '#333',
  },
  mainHeaderLine: {
    width: 155,
    paddingTop: 8,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  mainBody: {
    flex: 4,
    alignItems: 'center',
  },
  mainCards: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingBottom: 150,
  },
  cardPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 300,
    height: 73,
    backgroundColor: '#FFF',
    borderColor: '#F3BC2C',
    borderWidth: 2,
    borderRadius: 5,
  },
  cardPointsText: {
    fontSize: 20,
    fontFamily: 'ABeeZee_400Regular',    color: '#000',
  },
  cardTextBalance: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',    color: '#333',
  },
  btnPoints: {
    backgroundColor: '#F3BC2C',
    width: 116,
    height: 37,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPointsBtnText: {
    fontSize: 20,
    fontFamily: 'IBMPlexMono_700Bold',    color: '#000',
  },
});

export default TrocaPontos;