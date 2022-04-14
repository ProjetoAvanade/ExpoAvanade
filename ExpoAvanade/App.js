import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Login from './src/screens/login';
import Cadastro from './src/screens/cadastro';
import Main from './src/screens/main';
import Ponto from './src/screens/ponto';
import Vaga from './src/screens/vaga';
import TrocaPontos from './src/screens/trocaPontos';
import TutorialDestrava from './src/screens/tutorialDestrava';
import TutorialTrava from './src/screens/tutorialTrava';
import Pesquisa from './src/screens/pesquisa';
import Pagamento from './src/screens/pagamento';

const AuthStack = createStackNavigator();

import {
  ABeeZee_400Regular,
  ABeeZee_400Regular_Italic
} from '@expo-google-fonts/abeezee';
import {
  IBMPlexMono_100Thin,
  IBMPlexMono_100Thin_Italic,
  IBMPlexMono_300Light,
  IBMPlexMono_300Light_Italic,
  IBMPlexMono_400Regular,
  IBMPlexMono_400Regular_Italic,
  IBMPlexMono_500Medium,
  IBMPlexMono_500Medium_Italic,
  IBMPlexMono_600SemiBold,
  IBMPlexMono_600SemiBold_Italic,
  IBMPlexMono_700Bold,
  IBMPlexMono_700Bold_Italic
} from '@expo-google-fonts/ibm-plex-mono';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  let [fontsLoaded, error] = useFonts({
    ABeeZee_400Regular,
    ABeeZee_400Regular_Italic,
    IBMPlexMono_100Thin,
    IBMPlexMono_100Thin_Italic,
    IBMPlexMono_300Light,
    IBMPlexMono_300Light_Italic,
    IBMPlexMono_400Regular,
    IBMPlexMono_400Regular_Italic,
    IBMPlexMono_500Medium,
    IBMPlexMono_500Medium_Italic,
    IBMPlexMono_600SemiBold,
    IBMPlexMono_600SemiBold_Italic,
    IBMPlexMono_700Bold,
    IBMPlexMono_700Bold_Italic
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }
  
  return (
    <NavigationContainer>
      <StatusBar
        hidden={true}
      />
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Main" component={Main} />
        <AuthStack.Screen name="Cadastro" component={Cadastro} />
        <AuthStack.Screen name="TrocaPontos" component={TrocaPontos} />
        <AuthStack.Screen name="TutorialTrava" component={TutorialTrava} />
        <AuthStack.Screen name="TutorialDestrava" component={TutorialDestrava} />
        <AuthStack.Screen name="Vaga" component={Vaga} />
        <AuthStack.Screen name="Pagamento" component={Pagamento} />
        <AuthStack.Screen name="Ponto" component={Ponto} />
        <AuthStack.Screen name="Pesquisa" component={Pesquisa} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#3912A9',
  },

  // estilo dos ícones da tabBar
  tabBarIcon: {
    width: 22,
    height: 22,
  },
});
