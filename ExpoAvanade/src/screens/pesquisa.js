import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';

export default class Pesquisa extends Component {
    render() {
        return (
            <View style={styles.main}>

                <View style={styles.mainNav}>
                    <View style={styles.mainMenuNav}>
                        <View style={styles.mainDiv}>
                            <TouchableOpacity style={styles.mainBtnBack} onPress={() => this.props.navigation.goBack()}>
                                <Image style={styles.mainImage} source={require('../../assets/img/Icone_voltar.png')} />
                            </TouchableOpacity>
                            {/* <TextInput style={styles.mainMenuInput}
                                placeholder='Para onde?'
                                placeholderTextColor='#000000'>
                            </TextInput>
                            <TouchableOpacity style={styles.mainBtnTest} onPress={this.realizarBusca}>
                                <Text style={styles.mainBtnText}>OO</Text>
                            </TouchableOpacity> */}
                            <TextInput style={styles.mainMenuInput}
                                placeholder='Para onde?'
                                placeholderTextColor='#000000'
                            >
                            </TextInput>
                        </View>
                    </View>

                    <View style={styles.mainRecent}>
                        <View style={styles.mainRecentCard}>
                            <Text style={styles.mainRecentText} onPress={() => this.props.navigation.navigate('Ponto')}>Bicicletário Preste Maia</Text>
                            <Text style={styles.mainRecentText}>São Paulo</Text>
                        </View>
                        <View style={styles.mainRecentCard}>
                            <Text style={styles.mainRecentText} onPress={() => this.props.navigation.navigate('Ponto')}>Bicicletário Senai de informática</Text>
                            <Text style={styles.mainRecentText}>São Paulo</Text>
                        </View>
                        <View style={styles.mainRecentCard}>
                            <Text style={styles.mainRecentText} onPress={() => this.props.navigation.navigate('Ponto')}>Bicicletário Sesi Vila Leopoldina</Text>
                            <Text style={styles.mainRecentText}>São Paulo</Text>
                        </View>
                    </View>

                </View >
            </View>
        );
    }
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
    },
    mainNav: {
        flex: 0.35,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainMenuNav: {
        width: 380,
        borderRadius: 5,
        backgroundColor: '#F3BC2C',
    },
    mainDiv: {
        marginLeft: 15,
        width: 350,
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    mainMenuInput: {
        width: 320,
        height: 45,
        paddingLeft: 23,
        paddingBottom: 2,
        fontSize: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000000',
        backgroundColor: '#ffffff',
    },
    mainBtnBack: {
        width: 20,
        height: 20,
    },
    mainRecent: {
        flex: 0.65,
        width: 340,
        backgroundColor: '#F7F7F7',
    },
    mainRecentCard: {
        width: 340,
        height: 100,
        borderBottomColor: '#000000',
        borderBottomWidth: 2,
    },
    mainRecentText: {
        fontSize: 20,
        paddingTop: 20,
        paddingLeft: 15,
        color: '#000000',
        fontFamily: 'ABeeZee_400Regular',
    },
    mainBtnText: {
        marginTop: 12,
    }
});