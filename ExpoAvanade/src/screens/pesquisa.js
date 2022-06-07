import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, Text, TextInput, Keyboard, Button, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Feather, Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Pesquisa = () => {
    const [filterdData, setfilterdData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search, setsearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const navigation = useNavigation();

    // Função para buscar os bicicletários cadastrados, transformando eles em marcadores
    const buscarBicicletarios = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.get('/Bicicletario', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            const dadosDaApi = resposta.data;
            setmasterData(dadosDaApi)
            setfilterdData(dadosDaApi)
            //console.warn(dadosDaApi)
        } catch (error) {
            //console.warn(error);
        }
    };

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.nome ?
                    item.nome.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setfilterdData(newData);
            setsearch(text);
        } else {
            setfilterdData(masterData);
            setsearch(text);
        }
    }

    const ItemView = ({ item }) => {
        return (
            <View key={item.idBicicletario} style={styles.item}>
                <TouchableOpacity style={styles.mainCard} onPress={() => { navigation.navigate('Vaga', { idBicicletario: item.idBicicletario }) }}>
                    <Image source={require('../../assets/img/icon_locationYellow.png')} style={styles.mainCardImage} />
                    <View>
                        <Text style={styles.mainCardsTextName}>{item.nome}</Text>
                        <Text style={styles.mainCardsTextEmail}>Rua: {item.rua}, {item.numero}, {item.bairro}</Text>
                    </View>
                    <View>
                        <Text style={styles.mainCardsTextEmail}>{item.horarioAberto.slice(0, 5)}</Text>
                        <Text style={styles.mainCardsTextEmail}>{item.horarioFechado.slice(0, 5)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const ItemSeparatorView = () => {
        return (
            <View
                style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }}
            />
        )
    }

    useEffect(() => {
        buscarBicicletarios();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.main}>

                <StatusBar
                    barStyle='dark-content'
                    backgroundColor='#F3BC2C'
                    hidden={false}
                />
                <View style={styles.mainGap}></View>
                <View style={styles.mainHeader}>
                    <View style={styles.mainHeaderSpace}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../../assets/img/icon_back.png')} style={styles.mainHeaderImage} />
                        </TouchableOpacity>

                        <Text style={styles.mainHeaderText}>Lista de pontos</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <View
                        style={
                            !clicked
                                ? styles.searchBar__unclicked
                                : styles.searchBar__clicked
                        }
                    >
                        <Feather
                            name="search"
                            size={20}
                            color="black"
                            style={{ marginLeft: 1 }}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Para aonde?"
                            value={search}
                            onChangeText={(text) => searchFilter(text)}
                            onFocus={() => {
                                setClicked(true);
                            }}
                        />

                        {clicked && (
                            <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                                setsearch("");
                                Keyboard.dismiss();
                                setClicked(false);
                            }} />
                        )}
                    </View>
                </View>

                <View style={styles.list__container}>
                    <View
                        onStartShouldSetResponder={() => {
                            setClicked(false);
                        }}
                    >
                        <FlatList
                            data={filterdData}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={ItemSeparatorView}
                            renderItem={ItemView}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    itemStyle: {
        padding: 15
    },
    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    mainGap: {
        // height: 37,
        height: '2.5%',
    },
    mainHeader: {
        width: '100%',
        height: '7.6%',
        backgroundColor: '#F3BC2C',
        justifyContent: 'center',
    },
    mainHeaderSpace: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginRight: '18%',
    },
    mainHeaderImage: {
        width: 25,
        height: 21.56,
        marginRight: '10%'
    },
    mainHeaderText: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 25,
    },
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
    },
    textInputStyle: {
        height: 60,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: 'white'
    },
    containerInput: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "98%",
        backgroundColor: '#F3BC2C',
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "98%",
        backgroundColor: '#F3BC2C',
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    list__container: {
        marginBottom: '6%',
        width: "100%",
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
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

    },
    mainCardImage: {
        width: 25,
        marginLeft: '6%',
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
    mainImage: {
        width: 200,
        height: 200
    }
});

export default Pesquisa;