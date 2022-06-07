import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Platform,
    SafeAreaView,
    ActivityIndicator
} from "react-native";

import List from "../components/list";
import SearchBar from "../components/searchBar";

import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Pesquisa = () => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [listaBicicletarios, setListaBikes] = useState();
    const navigation = useNavigation();
    
    useEffect(() => {
        const buscarBicicletarios = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const resposta = await api.get('/Bicicletario', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                const dadosDaApi = resposta.data;
                setListaBikes(dadosDaApi)
                //console.warn(dadosDaApi) 
            } catch (error) {
                //console.warn(error);
            }
        };
        buscarBicicletarios();
    }, []);

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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/img/icon_back.png')} style={styles.mainHeaderImage} />
                    </TouchableOpacity>

                    <Text style={styles.mainHeaderText}>Meu perfil</Text>
                </View>
            </View>

            <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
            />
            {!listaBicicletarios ? (
                <ActivityIndicator size="large" />
            ) : (

                <List
                    searchPhrase={searchPhrase}
                    data={listaBicicletarios}
                    setClicked={setClicked}
                />

            )}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        width: "100%",
        marginTop: 20,
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: "10%",
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
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginRight: '27%',
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
});

export default Pesquisa;