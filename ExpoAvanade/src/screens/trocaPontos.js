import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';

class TrocaPontos extends Component {
  goBack = () => {
    this.props.navigation.goBack();
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
            <Image source={require('../../assets/img/icon_back.png')} style={styles.mainHeaderImage} />
            <Text style={styles.mainHeaderText}>Minhas rodas</Text>
          </View>
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
    width: '68%',
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
    fontFamily: 'ABeeZee_400Regular',    
    color: '#000',
  },
  cardTextBalance: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',    
    color: '#797979',
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