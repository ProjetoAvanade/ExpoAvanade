import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, StatusBar, ScrollView, TouchableOpacity } from 'react-native';

export default class Pagamento extends Component {
    realizarPagamento = () => {
        this.props.navigation.navigate('Mapa');
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.main}>

                    <View style={styles.mainCard}>
                        <Text style={styles.mainTitulo}>Realizar pagamento</Text>
                        <View style={styles.mainCardDiv}>
                            <View style={styles.boxTexto}>
                                <Text style={styles.boxTextoTitulo}>Bike Runners - Park Shop </Text>

                                <View style={styles.mainCardLinha}>
                                    <Text style={styles.boxTextoInfos}>25 minutos parado</Text>
                                    <Text style={styles.boxTextoInfos}>R$25,00</Text>
                                </View>

                                <Text style={styles.boxTextoInfos}>R. Emília Marengo, 320 - Tatuape, São Paulo</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.mainMetodo}>
                        <Text style={styles.mainPagamentoTitle}>Método de Pagamento</Text>

                        <View style={styles.mainBtns}>
                            <TouchableOpacity style={styles.mainBtnMetodo} onPress={this.PagarPix}>
                                <Text style={styles.boxTextoInfos}>Pix</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.mainBtnMetodo} onPress={this.PagarDebito}>
                                <Text style={styles.boxTextoInfos}>Débito</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.boxTextoInfos}>Código Pix</Text>
                        <Text style={styles.mainMetodoCodigo}>JHGFJHSGFSG0HF3G2H1J3GJG132F1FG132DF1B3213213X21B321B321D321D32132D1G32DF1G32D1G23D1FG321GW1S321G3S1G1G31G3SG2S1G23S1G3</Text>
                    </View>

                    <View style={styles.mainPagamento}>
                        <View style={styles.mainSpaceTitle}>
                            <Text style={styles.mainPagamentoText}>Siga essas instruções</Text>
                        </View>


                        <View style={styles.mainInstrucoes}>

                            <View style={styles.passoInfo}>
                                <View style={styles.mainPagamentoCircle}>
                                    <Text style={styles.mainPagamentoText}>1°</Text>
                                </View>
                                <Text style={styles.mainPagamentoText}>Copie o código pix acima</Text>
                            </View>

                            <View style={styles.passoInfo}>
                                <View style={styles.mainPagamentoCircle}>
                                    <Text style={styles.mainPagamentoText}>2°</Text>
                                </View>
                                <Text style={styles.mainPagamentoText}>Acesse o app do seu banco de preferencia</Text>
                            </View>

                            <View style={styles.passoInfo}>
                                <View style={styles.mainPagamentoCircle}>
                                    <Text style={styles.mainPagamentoText}>3°</Text>
                                </View>
                                <Text style={styles.mainPagamentoText}>Escolher pagar com o Pix, cole o código e finalize o pagamento</Text>
                            </View>

                            <View style={styles.passoInfo}>
                                <View style={styles.mainPagamentoCircle}>
                                    <Text style={styles.mainPagamentoText}>4°</Text>
                                </View>
                                <Text style={styles.mainPagamentoText}>Seu pagamento será aprovado em alguns segundos</Text>
                            </View>

                        </View>

                        <View style={styles.alinhamentoBtn}>
                            <TouchableOpacity style={styles.mainPagamentoBtn} onPress={this.realizarPagamento}>
                                <Text style={styles.pagamentoBtnText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(132, 132, 156, 0.4)',
        justifyContent: 'space-between',
    },

    mainTitulo: {
        color: '#000000',
        fontSize: 30,
        paddingTop: 5,
        paddingBottom: 10
    },

    mainCard: {
        flex: 0.50,
        width: 411,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5%',
    },

    mainCardDiv: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        height: 223,
        width: 319,
        alignItems: 'center',
        justifyContent: 'center'
    },

    boxTexto: {
        width: 290,
        height: 194,
        justifyContent: 'space-between'
    },

    boxTextoTitulo: {
        fontSize: 25,
        color: '#000000',
        fontFamily: 'IBMPlexMono-Bold'
    },

    boxTextoInfos: {
        fontSize: 20,
        color: '#000000'
    },

    mainCardLinha: {
        flexDirection: 'row',
        width: 280,
        justifyContent: 'space-between',
    },

    mainMetodo: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },

    mainPagamentoTitle: {
        fontFamily: 'IBMPlexMono-Bold',
        fontSize: 30,
        color: '#000',
    },

    mainBtns: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly'
    },

    mainBtnMetodo: {
        height: 37,
        width: 116,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#FAD364',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    mainMetodoCodigo: {
        fontFamily: 'ABeeZee-Regular',
        fontSize: 20,
        color: '#726E6E',
        maxWidth: 367,
        textAlign: 'center',
    },

    mainPagamento: {
        flex: 1,
        backgroundColor: '#676A69',
        justifyContent: 'space-evenly',
        paddingBottom: '5%',
        paddingRight: '10%',
        paddingLeft: '10%',
    },

    mainSpaceTitle: {
        alignItems: 'center',
    },

    passoInfo: {
        flex: 1,
        flexDirection: 'row',
    },

    mainPagamentoCircle: {
        width: 29,
        height: 29,
        borderRadius: 29 / 2,
        backgroundColor: '#AC9041',
        alignItems: 'center',
        marginRight: 10,
    },

    mainPagamentoText: {
        fontFamily: 'ABeeZee-Regular',
        fontSize: 20,
        color: '#fff',
    },

    alinhamentoBtn: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    mainPagamentoBtn: {
        width: 327,
        height: 60,
        backgroundColor: '#F3BC2C',
        alignItems: 'center',
        justifyContent: 'center',
    },

    pagamentoBtnText: {
        fontFamily: 'ABeeZee-Regular',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
    },

    mainInstrucoes: {
        flex: 10,
        justifyContent: 'space-between',
    }
});