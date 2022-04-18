import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class PontoProximo extends Component {
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

                        <Text style={styles.mainHeaderText}>Lista de pontos</Text>
                    </View>
                </View>

                <ScrollView style={styles.mainScroll}>
                    <TouchableOpacity style={styles.mainCard} onPress={() => this.props.navigation.navigate('')}>
                        <Image source={require('../../assets/img/icon_locationYellow.png')} style={styles.mainCardImage} />
                        <View>
                            <Text style={styles.mainCardsTextName}>Carrefour limão</Text>
                            <Text style={styles.mainCardsTextEmail}>Av. Otaviano A. Lima</Text>
                        </View>
                        <Text style={styles.mainCardsTextTrade}>Trocar</Text>
                        <Image source={require('../../assets/img/icon_next.png')} style={styles.mainCardNext} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mainCard} onPress={() => this.props.navigation.navigate('')}>
                        <Image source={require('../../assets/img/icon_locationYellow.png')} style={styles.mainCardImage} />
                        <View>
                            <Text style={styles.mainCardsTextName}>Carrefour limão</Text>
                            <Text style={styles.mainCardsTextEmail}>Av. Otaviano A. Lima</Text>
                        </View>
                        <Text style={styles.mainCardsTextTrade}>Trocar</Text>
                        <Image source={require('../../assets/img/icon_next.png')} style={styles.mainCardNext} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mainCard} onPress={() => this.props.navigation.navigate('')}>
                        <Image source={require('../../assets/img/icon_locationYellow.png')} style={styles.mainCardImage} />
                        <View>
                            <Text style={styles.mainCardsTextName}>Carrefour limão</Text>
                            <Text style={styles.mainCardsTextEmail}>Av. Otaviano A. Lima</Text>
                        </View>
                        <Text style={styles.mainCardsTextTrade}>Trocar</Text>
                        <Image source={require('../../assets/img/icon_next.png')} style={styles.mainCardNext} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mainCard} onPress={() => this.props.navigation.navigate('')}>
                        <Image source={require('../../assets/img/icon_locationYellow.png')} style={styles.mainCardImage} />
                        <View>
                            <Text style={styles.mainCardsTextName}>Carrefour limão</Text>
                            <Text style={styles.mainCardsTextEmail}>Av. Otaviano A. Lima</Text>
                        </View>
                        <Text style={styles.mainCardsTextTrade}>Trocar</Text>
                        <Image source={require('../../assets/img/icon_next.png')} style={styles.mainCardNext} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mainCard} onPress={() => this.props.navigation.navigate('')}>
                        <Image source={require('../../assets/img/icon_locationYellow.png')} style={styles.mainCardImage} />
                        <View>
                            <Text style={styles.mainCardsTextName}>Carrefour limão</Text>
                            <Text style={styles.mainCardsTextEmail}>Av. Otaviano A. Lima</Text>
                        </View>
                        <Text style={styles.mainCardsTextTrade}>Trocar</Text>
                        <Image source={require('../../assets/img/icon_next.png')} style={styles.mainCardNext} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mainCard} onPress={() => this.props.navigation.navigate('')}>
                        <Image source={require('../../assets/img/icon_locationYellow.png')} style={styles.mainCardImage} />
                        <View>
                            <Text style={styles.mainCardsTextName}>Carrefour limão</Text>
                            <Text style={styles.mainCardsTextEmail}>Av. Otaviano A. Lima</Text>
                        </View>
                        <Text style={styles.mainCardsTextTrade}>Trocar</Text>
                        <Image source={require('../../assets/img/icon_next.png')} style={styles.mainCardNext} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mainCard} onPress={() => this.props.navigation.navigate('')}>
                        <Image source={require('../../assets/img/icon_locationYellow.png')} style={styles.mainCardImage} />
                        <View>
                            <Text style={styles.mainCardsTextName}>Carrefour limão</Text>
                            <Text style={styles.mainCardsTextEmail}>Av. Otaviano A. Lima</Text>
                        </View>
                        <Text style={styles.mainCardsTextTrade}>Trocar</Text>
                        <Image source={require('../../assets/img/icon_next.png')} style={styles.mainCardNext} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mainCard} onPress={() => this.props.navigation.navigate('')}>
                        <Image source={require('../../assets/img/icon_locationYellow.png')} style={styles.mainCardImage} />
                        <View>
                            <Text style={styles.mainCardsTextName}>Carrefour limão</Text>
                            <Text style={styles.mainCardsTextEmail}>Av. Otaviano A. Lima</Text>
                        </View>
                        <Text style={styles.mainCardsTextTrade}>Trocar</Text>
                        <Image source={require('../../assets/img/icon_next.png')} style={styles.mainCardNext} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mainCard} onPress={() => this.props.navigation.navigate('')}>
                        <Image source={require('../../assets/img/icon_locationYellow.png')} style={styles.mainCardImage} />
                        <View>
                            <Text style={styles.mainCardsTextName}>Carrefour limão</Text>
                            <Text style={styles.mainCardsTextEmail}>Av. Otaviano A. Lima</Text>
                        </View>
                        <Text style={styles.mainCardsTextTrade}>Trocar</Text>
                        <Image source={require('../../assets/img/icon_next.png')} style={styles.mainCardNext} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mainCard} onPress={() => this.props.navigation.navigate('')}>
                        <Image source={require('../../assets/img/icon_locationYellow.png')} style={styles.mainCardImage} />
                        <View>
                            <Text style={styles.mainCardsTextName}>Carrefour limão</Text>
                            <Text style={styles.mainCardsTextEmail}>Av. Otaviano A. Lima</Text>
                        </View>
                        <Text style={styles.mainCardsTextTrade}>Trocar</Text>
                        <Image source={require('../../assets/img/icon_next.png')} style={styles.mainCardNext} />
                    </TouchableOpacity>
                </ScrollView>
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
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // marginLeft: 18,
        // marginLeft: '4.7%',
    },
    mainHeaderImage: {
        width: 25,
        height: 21.56,
    },
    mainHeaderText: {
        fontFamily: 'IBMPlexMono_700Bold',
        fontSize: 25,
    },
    mainScroll: {
        width: '100%',
    },
    mainCard: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#000000'
    },
    mainCardImage: {
        width: 25,
        marginLeft: 30,
    },
    mainCardsTextName: {
        marginLeft: 15,
        fontSize: 14,
        color: '#000000',
        fontFamily: 'ABeeZee_400Regular',
    },
    mainCardsTextEmail: {
        marginLeft: 15,
        fontSize: 14,
        color: '#797979',
        fontFamily: 'ABeeZee_400Regular',
    },
    mainCardNext: {
        marginLeft: 5,
        width: 20
    },
    mainCardsTextTrade: {
        marginLeft: 115,
        fontSize: 14,
        color: '#000000',
        fontFamily: 'ABeeZee_400Regular',
    },
});

export default PontoProximo;