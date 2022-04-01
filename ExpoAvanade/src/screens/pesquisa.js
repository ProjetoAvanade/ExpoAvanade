import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';

export default class Pesquisa extends Component {

    realizarBusca = () => {
        this.props.navigation.navigate('Pesquisa');
    }

    render() {
        return (
            <View style={styles.main}>

                <View style={styles.mainNavegar}>
                    <View style={styles.mainMenuNavegar}>
                        <View style={styles.mainDividir}>
                            <TextInput style={styles.mainMenuInput}>Para onde? <Image source={require('../../assets/img/Icone_lupa.png')} style={styles.mainImagem} /> </TextInput>
                        </View>
                    </View>
                </View>

                <View style={styles.mainRecentes}>
                    <View style={styles.mainRecentesCard}>
                        <Text style={styles.mainRecentesTexto}>Bicicletário Preste Maia</Text>
                        <Text style={styles.mainRecentesTexto}>São Paulo</Text>
                    </View>
                    <View style={styles.mainRecentesCard}>
                        <Text style={styles.mainRecentesTexto}>Bicicletário Senai de informática</Text>
                        <Text style={styles.mainRecentesTexto}>São Paulo</Text>
                    </View>
                    <View style={styles.mainRecentesCard}>
                        <Text style={styles.mainRecentesTexto}>Bicicletário Sesi Vila Leopoldina</Text>
                        <Text style={styles.mainRecentesTexto}>São Paulo</Text>
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

    mainNavegar: {
        flex: 0.15,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
    },

    mainMenuNavegar: {
        width: 394,
        height: 60,
        borderRadius: 5,
        backgroundColor: '#F3BC2C',
    },

    mainRecentes: {
        flex: 0.85,
        width: 340,
        backgroundColor: '#F7F7F7',
    },

    mainRecentesCard: {
        width: 340,
        height: 100,
        borderBottomColor: '#000000',
        borderBottomWidth: 2
    },

    mainRecentesTexto: {
        fontSize: 20,
        color: '#000000',
        paddingTop: 15,
        paddingLeft: 15
    },

    mainDividir: {
        width: 394,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },

    mainMenuInput: {
        width: 320,
        height: 30,
        paddingLeft: 23,
        paddingTop: 0,
        fontSize: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000000',
        backgroundColor: '#ffffff',
    },

    mainImagem: {
        width: 20,
        height: 20,
    },
});