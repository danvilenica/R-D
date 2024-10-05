import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/OIP.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>R&D for Kids</Text>
        <Text style={styles.tagline}>Engaging conversations and creative games to help kids grow</Text>
        
        <TouchableOpacity
          style={[styles.card, styles.storiesCard]}
          onPress={() => navigation.navigate('Stories')}
        >
          <Text style={styles.cardTitle}>Stories</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.gamesCard]}
          onPress={() => navigation.navigate('Games')}
        >
          <Text style={styles.cardTitle}>Games</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  card: {
    width: '100%',
    height: 120,
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  storiesCard: {
    backgroundColor: '#FF9800',
  },
  gamesCard: {
    backgroundColor: '#4CAF50',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default HomeScreen;