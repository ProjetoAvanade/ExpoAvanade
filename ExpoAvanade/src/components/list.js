import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ idBicicletario, nome, rua, numero, bairro, horarioAberto, horarioFechado }) => (
  <View key={idBicicletario} style={styles.item}>
    <TouchableOpacity style={styles.mainCard}>
      <Image source={require('../../assets/img/icon_locationYellow.png')} style={styles.mainCardImage} />
      <View>
        <Text style={styles.mainCardsTextName}>{nome}</Text>
        <Text style={styles.mainCardsTextEmail}>rua: {rua}, {numero}, {bairro}</Text>
      </View>
      <View>
        <Text style={styles.mainCardsTextEmail}>{horarioAberto.slice(0, 5)}</Text>
        <Text style={styles.mainCardsTextEmail}>{horarioFechado.slice(0, 5)}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

// the filter
const List = (props) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (props.searchPhrase === "") {
      return <Item nome={item.nome} bairro={item.bairro} rua={item.rua} numero={item.numero} horarioAberto={item.horarioAberto} horarioFechado={item.horarioFechado} />;
    }
    // filter of the name
    if (item.nome.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return   <Item nome={item.nome} bairro={item.bairro} rua={item.rua} numero={item.numero} horarioAberto={item.horarioAberto} horarioFechado={item.horarioFechado} />;

    }
    // filter of the street
    if (item.rua.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return  <Item nome={item.nome} bairro={item.bairro} rua={item.rua} numero={item.numero} horarioAberto={item.horarioAberto} horarioFechado={item.horarioFechado} />;

    }
    // filter of the neighborhood
    if (item.bairro.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return  <Item nome={item.nome} bairro={item.bairro} rua={item.rua} numero={item.numero} horarioAberto={item.horarioAberto} horarioFechado={item.horarioFechado} />;

    }
    // filter of the open hours
    if (item.horarioAberto.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item nome={item.nome} bairro={item.bairro} rua={item.rua} numero={item.numero} horarioAberto={item.horarioAberto} horarioFechado={item.horarioFechado} />;
    }
    // filter of the close hours
    if (item.horarioFechado.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item nome={item.nome} bairro={item.bairro} rua={item.rua} numero={item.numero} horarioAberto={item.horarioAberto} horarioFechado={item.horarioFechado} />;
    }
  };

  return (
    <View style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          props.setClicked(false);
        }}
      >
        <FlatList
          data={props.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.idBicicletario}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    width: "100%",
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
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
});

export default List;