import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, StatusBar, ScrollView, TouchableOpacity } from 'react-native';

export default class Pagamento extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.main}>

                    <View style={styles.mainCard}>
                        <Text style={styles.mainTitle}>Realizar pagamento</Text>

                        <View style={styles.mainCardDiv}>
                            <View style={styles.boxText}>
                                <Text style={styles.boxTextTitle}>Bike Runners - Park Shop </Text>

                                <View style={styles.mainCardLine}>
                                    <Text style={styles.boxTextInfos}>25 minutos parado</Text>
                                    <Text style={styles.boxTextInfos}>R$25,00</Text>
                                </View>

                                <Text style={styles.boxTextInfos}>R. Emília Marengo, 320 - Tatuape, São Paulo</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.mainMethod}>
                        <View style={styles.mainTitleBox}>
                            <Text style={styles.mainPaymentTitleOption}>Método de Pagamento</Text>
                        </View>
                        <View style={styles.mainBtns}>
                            <TouchableOpacity style={styles.mainBtnMethod} onPress={this.PagarPix}>
                                <Text style={styles.boxTextInfos}>Pix</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.mainBtnMethod} onPress={this.PagarDebito}>
                                <Text style={styles.boxTextInfos}>Débito</Text>
                            </TouchableOpacity>
                        </View>

                        {/* SE COMENTAR DAQUI ATÉ O PRÓXIMO PONTO, REMOVE AS INSTRUÇÕES RELACIONADAS A PIX */}
                        {/* <View style={styles.boxCodePix}>
                            <Text style={styles.boxTextInfoPix}>Código Pix</Text>
                            <Text style={styles.mainMethodCode}>JHGFJHSGFSG0HF3G2H1J3GJG132F1FG132DF1B3213213X21B321B321D321D32132D1G32DF1G32D1G23D1FG321GW1S321G3S1G1G31G3SG2S1G23S1G3</Text>
                        </View>
                    </View>
                    <View style={styles.mainPayment}>
                        <View style={styles.mainSpaceTitle}>
                            <Text style={styles.mainPaymentTitle}>Siga essas instruções</Text>
                        </View>
                        <View style={styles.mainInstructions}>
                            <View style={styles.stepInfo}>
                                <View style={styles.mainPaymentCircle}>
                                    <Text style={styles.mainPaymentText}>1°</Text>
                                </View>
                                <Text style={styles.mainPaymentText}>Copie o código pix acima</Text>
                            </View>
                            <View style={styles.stepInfo}>
                                <View style={styles.mainPaymentCircle}>
                                    <Text style={styles.mainPaymentText}>2°</Text>
                                </View>
                                <Text style={styles.mainPaymentText}>Acesse o app do seu banco de preferencia</Text>
                            </View>
                            <View style={styles.stepInfo}>
                                <View style={styles.mainPaymentCircle}>
                                    <Text style={styles.mainPaymentText}>3°</Text>
                                </View>
                                <Text style={styles.mainPaymentText}>Escolher pagar com o Pix, cole o código e finalize o pagamento</Text>
                            </View>
                            <View style={styles.stepInfo}>
                                <View style={styles.mainPaymentCircle}>
                                    <Text style={styles.mainPaymentText}>4°</Text>
                                </View>
                                <Text style={styles.mainPaymentText}>Seu pagamento será aprovado em alguns segundos</Text>
                            </View>
                        </View>
                        <View style={styles.alignmentBtn}>
                            <TouchableOpacity style={styles.mainPaymentBtn} onPress={this.realizarPagamento}>
                                <Text style={styles.paymentBtnText}>OK</Text>
                            </TouchableOpacity>
                        </View> */}

                        {/* ATÉ AQUI REMOVE INFORMAÇÕES DE PIX */}

                        {/* AQUI COMEÇA INFORMAÇÕES DE DÉBITO */}

                        <View style={styles.mainPaymentDebito}>
                            <View style={styles.mainSpaceTitle}>
                                <Text style={styles.mainPaymentTitleDebito}>Cadastre seus dados</Text>
                            </View>

                            <View style={styles.formSpace}>
                                <TextInput
                                    style={styles.inputDebito}
                                    placeholder='Número do cartão'
                                    placeholderTextColor='#000000'></TextInput>
                                <View style={styles.formSpaceMinors}>
                                    <TextInput
                                        style={styles.inputDebitoMinor}
                                        placeholder='Validade'
                                        placeholderTextColor='#000000'></TextInput>

                                    <TextInput
                                        style={styles.inputDebitoMinor}
                                        placeholder='CVV'
                                        placeholderTextColor='#000000'></TextInput>
                                </View>
                                <TextInput
                                    style={styles.inputDebito}
                                    placeholder='Nome do cartão'
                                    placeholderTextColor='#000000'></TextInput>
                            </View>

                            <View style={styles.alignmentBtn}>
                                <TouchableOpacity style={styles.mainPaymentBtnDebito} onPress={() => this.props.navigation.navigate('Main')}>
                                    <Text style={styles.paymentBtnTextDebito}>Pagar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* AQUI TERMINA AS INFORMAÇÕES DE DEBITO */}
                    </View>
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    main: {
        // flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(132, 132, 156, 0.4)',
        justifyContent: 'space-between',
    },

    mainTitle: {
        fontFamily: 'IBMPlexMono_700Bold',
        color: '#000000',
        fontSize: 30,
        paddingTop: 5,
        paddingBottom: 10
    },

    mainCard: {
        flex: 0.70,
        width: 411,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5%',
        marginTop: '5%'
    },

    mainCardDiv: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        height: 223,
        width: 319,
        alignItems: 'center',
        justifyContent: 'center'
    },

    boxText: {
        width: 290,
        height: 194,
        justifyContent: 'space-between'
    },

    boxTextTitle: {
        fontSize: 25,
        color: '#000000',
        fontFamily: 'ABeeZee_400Regular',    },

    boxTextInfos: {
        fontSize: 20,
        color: '#000000',
        fontFamily: 'ABeeZee_400Regular',
    },

    mainCardLine: {
        flexDirection: 'row',
        width: 280,
        justifyContent: 'space-between',
    },

    mainMethod: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },

    mainTitleBox: {
        marginBottom: '3.5%',
        marginTop: '3.5%'
    },

    mainPaymentTitleOption: {
        fontFamily: 'IBMPlexMono_700Bold',
        fontSize: 25,
        color: '#000',
    },

    mainBtns: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        marginBottom: '3.5%',
    },

    boxCodePix: {
        alignItems: 'center',

    },

    boxTextInfoPix: {
        fontFamily: 'IBMPlexMono_700Bold',
        fontSize: 25,
        marginBottom: '3%',
    },

    mainBtnMethod: {
        height: 37,
        width: 116,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#FAD364',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    mainMethodCode: {
        fontFamily: 'ABeeZee_400Regular',
        fontSize: 20,
        color: '#726E6E',
        maxWidth: 367,
        textAlign: 'center',
        marginBottom: '3%',

    },

    mainPayment: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: '#676A69',
        justifyContent: 'space-evenly',
        paddingBottom: '5%',
        paddingRight: '10%',
        paddingLeft: '10%',
    },

    mainSpaceTitle: {
        alignItems: 'center',
    },

    stepInfo: {
        flex: 1,
        flexDirection: 'row',
    },

    mainPaymentCircle: {
        width: 29,
        height: 29,
        borderRadius: 29 / 2,
        backgroundColor: '#AC9041',
        alignItems: 'center',
        marginRight: 10,
        marginTop: '5%',
    },

    mainPaymentTitle: {
        fontFamily: 'ABeeZee_400Regular',        
        fontSize: 20,
        color: '#fff',
        marginTop: '5%',
        marginBottom: '3%',
    },

    mainPaymentText: {
        fontFamily: 'ABeeZee_400Regular',        
        fontSize: 20,
        color: '#fff',
        marginTop: '5%',
        marginBottom: '3%',
    },

    alignmentBtn: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    mainPaymentBtn: {
        width: 327,
        height: 60,
        backgroundColor: '#F3BC2C',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
        marginBottom: '5%',
        borderRadius: 5,
    },

    paymentBtnText: {
        fontFamily: 'IBMPlexMono_700Bold',        fontSize: 25,
        color: '#000',
    },

    mainInstructions: {
        flex: 10,
        justifyContent: 'space-between',
    },

    mainPaymentTitleDebito: {
        fontSize: 25,
        marginTop: '5%',
        marginBottom: '3%',
    },

    formSpace: {
        alignItems: 'center',
        marginTop: '5%',
        // marginBottom: '3%',
        // marginBottom: '-8%'
    },

    formSpaceMinors: {
        width: 260,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    inputDebito: {
        width: 260,
        height: 60,
        borderRadius: 5,
        borderColor: '#F3BC2C',
        borderWidth: 2,
        paddingLeft: 23,
        marginBottom: '7.1%',
    },

    inputDebitoMinor: {
        width: 110,
        height: 60,
        borderRadius: 5,
        borderColor: '#F3BC2C',
        borderWidth: 2,
        paddingLeft: 23,
        marginBottom: '7%',
    },

    mainPaymentBtnDebito: {
        width: 327,
        height: 60,
        backgroundColor: '#F3BC2C',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10%',
        borderRadius: 5,
    },
    paymentBtnTextDebito: {
        fontFamily: 'IBMPlexMono_700Bold',        fontSize: 25,
        color: '#000',
    }
});