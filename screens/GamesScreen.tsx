import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../App';

type GamesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Games'>;

type Props = {
  navigation: GamesScreenNavigationProp;
};

interface Game {
  id: string;
  title: string;
  likes: number;
}

const mockGames: Game[] = [
  { id: '1', title: "Math Adventure", likes: 200 },
  { id: '2', title: "Word Explorer", likes: 180 },
  { id: '3', title: "Science Quest", likes: 160 },
];

const GamesScreen: React.FC<Props> =  ({ navigation }) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      // Handle the generated game here
    }, 3000);
  };

  const renderGameItem = ({ item }: { item: Game }) => (
    <View style={styles.gameCard}>
      <Text style={styles.gameTitle}>{item.title}</Text>
      <View style={styles.gameFooter}>
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons name="heart-outline" size={20} color="#FF5722" />
          <Text style={styles.likeCount}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playButtonText}>Play Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/OIP.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Fun Learning Games</Text>

        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerate}
          disabled={isGenerating}
        >
          <Text style={styles.generateButtonText}>
            {isGenerating ? 'Creating New Game...' : 'Create New Game'}
          </Text>
        </TouchableOpacity>

        <FlatList
          data={mockGames.sort((a, b) => b.likes - a.likes)}
          renderItem={renderGameItem}
          keyExtractor={item => item.id}
          style={styles.gameList}
        />
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
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 5,
    color: '#4A90E2',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
    textAlign: 'center',
  },
  generateButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  generateButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  gameList: {
    flex: 1,
  },
  gameCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  gameFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 5,
    color: '#FF5722',
  },
  playButton: {
    backgroundColor: '#FF9800',
    padding: 8,
    borderRadius: 20,
  },
  playButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default GamesScreen;