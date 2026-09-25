import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import GenerosScreen from './src/screens/GeneroScreen';
import MoviesScreen from './src/screens/MovieScreen';
import DetalhesMovieScreen from './src/screens/DetalhesMovieScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GenerosScreen" component={GenerosScreen} options={{ title: 'Gêneros' }} />
       <Stack.Screen name="MoviesScreen" component={MoviesScreen} options={{ title: 'Filmes' }} />
       <Stack.Screen name="DetalhesMovieScreen" component={DetalhesMovieScreen} options={{ title: 'Detalhes do Filme' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}