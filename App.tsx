import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import StoriesScreen from './screens/StoriesScreen';
import GamesScreen from './screens/GamesScreen';

export type RootStackParamList = {
  Home: undefined;
  Stories: undefined;
  Games: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  console.log('App component rendering');

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ padding: 20 }}>App is running</Text>
      <NavigationContainer
        fallback={<Text>Loading...</Text>}
        onReady={() => console.log('Navigation container is ready')}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            listeners={{
              focus: () => console.log('Home screen focused'),
            }}
          />
          <Stack.Screen name="Stories" component={StoriesScreen} />
          <Stack.Screen name="Games" component={GamesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;